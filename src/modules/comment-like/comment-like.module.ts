import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLike } from './entities/comment-like.entity';
import { Comment } from '../comment/entities/comment.entity';
import { CommentLikeService } from './comment-like.service';
import { CommentLikeController } from './comment-like.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CommentLike, Comment])],
    controllers: [CommentLikeController],
    providers: [CommentLikeService],
})
export class CommentLikeModule { }
