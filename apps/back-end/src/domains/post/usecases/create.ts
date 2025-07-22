import { BadRequestException } from '@nestjs/common';
import { CreatePostDto } from '../dtos';
import { Request } from 'express';
import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';

export const createPost = async (
  createPostDto: CreatePostDto,
  request: Request,
  prismaService: PrismaService,
) => {
  const id = request.user['id'];
  const { body, title, image } = createPostDto;

  const user = await prismaService.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });

  if (!user) {
    throw new BadRequestException('User not found');
  }

  return await prismaService.post.create({
    data: {
      body,
      title,
      userId: id,
      image,
    },
  });
};
