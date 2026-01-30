import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CommentLike } from "src/modules/comment-like/entities/comment-like.entity";
import { Comment } from "src/modules/comment/entities/comment.entity";
import { PostLike } from "src/modules/post-like/entities/post-like.entity";
import { Post } from "src/modules/post/entities/post.entity";
import { User } from "src/modules/user/entities/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'abdurahmon0088',
    database: process.env.DB_NAME || 'mini_facebook_db',
    entities: [User, Post, Comment, CommentLike, PostLike],
    synchronize: true
}