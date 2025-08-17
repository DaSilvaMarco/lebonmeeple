import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { UpdatePostDto } from '../dtos/update-post-dto';

export const updatePost = async (
  id: number,
  updatePostDto: UpdatePostDto,
  prismaService: PrismaService,
) => {
  const { games, ...rest } = updatePostDto;

  return prismaService.post.update({
    where: { id },
    data: {
      ...rest,
      updatedAt: new Date(),
      ...(games && {
        games: {
          set: games.map((gameId) => ({ id: gameId })),
        },
      }),
    },
    include: { games: true },
  });
};
