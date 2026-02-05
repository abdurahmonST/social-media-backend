import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLike } from './entities/post-like.entity';
import { Post } from '../post/entities/post.entity';
import { PostLikeService } from './post-like.service';
import { PostLikeController } from './post-like.controller';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([PostLike, Post]), UserModule],
    controllers: [PostLikeController],
    providers: [PostLikeService],
    exports: [PostLikeService],
})
export class PostLikeModule { }
