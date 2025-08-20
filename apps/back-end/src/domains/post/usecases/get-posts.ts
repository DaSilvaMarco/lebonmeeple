import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { PRISMA_BASIC_USER } from '@backend/domains/user/constants';

export const getPosts = async (
  prismaService: PrismaService,
  page = 1,
  limit = 10,
) => {
  const [posts, total] = await Promise.all([
    prismaService.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            ...PRISMA_BASIC_USER,
          },
        },
        games: {
          select: {
            id: true,
            name: true,
            image: true,
            year: true,
            rating: true,
          },
        },
      },
    }),
    prismaService.post.count(),
  ]);

  console.log('posts : ', posts);

  return {
    posts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
