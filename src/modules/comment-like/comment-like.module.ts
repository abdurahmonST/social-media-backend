import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLike } from './entities/comment-like.entity';
import { Comment } from '../comment/entities/comment.entity';
import { CommentLikeService } from './comment-like.service';
import { CommentLikeController } from './comment-like.controller';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([CommentLike, Comment]), UserModule],
    controllers: [CommentLikeController],
    providers: [CommentLikeService],
})
export class CommentLikeModule { }
