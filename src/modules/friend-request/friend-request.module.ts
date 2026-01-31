import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entities/friend-request.entity';
import { User } from '../user/entities/user.entity';
import { FriendsService } from './friend-request.service';
import { FriendsController } from './friend-request.controller';

@Module({
    imports: [TypeOrmModule.forFeature([FriendRequest, User])],
    providers: [FriendsService],
    controllers: [FriendsController],
})
export class FriendRequestModule { }
