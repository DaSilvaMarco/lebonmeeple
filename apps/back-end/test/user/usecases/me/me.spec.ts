import { expect, test, vi } from 'vitest';
import {
  jwtServiceAuthorizationMock,
  jwtServiceInvalidTokenMock,
  jwtServiceMock,
  jwtServiceUndefinedHeaderMock,
  requestEmptyMock,
  requestGoodBearerMock,
  requestInvalidTokenMock,
  requestMock,
} from './mock';
import { USER_ME } from './const';
import { me } from 'apps/back-end/src/domains/user/usecases';

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashedPassword'),
}));

test('The user can retrieve his informations', async () => {
  const result = await me(requestMock, jwtServiceMock);

  expect(jwtServiceMock.decode(result)).toMatchObject(USER_ME);
});

test('should return null if authorization header is missing', async () => {
  const result = await me(requestEmptyMock, jwtServiceUndefinedHeaderMock);

  expect(jwtServiceMock.decode).toHaveBeenCalledWith(null);
  expect(result).toBeNull();
});

test('should extract token from authorization header starting with "Bearer "', async () => {
  const result = await me(requestGoodBearerMock, jwtServiceAuthorizationMock);

  expect(jwtServiceAuthorizationMock.decode).toHaveBeenCalledWith(
    'abc.def.ghi',
  );
  expect(result).toEqual({ sub: 1 });
});

test('should return null if authorization header does not start with "Bearer "', async () => {
  const result = await me(requestInvalidTokenMock, jwtServiceInvalidTokenMock);

  expect(jwtServiceInvalidTokenMock.decode).toHaveBeenCalledWith(null);
  expect(result).toBeNull();
});
