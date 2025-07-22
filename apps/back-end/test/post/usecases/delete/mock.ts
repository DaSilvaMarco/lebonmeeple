import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
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
