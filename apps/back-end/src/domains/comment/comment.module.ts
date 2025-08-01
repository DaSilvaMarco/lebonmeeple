/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { UserModule } from '@domains/user/user.module';
import { PrismaModule } from '@prisma-service/prisma.module';
import { GuardModule } from '@guard/guard.module';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [UserModule, PrismaModule, GuardModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
