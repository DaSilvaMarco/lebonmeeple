import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtStrategy } from '@domains/user/jwtStrategy';

@Module({
  controllers: [PostController],
  providers: [JwtStrategy, PostService],
})
export class PostModule {}
