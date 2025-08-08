import { expect, test, vi } from 'vitest';
import { UPDATE_DTO, UPDATE_DTO_TWO } from './const';
import { prismaMock as prismaMockUpdate } from './mock';
import { updateUser } from '../../../usecases';

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashedPassword'),
}));

test('The user can update his account', async () => {
  const prismaMock = prismaMockUpdate();
  const result = await updateUser(UPDATE_DTO.id, UPDATE_DTO, prismaMock);

  expect(prismaMock.user.update).toHaveBeenCalledWith({
    where: { id: UPDATE_DTO.id },
    data: {
      email: UPDATE_DTO.email,
      username: UPDATE_DTO.username,
      avatar: UPDATE_DTO.avatar,
    },
  });

  expect(result).not.toMatchObject({
    email: UPDATE_DTO_TWO.email,
    username: UPDATE_DTO_TWO.username,
    avatar: UPDATE_DTO_TWO.avatar,
  });
});
