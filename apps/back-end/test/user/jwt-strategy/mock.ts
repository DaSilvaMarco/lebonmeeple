import { ConfigService } from '@nestjs/config';
import { USER_PAYLOAD } from './const';
import { PrismaService } from '@prisma-service/prisma.service';
import { vi } from 'vitest';

export const prismaServiceMock = {
  user: {
    findUnique: vi.fn(),
  },
} as unknown as PrismaService;

export const configServiceMock = {
  get: vi.fn().mockReturnValue('SECRET_KEY_MOCK'),
} as unknown as Partial<ConfigService>;

export const prismaServicUserExistsMock = () => {
  (prismaServiceMock.user.findUnique as any).mockResolvedValue({
    id: 1,
    email: USER_PAYLOAD.email,
    username: USER_PAYLOAD.username,
  });
};

export const prismaServiceUserNotFoundMock = () => {
  (prismaServiceMock.user.findUnique as any).mockResolvedValue(null);
};
