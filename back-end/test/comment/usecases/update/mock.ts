import { vi } from 'vitest';
import { PrismaService } from 'src/prisma/prisma.service';
import { MOCKED_COMMENT } from './const';

export const prismaMock = () => {
  return {
    comment: {
      update: vi.fn().mockResolvedValue(MOCKED_COMMENT),
      findUnique: vi.fn().mockResolvedValue(MOCKED_COMMENT),
    },
  } as unknown as PrismaService;
};
