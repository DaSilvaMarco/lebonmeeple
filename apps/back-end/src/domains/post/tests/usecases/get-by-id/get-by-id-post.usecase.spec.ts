import { expect, test } from 'vitest';
import { prismaMock as prismaMockGetById } from './mock';
import { getPost } from '@backend/domains/post/usecases/get-post';

test('The user can get one post by id', async () => {
  const prismaMock = prismaMockGetById(1);

  const result = await getPost(1, prismaMock);

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
              updatedAt: false,
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
          updatedAt: false,
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
