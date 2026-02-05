import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserService } from '../user/user.service';
import { AuthUser } from 'src/auth/types/auth-user.type';

@Controller('post-likes')
export class PostLikeController {
    constructor(
        private readonly likeService: PostLikeService,
        private readonly userService: UserService, // full User entity olish uchun
    ) { }

    // 👍 Toggle like
    @UseGuards(JwtAuthGuard)
    @Post(':postId')
    async toggleLike(
        @Param('postId') postId: string,
        @User() user: AuthUser,
    ) {
        const fullUser = await this.userService.findById(user.id); // full entity
        return this.likeService.toggle(postId, fullUser);
    }

    // 🔢 Like count
    @Get(':postId/count')
    count(@Param('postId') postId: string) {
        return this.likeService.count(postId);
    }

    // ❤️ User like qilganmi
    @UseGuards(JwtAuthGuard)
    @Get(':postId/is-liked')
    async isLiked(
        @Param('postId') postId: string,
        @User() user: AuthUser,
    ) {
        const fullUser = await this.userService.findById(user.id); // full entity
        return this.likeService.isLiked(postId, fullUser.id);
    }
}
