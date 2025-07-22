import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { vi } from 'vitest';

export const prismaMock = () =>
  ({
    post: {
      findMany: vi.fn().mockResolvedValue([
        {
          id: 1,
          title: 'First post',
          body: 'Hello world!',
          userId: 1,
          image: 'image1.jpg',
        },
        {
          id: 2,
          title: 'Second post',
          body: 'Another one!',
          userId: 2,
          image: 'image2.jpg',
        },
      ]),
    },
  }) as unknown as PrismaService;
