import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequest } from './entities/friend-request.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FriendsService {
    constructor(
        @InjectRepository(FriendRequest)
        private friendRepo: Repository<FriendRequest>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async sendRequest(senderId: string, receiverId: string) {
        if (senderId === receiverId) throw new BadRequestException("Cannot send request to yourself");

        const sender = await this.userRepo.findOne({ where: { id: senderId } });
        const receiver = await this.userRepo.findOne({ where: { id: receiverId } });

        if (!sender || !receiver) throw new NotFoundException("User not found");

        const existing = await this.friendRepo.findOne({
            where: [
                { sender: { id: sender.id }, receiver: { id: receiver.id } },
                { sender: { id: receiver.id }, receiver: { id: sender.id } },
            ],
        });

        if (existing) throw new BadRequestException("Friend request already exists or you are already friends");

        const request = this.friendRepo.create({ sender, receiver, status: 'pending' });
        return this.friendRepo.save(request);
    }

    async acceptRequest(requestId: string, userId: string) {
        const request = await this.friendRepo.findOne({
            where: { id: requestId },
            relations: ['receiver', 'sender'],
        });
        if (!request) throw new NotFoundException("Request not found");
        if (request.receiver.id !== userId) throw new BadRequestException("Not authorized to accept");

        request.status = 'accepted';
        return this.friendRepo.save(request);
    }

    async rejectRequest(requestId: string, userId: string) {
        const request = await this.friendRepo.findOne({
            where: { id: requestId },
            relations: ['receiver', 'sender'],
        });
        if (!request) throw new NotFoundException("Request not found");
        if (request.receiver.id !== userId) throw new BadRequestException("Not authorized to reject");

        request.status = 'rejected';
        return this.friendRepo.save(request);
    }

    async listFriends(userId: string) {
        const requests = await this.friendRepo.find({
            where: [
                { sender: { id: userId }, status: 'accepted' },
                { receiver: { id: userId }, status: 'accepted' },
            ],
            relations: ['sender', 'receiver'],
        });

        return requests.map(r => (r.sender.id === userId ? r.receiver : r.sender));
    }
}
