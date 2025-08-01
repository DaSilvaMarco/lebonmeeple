import { type PrismaService } from '@prisma-service/prisma.service';
import { USER_GET_BY_ID } from './const';
import { vi } from 'vitest';

export const prismaMockGetById = {
  user: {
    findUnique: vi.fn().mockResolvedValue(USER_GET_BY_ID),
  },
} as unknown as PrismaService;
