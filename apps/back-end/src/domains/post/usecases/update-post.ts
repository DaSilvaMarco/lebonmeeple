import { type PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { UpdatePostDto } from '../dtos/update-post-dto';

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
