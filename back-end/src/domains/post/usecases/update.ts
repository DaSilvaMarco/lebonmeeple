import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostDto } from '../dtos';
import { Post } from '@prisma/client';

export const updatePost = async (
  id: number,
  updatePostDto: UpdatePostDto,
  prismaService: PrismaService,
): Promise<Post> => {
  return prismaService.post.update({
    where: { id },
    data: { ...updatePostDto },
  });
};
