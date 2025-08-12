import { type PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { UpdateCommentDto } from '../dtos/update-comment-dto';

export const updateComment = async (
  id: number,
  updateCommentDto: UpdateCommentDto,
  prismaService: PrismaService,
) => {
  const { body } = updateCommentDto;

  return await prismaService.comment.update({
    where: { id },
    data: {
      body,
    },
  });
};
