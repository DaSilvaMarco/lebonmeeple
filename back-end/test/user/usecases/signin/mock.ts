import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from 'src/domains/user/dtos';
import { PrismaService } from 'src/prisma/prisma.service';

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