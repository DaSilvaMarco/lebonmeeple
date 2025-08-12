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

import { PostService } from './post.service';
import type { Request } from 'express';
import { IsOwner } from '@backend/decorator/is-owner-or-admin.decorator';
import { CreatePostDto } from './dtos/create-post-dto';
import { UpdatePostDto } from './dtos/update-post-dto';

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

  @Get('post/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getById(id);
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
