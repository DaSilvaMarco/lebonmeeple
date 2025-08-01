import { type ConfigService } from '@nestjs/config';
import { type JwtService } from '@nestjs/jwt';
import { type SigninDto } from '@domains/user/dtos';
import { type PrismaService } from '@prisma-service/prisma.service';
import { vi } from 'vitest';

export const configServiceMock = {
  get: vi.fn((key: string) => {
    if (key === 'JWT_SECRET') return 'supersecretkey';
    return null;
  }),
} as unknown as ConfigService;

export const jwtServiceMock = {
  sign: vi.fn(() => 'mocked.jwt.token'),
} as Partial<JwtService> as JwtService;

export const prismaMock = (signinDto: SigninDto) => {
  return {
    user: {
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        email: signinDto.email,
        password: 'hashedPassword',
      }),
    },
  } as unknown as PrismaService;
};

export const prismaMockUserNotFound = () => {
  return {
    user: {
      findUnique: vi.fn().mockResolvedValue(null),
    },
  } as unknown as PrismaService;
};

export const prismaCredentialsNotGood = (signinDto: SigninDto) => {
  return {
    user: {
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        email: signinDto.email,
        password: signinDto.password,
      }),
    },
  } as unknown as PrismaService;
};
