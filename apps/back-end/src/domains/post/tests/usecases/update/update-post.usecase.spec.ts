import { expect, test } from 'vitest';
import { prismaMock as prismaMockUpdate } from './mock';
import { updatePost } from '@backend/domains/post/usecases/update-post';

const UPDATE_DTO = {
  title: 'Updated post title',
  body: 'Updated post content',
  image: 'updated-image.jpg',
};

test('The user can update a post', async () => {
  const prismaMock = prismaMockUpdate();
  const result = await updatePost(1, UPDATE_DTO, prismaMock);

  expect(prismaMock.post.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: { ...UPDATE_DTO, updatedAt: expect.any(Date) },
    include: { games: true },
  });

  expect(result).not.toMatchObject({
    id: 1,
    ...UPDATE_DTO,
    userId: 1,
  });
});
