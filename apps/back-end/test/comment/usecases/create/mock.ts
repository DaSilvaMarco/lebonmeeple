import { CreateCommentDto } from 'apps/back-end/src/domains/comment/dtos';
import { PrismaService } from 'apps/back-end/src/prisma/prisma.service';
import { Request } from 'express';
import { vi } from 'vitest';

export const requestMock = {
  user: {
    id: 1,
  },
  headers: {
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJDb3F1aW5obyIsImVtYWlsIjoidGRhc2lsdmEubWFyY29AZ21haWwuY29tIiwiaWF0IjoxNzUxMjkwMTQ5LCJleHAiOjE3NTEyOTczNDl9.86hRiYktBTPR6vHdIqJhh9UXpWxhZGnsjSPFiWUwPLw',
  },
} as unknown as Request;

export const prismaMock = (createDto: CreateCommentDto) => {
  return {
    comment: {
      create: vi.fn().mockResolvedValue({
        body: createDto.body,
        userId: 1,
        postId: 1,
      }),
    },
  } as unknown as PrismaService;
};
