import { PrismaService } from 'src/prisma/prisma.service';
import { PRISMA_BASIC_USER } from 'src/domains/user/const/users';

export const getAllPosts = async (prismaService: PrismaService) => {
  return await prismaService.post.findMany({
    include: {
      user: {
        select: {
          ...PRISMA_BASIC_USER,
        },
      },
    },
  });
};
