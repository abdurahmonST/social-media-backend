import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Follow } from "./entities/follow.entity";
import { User } from "../user/entities/user.entity";

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow)
        private readonly followRepo: Repository<Follow>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async follow(currentUserId: string, targetUserId: string) {
        if (currentUserId === targetUserId) {
            throw new BadRequestException('You cannot follow yourself');
        }

        const targetUser = await this.userRepo.findOne({
            where: { id: targetUserId },
        });

        if (!targetUser) {
            throw new NotFoundException('User not found');
        }

        const alreadyFollowing = await this.followRepo.findOne({
            where: {
                follower: { id: currentUserId },
                following: { id: targetUserId },
            },
        });

        if (alreadyFollowing) {
            throw new BadRequestException('Already following this user');
        }

        const follow = this.followRepo.create({
            follower: { id: currentUserId } as User,
            following: { id: targetUserId } as User,
        });

        return this.followRepo.save(follow);
    }

    async unfollow(currentUserId: string, targetUserId: string) {
        const follow = await this.followRepo.findOne({
            where: {
                follower: { id: currentUserId },
                following: { id: targetUserId },
            },
        });

        if (!follow) {
            throw new BadRequestException('You are not following this user');
        }

        await this.followRepo.remove(follow);
        return { message: 'Unfollowed successfully' };
    }
}
