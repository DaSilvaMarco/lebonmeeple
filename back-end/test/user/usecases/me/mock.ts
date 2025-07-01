import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { USER_ME } from "./const";

export const prismaMock = (userId: number) => {
  return {
    user: {
      findUnique: vi.fn().mockResolvedValue({
        id: userId,
        email: 'pouetpouet',
        username: 'pouet',
        password: 'hashedPassword',
        avatar: 'https://example.com/avatar.png',
      }),
    },
  } as unknown as PrismaService;
};

export const jwtServiceMock = {
  decode: vi.fn(() => USER_ME),
} as Partial<JwtService> as JwtService;

export const requestMock = {
  headers: {
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJDb3F1aW5obyIsImVtYWlsIjoidGRhc2lsdmEubWFyY29AZ21haWwuY29tIiwiaWF0IjoxNzUxMjkwMTQ5LCJleHAiOjE3NTEyOTczNDl9.86hRiYktBTPR6vHdIqJhh9UXpWxhZGnsjSPFiWUwPLw',
  },
} as unknown as Request;
