import { createPost } from '../../../usecases';
import { CREATE_DTO } from './const';
import { prismaMock as prismaMockCreate } from './mock';
import { requestMock } from './mock';
import { expect, test, vi } from 'vitest';

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashedPassword'),
}));

test('The user can create an account', async () => {
  const prismaMock = prismaMockCreate(CREATE_DTO);
  const result = await createPost(CREATE_DTO, requestMock, prismaMock);

  expect(prismaMock.post.create).toHaveBeenCalledWith({
    data: {
      body: CREATE_DTO.body,
      title: CREATE_DTO.title,
      userId: 1,
      image: CREATE_DTO.image,
    },
  });

  expect(result).toMatchObject({
    body: CREATE_DTO.body,
    title: CREATE_DTO.title,
    userId: 1,
    image: CREATE_DTO.image,
  });
});
