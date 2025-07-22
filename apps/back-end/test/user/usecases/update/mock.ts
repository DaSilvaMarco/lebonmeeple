import { vi } from 'vitest';
import { MOCKED_USER } from './const';
import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';

export const prismaMock = () => {
  return {
    user: {
      update: vi.fn().mockResolvedValue(MOCKED_USER),
      findUnique: vi.fn().mockResolvedValue(MOCKED_USER),
    },
  } as unknown as PrismaService;
};
