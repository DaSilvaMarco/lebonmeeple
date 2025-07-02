import { describe, it, expect, beforeEach } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from 'src/domains/user/jwtStrategy';
import { USER_PAYLOAD } from './const';
import {
  configServiceMock,
  prismaServiceMock,
  prismaServiceUserNotFoundMock,
  prismaServicUserExistsMock,
} from './mock';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(() => {
    jwtStrategy = new JwtStrategy(
      configServiceMock as ConfigService,
      prismaServiceMock as PrismaService
    );
  });

  it('should validate and return user data if user exists', async () => {
    prismaServicUserExistsMock();
    const result = await jwtStrategy.validate(USER_PAYLOAD);
    expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: USER_PAYLOAD.email },
    });

    expect(result).toEqual({
      id: 1,
      email: USER_PAYLOAD.email,
      username: USER_PAYLOAD.username,
    });
  });

  it('should throw UnauthorizedException if user not found', async () => {
    prismaServiceUserNotFoundMock();
    await expect(jwtStrategy.validate(USER_PAYLOAD)).rejects.toThrow(
      UnauthorizedException
    );
  });
});
