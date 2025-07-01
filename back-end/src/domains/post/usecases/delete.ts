import { PrismaService } from 'src/prisma/prisma.service';

export const deletePost = async (
  id: number,
  prismaService: PrismaService,
) => {
  return prismaService.post.delete({ where: { id } });
};
