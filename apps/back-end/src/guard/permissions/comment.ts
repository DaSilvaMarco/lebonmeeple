import { type User } from '@backend/domains/user/types';
import { ForbiddenException } from '@nestjs/common';
import { type PrismaService } from '@prisma-service/prisma.service';

export const checkCommentPermission = async (
  user: User,
  paramId: number,
  prisma: PrismaService,
): Promise<boolean> => {
  const comment = await prisma.comment.findUnique({
    where: { id: paramId },
  });

  if (!comment) {
    throw new ForbiddenException('Guard: Comment not found');
  }

  if (comment.userId === user.id || user.roles.includes('ADMIN')) {
    return true;
  }

  throw new ForbiddenException('The comment is not yours');
};
