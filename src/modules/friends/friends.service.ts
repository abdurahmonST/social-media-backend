import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { FriendRequest } from "./entities/friend.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Friendship } from "./entities/friendship.entity";
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(FriendRequest)
        private readonly friendRequestRepo: Repository<FriendRequest>,

        @InjectRepository(Friendship)
        private readonly friendshipRepo: Repository<Friendship>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    // ➕ Send friend request
    async sendRequest(senderId: string, receiverId: string) {
        if (senderId === receiverId) {
            throw new BadRequestException("O'zingga request yuborolmaysan");
        }

        const existingFriendship = await this.friendshipRepo.findOne({
            where: [
                { user1: { id: senderId }, user2: { id: receiverId } },
                { user1: { id: receiverId }, user2: { id: senderId } },
            ],
        });

        if (existingFriendship) {
            throw new BadRequestException('Allaqachon do‘stsiz');
        }

        const existingRequest = await this.friendRequestRepo.findOne({
            where: {
                sender: { id: senderId },
                receiver: { id: receiverId },
                status: 'pending',
            },
        });

        if (existingRequest) {
            throw new BadRequestException('Request allaqachon yuborilgan');
        }

        const request = this.friendRequestRepo.create({
            sender: { id: senderId },
            receiver: { id: receiverId },
        });

        return this.friendRequestRepo.save(request);
    }

    // ✅ Accept request
    async acceptRequest(requestId: string, userId: string) {
        const request = await this.friendRequestRepo.findOne({
            where: { id: requestId },
            relations: ['sender', 'receiver'],
        });

        if (!request || request.receiver.id !== userId) {
            throw new NotFoundException('Request topilmadi');
        }

        request.status = 'accepted';
        await this.friendRequestRepo.save(request);

        const friendship = this.friendshipRepo.create({
            user1: request.sender,
            user2: request.receiver,
        });

        return this.friendshipRepo.save(friendship);
    }

    // ❌ Reject request
    async rejectRequest(requestId: string, userId: string) {
        const request = await this.friendRequestRepo.findOne({
            where: { id: requestId },
            relations: ['receiver'],
        });

        if (!request || request.receiver.id !== userId) {
            throw new NotFoundException('Request topilmadi');
        }

        request.status = 'rejected';
        return this.friendRequestRepo.save(request);
    }

    // 👥 Friends list
    async getFriends(userId: string) {
        const friendships = await this.friendshipRepo.find({
            where: [
                { user1: { id: userId } },
                { user2: { id: userId } },
            ],
            relations: ['user1', 'user2'],
        });

        return friendships.map(f =>
            f.user1.id === userId ? f.user2 : f.user1
        );
    }

    // 🗑️ Unfriend
    async removeFriend(userId: string, friendId: string) {
        const friendship = await this.friendshipRepo.findOne({
            where: [
                { user1: { id: userId }, user2: { id: friendId } },
                { user1: { id: friendId }, user2: { id: userId } },
            ],
        });

        if (!friendship) {
            throw new NotFoundException('Do‘stlik topilmadi');
        }

        return this.friendshipRepo.remove(friendship);
    }
}
