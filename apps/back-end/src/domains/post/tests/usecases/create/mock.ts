import { CreatePostDto } from '@backend/domains/post/dtos/create-post-dto';
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

export const prismaMock = (createDto: CreatePostDto) => {
  return {
    user: {
      findUnique: vi.fn().mockResolvedValue(true),
    },
    post: {
      create: vi.fn().mockResolvedValue({
        body: createDto.body,
        title: createDto.title,
        userId: 1,
        image: createDto.image,
        category: createDto.category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        games: [],
      }),
    },
  } as unknown as PrismaService;
};

export const prismaMockUserNotFound = {
  user: {
    findUnique: vi.fn().mockResolvedValue(null),
  },
} as unknown as PrismaService;
