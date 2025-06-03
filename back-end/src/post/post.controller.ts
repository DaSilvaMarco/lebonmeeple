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
import { CreatePostDto } from './dtos/CreatePostDto';
import { UpdatePostDto } from './dtos/UpdatePostDto';
import { PostService } from './post.service';
import { Request } from 'express';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    return this.postService.create(createPostDto, request);
  }

  @Get('get')
  getAll() {
    return this.postService.getAll();
  }

  @Get('get/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.postService.get(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) postId: number, @Req() request: Request) {
    return this.postService.delete(postId, request);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('patch/:id')
  update(
    @Param('id', ParseIntPipe) postId: number,
    @Req() request: Request,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(postId, request, updatePostDto);
  }
}
