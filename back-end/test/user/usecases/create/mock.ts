import { SignupDto } from "src/domains/user/dtos";
import { PrismaService } from "src/prisma/prisma.service";

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