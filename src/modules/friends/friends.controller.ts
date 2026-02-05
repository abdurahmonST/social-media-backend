import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FriendsService } from "./friends.service";
import { User } from "src/decorators/user.decorator";
import { AuthUser } from "src/auth/types/auth-user.type";

@UseGuards(AuthGuard('jwt'))
@Controller('friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService
        
    ) { }

    // ➕ Send request
    @Post('request/:userId')
    sendRequest(
        @User() user: AuthUser,
        @Param('userId') userId: string,
    ) {
        return this.friendsService.sendRequest(user.id, userId);
    }

    // ✅ Accept
    @Post('accept/:requestId')
    accept(
        @User() user: AuthUser, 
        @Param('requestId') requestId: string
    ) {
        return this.friendsService.acceptRequest(requestId, user.id);
    }

    // ❌ Reject
    @Post('reject/:requestId')
    reject(
        @User() user: AuthUser, 
        @Param('requestId') requestId: string
    ) {
        return this.friendsService.rejectRequest(requestId, user.id);
    }

    // 👥 My friends
    @Get()
    getFriends(@User() user: AuthUser) {
        return this.friendsService.getFriends(user.id);
    }

    // 🗑️ Unfriend
    @Delete(':friendId')
    unfriend(
        @User() user: AuthUser, 
        @Param('friendId') friendId: string
    ) {
        return this.friendsService.removeFriend(user.id, friendId);
    }
}
