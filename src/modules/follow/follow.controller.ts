import { Controller, Delete, Param, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FollowService } from "./follow.service";
import { Request } from "express";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class FollowController {
    constructor(private readonly followService: FollowService) { }

    @Post(':id/follow')
    followUser(@Param('id') targetUserId: string, @Req() req: Request) {
        const user = req.user as { id: string }
        if (!user?.id) throw new UnauthorizedException();
        return this.followService.follow(user.id, targetUserId);
    }

    @Delete(':id/unfollow')
    unfollowUser(@Param('id') targetUserId: string, @Req() req: Request) {
        const user = req.user as { id: string }
        if (!user?.id) throw new UnauthorizedException();
        return this.followService.unfollow(user.id, targetUserId);
    }
}
