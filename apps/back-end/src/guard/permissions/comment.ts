import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export const checkCommentPermission = async (
  userId: number,
  paramId: number,
  prisma: PrismaService,
): Promise<boolean> => {
  const comment = await prisma.comment.findUnique({
    where: { id: paramId },
  });

  if (comment.userId === userId) {
    return true;
  }

  throw new ForbiddenException('The comment is not yours');
};
