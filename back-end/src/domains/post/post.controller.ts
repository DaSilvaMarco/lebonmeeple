import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreatePostDto, UpdatePostDto } from './dtos';
import { PostService } from './post.service';
import { Request } from 'express';
import { IsOwner } from 'src/decorator/is-owner.decorator';

@ApiTags('Post')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('post')
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    return this.postService.create(createPostDto, request);
  }

  @Get('posts')
  getAll() {
    return this.postService.getAll();
  }

  @IsOwner()
  @Delete('post/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }

  @IsOwner()
  @Patch('post/:id')
  update(
    @Param('id', ParseIntPipe) postId: number,
    @Req() request: Request,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(postId, request, updatePostDto);
  }
}
