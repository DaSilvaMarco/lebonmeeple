import { type PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { type UpdatePostDto } from '../dtos';

export const updatePost = async (
  id: number,
  updatePostDto: UpdatePostDto,
  prismaService: PrismaService,
) => {
  return prismaService.post.update({
    where: { id },
    data: { ...updatePostDto },
  });
};
