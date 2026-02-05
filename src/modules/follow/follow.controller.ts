import { Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FollowService } from "./follow.service";
import { Request } from "express";
import { AuthUser } from "src/auth/types/auth-user.type";
import { User } from "src/decorators/user.decorator";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class FollowController {
    constructor(private readonly followService: FollowService) { }

    @Post(':id/follow')
    followUser(
        @Param('id') targetUserId: string, 
        @User() user: AuthUser
    ) {
        return this.followService.follow(user.id, targetUserId);
    }

    @Delete(':id/unfollow')
    unfollowUser(
        @Param('id') targetUserId: string, 
        @User() user: AuthUser
    ) {
        return this.followService.unfollow(user.id, targetUserId);
    }
}
