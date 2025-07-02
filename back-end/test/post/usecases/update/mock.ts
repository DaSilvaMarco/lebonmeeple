import { vi } from 'vitest';
import { PrismaService } from 'src/prisma/prisma.service';
import { MOCKED_POST } from './const';

export const prismaMock = () => {
  return {
    post: {
      update: vi.fn().mockResolvedValue(MOCKED_POST),
      findUnique: vi.fn().mockResolvedValue(MOCKED_POST),
    },
  } as unknown as PrismaService;
};
