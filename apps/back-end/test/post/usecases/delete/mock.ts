import { PrismaService } from '@prisma-service/prisma.service';
import { vi } from 'vitest';

export const prismaMock = (id: number) => {
  return {
    post: {
      delete: vi.fn().mockResolvedValue({
        id,
      }),
    },
  } as unknown as PrismaService;
};
