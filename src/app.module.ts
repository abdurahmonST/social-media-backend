import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comment/comment.module';
import { CommentLikeModule } from './modules/comment-like/comment-like.module';
import { PostLikeModule } from './modules/post-like/post.like.module';
import { FollowModule } from './modules/follow/follow.module';
import { FriendModule } from './modules/friends/friends.module';

@Module({
  imports: [ 
    DatabaseModule,
    UserModule,
    PostModule,
    PostLikeModule,
    CommentsModule,
    CommentLikeModule,
    AuthModule,
    FollowModule,
    FriendModule,
  ]
})
export class AppModule {}