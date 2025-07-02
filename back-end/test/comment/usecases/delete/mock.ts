import { PrismaService } from 'src/prisma/prisma.service';

export const prismaMock = (id: number) => {
  return {
    comment: {
      delete: vi.fn().mockResolvedValue({
        id,
      }),
    },
  } as unknown as PrismaService;
};
