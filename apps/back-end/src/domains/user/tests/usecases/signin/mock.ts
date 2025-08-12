import { type ConfigService } from '@nestjs/config';
import { type JwtService } from '@nestjs/jwt';
import { type PrismaService } from '../../../../../prisma/prisma.service';
import { vi } from 'vitest';
import { type SigninUserDto } from '@backend/domains/user/dtos/signin-user-dto';

export const configServiceMock = {
  get: vi.fn((key: string) => {
    if (key === 'JWT_SECRET') return 'supersecretkey';
    return null;
  }),
} as unknown as ConfigService;

export const jwtServiceMock = {
  sign: vi.fn(() => 'mocked.jwt.token'),
} as Partial<JwtService> as JwtService;

export const prismaMock = (signinDto: SigninUserDto) => {
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

export const prismaCredentialsNotGood = (signinDto: SigninUserDto) => {
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
