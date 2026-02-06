import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CommentLike } from "src/modules/comment-like/entities/comment-like.entity";
import { Comment } from "src/modules/comment/entities/comment.entity";
import { Follow } from "src/modules/follow/entities/follow.entity";
import { FriendRequest } from "src/modules/friends/entities/friend.entity";
import { Friendship } from "src/modules/friends/entities/friendship.entity";
import { PostLike } from "src/modules/post-like/entities/post-like.entity";
import { Post } from "src/modules/post/entities/post.entity";
import { User } from "src/modules/user/entities/user.entity";

import * as dotenv from 'dotenv';
dotenv.config()

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Post, Comment, CommentLike, PostLike, Follow, Friendship, FriendRequest],
    synchronize: true
}