import { vi } from 'vitest';
import { MOCKED_POST } from './const';
import { type PrismaService } from '@prisma-service/prisma.service';

export const prismaMock = () => {
  return {
    post: {
      update: vi.fn().mockResolvedValue(MOCKED_POST),
      findUnique: vi.fn().mockResolvedValue(MOCKED_POST),
    },
  } as unknown as PrismaService;
};
