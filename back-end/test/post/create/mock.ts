import { Request } from "express";
import { CreatePostDto } from "src/domains/post/dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { MOCKED_USER } from "./const";

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
      }),
    },
  } as unknown as PrismaService;
};
