import { expect, test } from 'vitest';
import { POST_TO_DELETE } from './const';
import { prismaMock as prismaMockDelete } from './mock';
import { deletePost } from '@backend/domains/post/usecases/delete-post';

test('The user can delete a post', async () => {
  const prismaMock = prismaMockDelete(POST_TO_DELETE.id);
  const result = await deletePost(POST_TO_DELETE.id, prismaMock);

  expect(prismaMock.post.delete).toHaveBeenCalledWith({
    where: { id: POST_TO_DELETE.id },
  });

  expect(result).toMatchObject({
    id: POST_TO_DELETE.id,
  });
});
