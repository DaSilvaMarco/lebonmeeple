import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';

export const deleteComment = async (
  id: number,
  prismaService: PrismaService,
) => {
  return prismaService.comment.delete({ where: { id } });
};
