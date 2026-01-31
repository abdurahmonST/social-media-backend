import { Controller, Post, Param, Get } from '@nestjs/common';
import { FriendsService } from './friend-request.service';

@Controller('friends')
export class FriendsController {
    constructor(private friendsService: FriendsService) { }

    @Post('request/:receiverId/:senderId')
    sendRequest(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
        return this.friendsService.sendRequest(senderId, receiverId);
    }

    @Post('accept/:requestId/:userId')
    accept(@Param('requestId') requestId: string, @Param('userId') userId: string) {
        return this.friendsService.acceptRequest(requestId, userId);
    }

    @Post('reject/:requestId/:userId')
    reject(@Param('requestId') requestId: string, @Param('userId') userId: string) {
        return this.friendsService.rejectRequest(requestId, userId);
    }

    @Get('list/:userId')
    list(@Param('userId') userId: string) {
        return this.friendsService.listFriends(userId);
    }
}
