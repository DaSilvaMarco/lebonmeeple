import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostDto } from '../dtos';
import { Post } from '@prisma/client';

export const updatePost = async (
  id: number,
  request: Request,
  updatePostDto: UpdatePostDto,
  prismaService: PrismaService,
): Promise<Post> => {
  const userId = request.user['userId'];

  return prismaService.post.update({
    where: { id },
    data: { ...updatePostDto },
  });
};
