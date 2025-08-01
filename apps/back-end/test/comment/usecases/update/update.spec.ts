import { updateComment } from '@domains/comment/usecases';
import { MOCKED_COMMENT, UPDATE_DTO } from './const';
import { prismaMock as prismaMockUpdate } from './mock';
import { expect, test } from 'vitest';

test('The user can update a post', async () => {
  const prismaMock = prismaMockUpdate();

  const result = await updateComment(1, UPDATE_DTO, prismaMock);

  expect(prismaMock.comment.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: UPDATE_DTO,
  });

  expect(result).not.toMatchObject({
    MOCKED_COMMENT,
  });
});
