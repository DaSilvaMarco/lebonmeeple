import { type PrismaService } from '../../../../../prisma/prisma.service';
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
