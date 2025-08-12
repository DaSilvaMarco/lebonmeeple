import { type PrismaService } from '../../../../../prisma/prisma.service';
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
      count: vi.fn().mockResolvedValue(2),
    },
  }) as unknown as PrismaService;
