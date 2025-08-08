import { vi } from 'vitest';
import { MOCKED_USER } from './const';
import { type PrismaService } from '../../../../../prisma/prisma.service';

export const prismaMock = () => {
  return {
    user: {
      update: vi.fn().mockResolvedValue(MOCKED_USER),
      findUnique: vi.fn().mockResolvedValue(MOCKED_USER),
    },
  } as unknown as PrismaService;
};
