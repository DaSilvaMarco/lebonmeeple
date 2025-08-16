import { Module } from '@nestjs/common';
import { UserModule } from './domains/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './domains/post/post.module';
import { CommentModule } from './domains/comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { GamesModule } from './domains/games/games.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PrismaModule,
    PostModule,
    CommentModule,
    GamesModule,
  ],
})
export class AppModule {}
