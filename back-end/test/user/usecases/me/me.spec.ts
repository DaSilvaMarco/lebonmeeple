import { me } from 'src/domains/user/usecases';
import { expect, test, vi } from 'vitest';
import { jwtServiceMock, requestMock } from './mock';
import { USER_ME } from './const';

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashedPassword'),
}));

test('The user can retrieve his informations', async () => {
  const result = await me(requestMock, jwtServiceMock);

  expect(jwtServiceMock.decode(result)).toMatchObject(USER_ME);
});
