import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';

export const getUser = async (id: number, prismaService: PrismaService) => {
  return await prismaService.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });
};
