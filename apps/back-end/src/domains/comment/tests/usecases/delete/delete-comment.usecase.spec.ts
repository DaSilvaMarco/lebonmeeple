import { deleteComment } from '@backend/domains/comment/usecases/delete-comment';
import { COMMENT_TO_DELETE } from './const';
import { prismaMock as prismaMockDelete } from './mock';
import { expect, test } from 'vitest';

test('The user can delete a comment', async () => {
  const { id } = COMMENT_TO_DELETE;

  const prismaMock = prismaMockDelete(id);
  const result = await deleteComment(id, prismaMock);

  expect(prismaMock.comment.delete).toHaveBeenCalledWith({
    where: { id },
  });

  expect(result).toMatchObject({
    id,
  });
});
