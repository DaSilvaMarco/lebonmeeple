import { BadRequestException } from '@nestjs/common';
import { type Request } from 'express';
import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { BasicUser } from '@backend/domains/user/types';
import { CreatePostDto } from '../dtos/create-post-dto';

export const createPost = async (
  createPostDto: CreatePostDto,
  request: Request,
  prismaService: PrismaService,
) => {
  const { id } = request.user as BasicUser;
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
