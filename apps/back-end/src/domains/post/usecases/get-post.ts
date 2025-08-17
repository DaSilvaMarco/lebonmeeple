import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { PRISMA_BASIC_USER } from '@backend/domains/user/constants';

export const getPost = async (id: number, prismaService: PrismaService) => {
  return await prismaService.post.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          ...PRISMA_BASIC_USER,
        },
      },
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
      games: {
        select: {
          id: true,
          name: true,
          year: true,
          image: true,
          rating: true,
          description: false,
        },
      },
    },
  });
};
