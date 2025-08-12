/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { createComment } from './usecases/create-comment';
import { type Request } from 'express';
import { deleteComment } from './usecases/delete-comment';
import { updateComment } from './usecases/update-comment';
import { PrismaService } from '@prisma-service/prisma.service';
import { throwError } from '@utils/errors';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { UpdateCommentDto } from './dtos/update-comment-dto';
import { getComments } from './usecases/get-comments';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  create = async (
    createCommentDto: CreateCommentDto,
    request: Request,
    postId: number,
  ) => {
    try {
      return await createComment(
        createCommentDto,
        request,
        postId,
        this.prismaService,
      );
    } catch (error) {
      throwError(error);
    }
  };

  delete = async (id: number) => {
    try {
      return await deleteComment(id, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  update = async (id: number, updateCommentDto: UpdateCommentDto) => {
    try {
      return await updateComment(id, updateCommentDto, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  getAll = async () => {
    try {
      return await getComments(this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };
}
