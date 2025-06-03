import { PrismaService } from 'src/prisma/prisma.service';

export const getById = async (id: number, prismaService: PrismaService) => {
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
