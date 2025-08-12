import { expect, test } from 'vitest';
import { USER_GET_BY_ID } from './const';
import { prismaMockGetById } from './mock';
import { getUser } from '@backend/domains/user/usecases/get-user';

test('The user can get an user by id', async () => {
  const result = await getUser(1, prismaMockGetById);

  expect(prismaMockGetById.user.findUnique).toHaveBeenCalledWith({
    where: { id: 1 },
    select: {
      email: true,
      id: true,
      username: true,
    },
  });

  expect(result).toMatchObject(USER_GET_BY_ID);
});
