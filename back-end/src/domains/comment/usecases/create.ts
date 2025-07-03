import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from '../dtos/create';
import { BasicUser } from 'src/domains/user/types/users';

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
