import { type Request } from 'express';
import { type CreateCommentDto } from '../dtos/create-comment-dto';
import { type BasicUser } from '@domains/user/types/users';
import { type PrismaService } from 'apps/back-end/src/prisma/prisma.service';

export const createComment = async (
  createCommentDto: CreateCommentDto,
  request: Request,
  postId: number,
  prismaService: PrismaService,
) => {
  const { body } = createCommentDto;
  const user = request.user as BasicUser;

  return await prismaService.comment.create({
    data: {
      body,
      post: {
        connect: { id: postId },
      },
      user: {
        connect: { id: user.id },
      },
    },
  });
};
