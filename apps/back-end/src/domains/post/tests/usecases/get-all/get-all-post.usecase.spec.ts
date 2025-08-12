import { expect, test } from 'vitest';
import { prismaMock as prismaMockGetAll } from './mock';
import { POSTS_LIST } from './const';
import { getPosts } from '@backend/domains/post/usecases/get-posts';

test('The user can get all posts', async () => {
  const prismaMock = prismaMockGetAll();
  const page = 1;
  const limit = 10;
  const result = await getPosts(prismaMock, page, limit);

  expect(prismaMock.post.findMany).toHaveBeenCalled();
  expect(prismaMock.post.count).toHaveBeenCalled();
  expect(result).toMatchObject({
    posts: POSTS_LIST,
    total: 2,
    page,
    limit,
    totalPages: 1,
  });
});
