import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('post-likes')
export class PostLikeController {
    constructor(private readonly likeService: PostLikeService) { }

    // 👍 toggle like
    @UseGuards(JwtAuthGuard)
    @Post(':postId')
    toggleLike(@Param('postId') postId: string, @CurrentUser() user: User) {
        return this.likeService.toggle(postId, user);
    }

    // 🔢 like count
    @Get(':postId/count')
    count(@Param('postId') postId: string) {
        return this.likeService.count(postId);
    }

    // ❤️ user like qilganmi
    @UseGuards(JwtAuthGuard)
    @Get(':postId/is-liked')
    isLiked(@Param('postId') postId: string, @CurrentUser() user: User) {
        return this.likeService.isLiked(postId, user.id);
    }
}
