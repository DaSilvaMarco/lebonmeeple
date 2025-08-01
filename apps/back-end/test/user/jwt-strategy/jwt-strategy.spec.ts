import { beforeEach, describe, expect, it } from 'vitest';
import { type ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { USER_PAYLOAD } from './const';
import {
  configServiceMock,
  prismaServicUserExistsMock,
  prismaServiceMock,
  prismaServiceUserNotFoundMock,
} from './mock';
import { JwtStrategy } from '@domains/user/jwtStrategy';
import { type PrismaService } from '@prisma-service/prisma.service';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(() => {
    jwtStrategy = new JwtStrategy(
      configServiceMock as ConfigService,
      prismaServiceMock as PrismaService,
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
      UnauthorizedException,
    );
  });
});
