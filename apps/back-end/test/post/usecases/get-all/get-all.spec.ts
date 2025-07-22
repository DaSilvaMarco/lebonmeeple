import { expect, test } from 'vitest';
import { prismaMock as prismaMockGetAll } from './mock';
import { POSTS_LIST } from './const';
import { getAllPosts } from 'apps/back-end/src/domains/post/usecases';

test('The user can get all posts', async () => {
  const prismaMock = prismaMockGetAll();

  const result = await getAllPosts(prismaMock);

  expect(prismaMock.post.findMany).toHaveBeenCalled();
  expect(result).toMatchObject(POSTS_LIST);
});
