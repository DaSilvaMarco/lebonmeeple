import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';

export const getGames = async (
  prismaService: PrismaService,
  page = 1,
  limit = 10,
) => {
  const [games, total] = await Promise.all([
    prismaService.game.findMany({
      skip: (page - 1) * limit,
      take: limit,
    }),
    prismaService.game.count(),
  ]);

  return {
    games,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
