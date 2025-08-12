import { expect, test } from 'vitest';
import { prismaMock as prismaMockGetAll } from './mock';
import { POSTS_LIST } from './const';
import { getPosts } from '@backend/domains/post/usecases/get-posts';

test('The user can get all posts', async () => {
  const prismaMock = prismaMockGetAll();

  const result = await getPosts(prismaMock);

  expect(prismaMock.post.findMany).toHaveBeenCalled();
  expect(result).toMatchObject(POSTS_LIST);
});
