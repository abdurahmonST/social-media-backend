import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserService } from '../user/user.service';
import { AuthUser } from 'src/auth/types/auth-user.type';

@Controller('comment-likes')
export class CommentLikeController {
    constructor(
        private readonly likeService: CommentLikeService,
        private readonly userService: UserService, // full User entity olish uchun
    ) { }

    // 👍 Toggle like
    @UseGuards(JwtAuthGuard)
    @Post(':commentId')
    async toggleLike(
        @Param('commentId') commentId: string,
        @User() user: AuthUser,
    ) {
        // DB'dan full user entity olish
        const fullUser = await this.userService.findById(user.id);
        return this.likeService.toggle(commentId, fullUser);
    }

    // 🔢 Like count
    @Get(':commentId/count')
    count(@Param('commentId') commentId: string) {
        return this.likeService.count(commentId);
    }

    // ❤️ User like qilganmi
    @UseGuards(JwtAuthGuard)
    @Get(':commentId/is-liked')
    async isLiked(
        @Param('commentId') commentId: string,
        @User() user: AuthUser,
    ) {
        // DB'dan full user entity olish yoki faqat id ishlatsa bo'ladi
        const fullUser = await this.userService.findById(user.id);
        return this.likeService.isLiked(commentId, fullUser.id);
    }
}
