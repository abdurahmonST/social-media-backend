import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendRequest } from "./entities/friend.entity";
import { Friendship } from "./entities/friendship.entity";
import { User } from "../user/entities/user.entity";
import { FriendsService } from "./friends.service";
import { FriendsController } from "./friends.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ FriendRequest, Friendship, User])],
    providers: [FriendsService],
    controllers: [FriendsController],
    exports: [FriendsService],
})

export class FriendModule {};