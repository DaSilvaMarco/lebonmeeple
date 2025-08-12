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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { IsOwner } from '@backend/decorator/is-owner-or-admin.decorator';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { UpdateCommentDto } from './dtos/update-comment-dto';

@ApiTags('Comment')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post('post/:id/comment')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: string,
  ) {
    return this.commentService.create(createCommentDto, request, Number(id));
  }

  @IsOwner()
  @Delete('comment/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.delete(id);
  }

  @IsOwner()
  @Patch('comment/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Get('comments')
  getAll() {
    return this.commentService.getAll();
  }
}
