import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('comment-likes')
export class CommentLikeController {
    constructor(private readonly likeService: CommentLikeService) { }

    // 👍 toggle like
    @UseGuards(JwtAuthGuard)
    @Post(':commentId')
    toggleLike(
        @Param('commentId') commentId: string,
        @CurrentUser() user: User,
    ) {
        return this.likeService.toggle(commentId, user);
    }

    // 🔢 like count
    @Get(':commentId/count')
    count(@Param('commentId') commentId: string) {
        return this.likeService.count(commentId);
    }

    // ❤️ user like qilganmi
    @UseGuards(JwtAuthGuard)
    @Get(':commentId/is-liked')
    isLiked(
        @Param('commentId') commentId: string,
        @CurrentUser() user: User,
    ) {
        return this.likeService.isLiked(commentId, user.id);
    }
}
