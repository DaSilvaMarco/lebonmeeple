import { expect, test } from 'vitest';
import { prismaMock as prismaMockGetAll } from './mock';
import { getAllPosts } from 'src/domains/post/usecases';
import { POSTS_LIST } from './const'; // tableau attendu de posts simulés

test('The user can get all posts', async () => {
  const prismaMock = prismaMockGetAll();

  const result = await getAllPosts(prismaMock);

  expect(prismaMock.post.findMany).toHaveBeenCalled();
  expect(result).toMatchObject(POSTS_LIST);
});
