import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_PAYLOAD } from './const';

export const prismaServiceMock = {
  user: {
    findUnique: vi.fn(),
  },
} as unknown as PrismaService;

export const configServiceMock = {
  get: vi.fn().mockReturnValue('SECRET_KEY_MOCK'),
} as unknown as Partial<ConfigService>;

export const prismaServicUserExistsMock = () => {
  // eslint-disable-next-line
  (prismaServiceMock.user.findUnique as any).mockResolvedValue({
    id: 1,
    email: USER_PAYLOAD.email,
    username: USER_PAYLOAD.username,
  });
};

export const prismaServiceUserNotFoundMock = () => {
  // eslint-disable-next-line
  (prismaServiceMock.user.findUnique as any).mockResolvedValue(null);
};
