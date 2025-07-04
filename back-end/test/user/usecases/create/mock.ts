import { SignupDto } from 'src/domains/user/dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import { SIGNUP_DTO } from './const';

export const prismaMock = (signupDto: SignupDto) => {
  return {
    user: {
      create: vi.fn().mockResolvedValue({
        id: 1,
        email: signupDto.email,
        username: signupDto.username,
        password: 'hashedPassword',
        avatar: signupDto.avatar,
      }),
      findUnique: vi.fn().mockResolvedValue(null),
    },
  } as unknown as PrismaService;
};

export const prismaMockConflict = {
  user: {
    findUnique: vi.fn().mockResolvedValue({ id: 1, email: SIGNUP_DTO.email }),
    create: vi.fn(),
  },
} as unknown as PrismaService;

export const prismaMockUserAlreadyExists = {
  user: {
    findUnique: vi
      .fn()
      .mockResolvedValue({ id: 1, email: 'existing@example.com' }),
  },
} as unknown as PrismaService;
