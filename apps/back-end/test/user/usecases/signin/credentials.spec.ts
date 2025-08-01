import { signinUser } from '@domains/user/usecases';
import { SIGNIN_DTO, SIGNIN_WRONG_DTO } from './const';
import {
  configServiceMock,
  jwtServiceMock,
  prismaCredentialsNotGood,
} from './mock';
import { UnauthorizedException } from '@nestjs/common';
import { vi, test, expect } from 'vitest';

test('should throw error if credentials are not good', async () => {
  vi.mock('bcrypt', () => ({
    compare: vi.fn().mockResolvedValue(false),
  }));

  await expect(
    signinUser(
      SIGNIN_DTO,
      prismaCredentialsNotGood(SIGNIN_WRONG_DTO),
      jwtServiceMock,
      configServiceMock,
    ),
  ).rejects.toBeInstanceOf(UnauthorizedException);
});
