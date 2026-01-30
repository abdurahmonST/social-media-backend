import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { Comment } from './entities/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Post])],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule { }
