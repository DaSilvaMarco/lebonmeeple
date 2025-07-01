import { vi } from 'vitest';
import { PrismaService } from 'src/prisma/prisma.service';
import { MOCKED_POST } from './const';
import { Request } from 'express';

export const prismaMock = () => {
  return {
    post: {
      update: vi.fn().mockResolvedValue(MOCKED_POST),
      findUnique: vi.fn().mockResolvedValue(MOCKED_POST),
    },
  } as unknown as PrismaService;
};

export const requestMock = {
  user: {
    userId: 1,
  },
  headers: {
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJDb3F1aW5obyIsImVtYWlsIjoidGRhc2lsdmEubWFyY29AZ21haWwuY29tIiwiaWF0IjoxNzUxMjkwMTQ5LCJleHAiOjE3NTEyOTczNDl9.86hRiYktBTPR6vHdIqJhh9UXpWxhZGnsjSPFiWUwPLw',
  },
} as unknown as Request;
