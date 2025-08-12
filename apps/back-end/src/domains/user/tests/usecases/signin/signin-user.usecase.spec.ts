import { expect, test, vi } from 'vitest';
import { SIGNIN_DTO } from './const';
import {
  configServiceMock,
  jwtServiceMock,
  prismaMock as prismaMockSignin,
  prismaMockUserNotFound,
} from './mock';
import { NotFoundException } from '@nestjs/common';
import { signinUser } from '@backend/domains/user/usecases/signin-user';

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashedPassword'),
  compare: vi.fn().mockResolvedValue(true),
}));

test('The user can log in', async () => {
  const prismaMock = prismaMockSignin(SIGNIN_DTO);
  const result = await signinUser(
    SIGNIN_DTO,
    prismaMock,
    jwtServiceMock,
    configServiceMock,
  );

  expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
    where: { email: SIGNIN_DTO.email },
  });

  expect(result.token).toBe('mocked.jwt.token');
});

test('should throw error if user not found', async () => {
  await expect(
    signinUser(
      SIGNIN_DTO,
      prismaMockUserNotFound(),
      jwtServiceMock,
      configServiceMock,
    ),
  ).rejects.toBeInstanceOf(NotFoundException);
});
