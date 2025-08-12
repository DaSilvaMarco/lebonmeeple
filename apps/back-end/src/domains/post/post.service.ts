import { Injectable } from '@nestjs/common';
import { type Request } from 'express';

import { PrismaService } from '@prisma-service/prisma.service';
import { throwError } from '@utils/errors';
import { CreatePostDto } from './dtos/create-post-dto';
import { UpdatePostDto } from './dtos/update-post-dto';
import { createPost } from './usecases/create-post';
import { deletePost } from './usecases/delete-post';
import { getPosts } from './usecases/get-posts';
import { getPost } from './usecases/get-post';
import { updatePost } from './usecases/update-post';

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
      return await getPosts(this.prismaService);
    } catch (error) {
      throwError(error);
    }
  };

  getById = async (id: number) => {
    try {
      return await getPost(id, this.prismaService);
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
