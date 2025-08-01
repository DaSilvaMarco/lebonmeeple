import { BadRequestException } from '@nestjs/common';
import { type CreatePostDto } from '../dtos';
import { type Request } from 'express';
import { type PrismaService } from 'apps/back-end/src/prisma/prisma.service';

export const createPost = async (
  createPostDto: CreatePostDto,
  request: Request,
  prismaService: PrismaService,
) => {
  // eslint-disable-next-line prefer-destructuring
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
