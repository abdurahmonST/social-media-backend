import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment';
// import { User } from '../user/entities/user.entity';
import { UpdateCommentDto } from './dto/update-comment';
import { AuthUser } from 'src/auth/types/auth-user.type';
import { User } from 'src/decorators/user.decorator';
import { UserService } from '../user/user.service';
// import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        private userService: UserService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() dto: CreateCommentDto,
        @User() user: AuthUser,
    ) {
        const fullUser = await this.userService.findById(user.id)
        return this.commentsService.create(dto, fullUser);
    }

    @Get('post/:postId')
    findPostComments(@Param('postId') postId: string) {
        return this.commentsService.findPostComments(postId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateCommentDto,
        @User() user: AuthUser,
    ) {
        const fullUser = await this.userService.findById(user.id)
        return this.commentsService.update(id, dto, fullUser);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(
        @Param('id') id: string, 
        @User() user: AuthUser
    ) {
        const fullUser = await this.userService.findById(user.id)
        return this.commentsService.remove(id, fullUser);
    }
}
