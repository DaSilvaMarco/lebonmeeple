import { PrismaService } from 'src/prisma/prisma.service';
import { PRISMA_BASIC_USER } from 'src/domains/user/const/users';

export const getById = async (id: number, prismaService: PrismaService) => {
  return await prismaService.post.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          ...PRISMA_BASIC_USER,
        },
      },
      comments: {
        select: {
          id: true,
          body: true,
          updatedAt: true,
        },
      },
    },
  });
};
