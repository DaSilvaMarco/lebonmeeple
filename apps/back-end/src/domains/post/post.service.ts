import { Injectable } from '@nestjs/common';
import { type Request } from 'express';

import { type CreatePostDto, type UpdatePostDto } from './dtos';
import {
  createPost,
  deletePost,
  getAllPosts,
  getById,
  updatePost,
} from './usecases';
import { PrismaService } from '@prisma-service/prisma.service';
import { throwError } from '@utils/errors';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  create = async (createPostDto: CreatePostDto, request: Request) => {
    try {
      return await createPost(createPostDto, request, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  delete = async (id: number) => {
    try {
      return await deletePost(id, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  getAll = async () => {
    try {
      return await getAllPosts(this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  getById = async (id: number) => {
    try {
      return await getById(id, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  update = async (
    id: number,
    request: Request,
    updatePostDto: UpdatePostDto,
  ) => {
    try {
      return await updatePost(id, updatePostDto, this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };
}
