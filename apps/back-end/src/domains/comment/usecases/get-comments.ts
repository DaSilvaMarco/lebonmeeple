import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { PRISMA_BASIC_USER } from '@backend/domains/user/constants';

export const getComments = async (prismaService: PrismaService) => {
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
