import { expect, test, vi } from 'vitest';
import { getById } from 'src/domains/post/usecases';
import { prismaMock as prismaMockGetById } from './mock';

test('The user can get one post by id', async () => {
  const prismaMock = prismaMockGetById(1);

  const result = await getById(1, prismaMock);

  expect(prismaMock.post.findUnique).toHaveBeenCalledWith({
    where: { id: 1 },
    include: {
      comments: {
        select: {
          body: true,
          id: true,
          updatedAt: true,
        },
      },
      user: {
        select: {
          avatar: true,
          createdAt: false,
          email: true,
          id: false,
          updateAt: false,
          username: true,
          password: false,
        },
      },
    },
  });

  expect(result).toMatchObject({
    id: 1,
    title: 'Sample Post Title',
    body: 'Sample post body content',
    userId: 1,
    image: 'sample.jpg',
  });
});
