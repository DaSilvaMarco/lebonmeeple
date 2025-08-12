import { CreateCommentDto } from '@backend/domains/comment/dtos/create-comment-dto';
import { type PrismaService } from '../../../../../prisma/prisma.service';
import { type Request } from 'express';
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
