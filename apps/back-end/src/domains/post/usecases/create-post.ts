import { BadRequestException } from '@nestjs/common';
import { type Request } from 'express';
import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { BasicUser } from '@backend/domains/user/types';
import { CreatePostDto } from '../dtos/create-post-dto';

export const createPost = async (
  dto: CreatePostDto,
  req: Request,
  prisma: PrismaService,
) => {
  const userId = (req.user as BasicUser).id;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new BadRequestException('User not found');

  const post = await prisma.post.create({
    data: {
      title: dto.title,
      body: dto.body,
      image: dto.image,
      category: dto.category,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      games:
        dto.gameIds && dto.gameIds.length > 0
          ? { connect: dto.gameIds.map((id) => ({ id })) }
          : undefined,
    },
    include: { games: { select: { id: true } } },
  });

  return {
    ...post,
    gameIds: post.games.map((g) => g.id),
    games: undefined,
  };
};
