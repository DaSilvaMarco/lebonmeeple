import { Request } from 'express';
import { CreateCommentDto } from 'src/domains/comment/dtos';
import { PrismaService } from 'src/prisma/prisma.service';

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
