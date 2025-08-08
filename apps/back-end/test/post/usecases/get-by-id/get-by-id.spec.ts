import { expect, test } from 'vitest';
import { prismaMock as prismaMockGetById } from './mock';
import { getById } from '@domains/post/usecases';

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
          userId: true,
          user: {
            select: {
              avatar: true,
              createdAt: false,
              email: true,
              id: false,
              password: false,
              updateAt: false,
              username: true,
            },
          },
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
