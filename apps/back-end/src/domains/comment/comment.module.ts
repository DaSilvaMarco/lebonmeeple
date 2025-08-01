/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { JwtStrategy } from '@domains/user/jwtStrategy';

@Module({
  controllers: [CommentController],
  providers: [JwtStrategy, CommentService],
})
export class CommentModule {}
