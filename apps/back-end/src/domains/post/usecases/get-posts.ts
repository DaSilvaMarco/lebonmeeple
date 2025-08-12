import { type PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { PRISMA_BASIC_USER } from '@backend/domains/user/constants';

export const getPosts = async (prismaService: PrismaService) => {
  return await prismaService.post.findMany({
    include: {
      user: {
        select: {
          ...PRISMA_BASIC_USER,
        },
      },
    },
  });
};
