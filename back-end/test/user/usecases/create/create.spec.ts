import { createUser } from 'src/domains/user/usecases';
import { expect, test, vi } from 'vitest';
import { SIGNUP_DTO } from './const';
import { prismaMock } from './mock';

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashedPassword'),
}));

test('The user can create an account', async () => {
  const prismaMockCreate = prismaMock(SIGNUP_DTO);
  const result = await createUser(SIGNUP_DTO, prismaMockCreate);

  expect(prismaMockCreate.user.create).toHaveBeenCalledWith({
    data: {
      email: SIGNUP_DTO.email,
      username: SIGNUP_DTO.username,
      password: 'hashedPassword',
      avatar: SIGNUP_DTO.avatar,
    },
  });

  expect(result).toMatchObject({
    id: 1,
    email: SIGNUP_DTO.email,
    username: SIGNUP_DTO.username,
    password: 'hashedPassword',
    avatar: SIGNUP_DTO.avatar,
  });
});
