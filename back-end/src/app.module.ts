import { Module } from '@nestjs/common';
import { UserModule } from './domains/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './domains/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PrismaModule,
    PostModule,
  ],
})
export class AppModule {}
