import { PrismaService } from 'src/prisma/prisma.service';

export const deleteComment = async (
  id: number,
  prismaService: PrismaService,
) => {
  await prismaService.comment.delete({ where: { id } });
  return 'Comment deleted !';
};
