import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ 
    DatabaseModule,
    UserModule,
    PostModule,
    AuthModule,
  ]
})
export class AppModule {}
