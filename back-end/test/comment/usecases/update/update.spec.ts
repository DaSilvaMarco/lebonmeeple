import { MOCKED_COMMENT, UPDATE_DTO } from "./const";
import { updateComment } from "src/domains/comment/usecases/update";
import { prismaMock as prismaMockUpdate } from "./mock";

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
