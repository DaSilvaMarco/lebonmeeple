import { vi } from 'vitest';
import { MOCKED_COMMENT } from './const';
import { PrismaService } from '@prisma-service/prisma.service';

export const prismaMock = () => {
  return {
    comment: {
      update: vi.fn().mockResolvedValue(MOCKED_COMMENT),
      findUnique: vi.fn().mockResolvedValue(MOCKED_COMMENT),
    },
  } as unknown as PrismaService;
};
