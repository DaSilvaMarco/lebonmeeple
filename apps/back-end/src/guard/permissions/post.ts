import { type User } from '@backend/domains/user/types/users';
import { ForbiddenException } from '@nestjs/common';
import { type PrismaService } from '@prisma-service/prisma.service';

export const checkPostPermission = async (
  user: User,
  paramId: number,
  prisma: PrismaService,
): Promise<boolean> => {
  const post = await prisma.post.findUnique({
    where: { id: paramId },
  });

  if (!post) {
    throw new ForbiddenException('Guard: Post not found');
  }

  if (post.userId === user.id || user.roles.includes('ADMIN')) {
    return true;
  }

  throw new ForbiddenException('The post is not yours');
};
