import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

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
  @ApiBody({ type: CreatePostDto })
  create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    return this.postService.create(createPostDto, request);
  }

  @Get('posts')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Numéro de page',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: "Nombre d'éléments par page",
  })
  getAll(@Query('page') page = 1, @Query('limit') limit = 9) {
    return this.postService.getAll(Number(page), Number(limit));
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
