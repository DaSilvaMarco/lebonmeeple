import { createComment } from 'src/domains/comment/usecases/create';
import {
  prismaMock as prismaMockCreate,
  requestMock,
} from 'test/comment/usecases/create/mock';
import { CREATE_DTO } from './const';

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
