import { type PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { PRISMA_BASIC_USER } from '@domains/user/const/users';

export const getAllComments = async (prismaService: PrismaService) => {
  return await prismaService.comment.findMany({
    include: {
      user: {
        select: {
          ...PRISMA_BASIC_USER,
        },
      },
    },
  });
};
