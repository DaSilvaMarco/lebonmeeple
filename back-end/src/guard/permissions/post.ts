import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export const checkPostPermission = async (
  userId: number,
  paramId: number,
  prisma: PrismaService,
): Promise<boolean> => {
  const post = await prisma.post.findUnique({
    where: { id: paramId },
  });

  if (post.userId === userId) {
    return true;
  }

  throw new ForbiddenException('The post is not yours');
};
