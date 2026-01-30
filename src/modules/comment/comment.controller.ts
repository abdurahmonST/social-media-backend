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
import { User } from '../user/entities/user.entity';
import { UpdateCommentDto } from './dto/update-comment';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Body() dto: CreateCommentDto,
        @CurrentUser() user: User,
    ) {
        return this.commentsService.create(dto, user);
    }

    @Get('post/:postId')
    findPostComments(@Param('postId') postId: string) {
        return this.commentsService.findPostComments(postId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateCommentDto,
        @CurrentUser() user: User,
    ) {
        return this.commentsService.update(id, dto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @CurrentUser() user: User) {
        return this.commentsService.remove(id, user);
    }
}
