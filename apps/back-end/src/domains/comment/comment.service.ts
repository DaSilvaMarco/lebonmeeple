/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { type CreateCommentDto, type UpdateCommentDto } from './dtos';
import { createComment } from './usecases/create';
import { type Request } from 'express';
import { deleteComment } from './usecases/delete';
import { updateComment } from './usecases/update';
import { PrismaService } from '@prisma-service/prisma.service';
import { throwError } from '@utils/errors';

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
}
