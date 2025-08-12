import { prismaMock as prismaMockCreate, requestMock } from './mock';
import { CREATE_DTO } from './const';
import { expect, test } from 'vitest';
import { createComment } from '@backend/domains/comment/usecases/create-comment';

test('The user can create a comment in a post', async () => {
  const prismaMock = prismaMockCreate(CREATE_DTO);
  const result = await createComment(CREATE_DTO, requestMock, 1, prismaMock);

  expect(prismaMock.comment.create).toHaveBeenCalledWith({
    data: {
      body: CREATE_DTO.body,
      post: {
        connect: {
          id: 1,
        },
      },
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });

  expect(result).toMatchObject({
    body: CREATE_DTO.body,
    userId: 1,
    postId: 1,
  });
});
