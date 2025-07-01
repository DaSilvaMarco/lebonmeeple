import { vi } from 'vitest';
import { PrismaService } from 'src/prisma/prisma.service';
import { MOCKED_USER } from './const';

export const prismaMock = () => {
  return {
    user: {
      update: vi.fn().mockResolvedValue(MOCKED_USER),
      findUnique: vi.fn().mockResolvedValue(MOCKED_USER),
    },
  } as unknown as PrismaService;
};
