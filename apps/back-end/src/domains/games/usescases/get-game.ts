import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { PRISMA_BASIC_USER } from '@backend/domains/user/constants';

export const getGame = async (id: number, prismaService: PrismaService) => {
  return await prismaService.game.findUnique({
    where: { id },
    include: {
      comments: {
        select: {
          id: true,
          body: true,
          updatedAt: true,
          userId: true,
          user: {
            select: {
              ...PRISMA_BASIC_USER,
            },
          },
        },
      },
    },
  });
};
