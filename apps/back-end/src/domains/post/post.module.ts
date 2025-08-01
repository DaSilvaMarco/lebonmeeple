import { Module } from '@nestjs/common';
import { UserModule } from '@domains/user/user.module';
import { PrismaModule } from '@prisma-service/prisma.module';
import { GuardModule } from '@guard/guard.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [UserModule, PrismaModule, GuardModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
