import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request } from 'express';
import { CommentController } from 'src/domains/comment/comment.controller';
import { CreateCommentDto, UpdateCommentDto } from 'src/domains/comment/dtos';

describe('CommentController', () => {
  let controller: CommentController;
  // eslint-disable-next-line
  let commentServiceMock: any;

  beforeEach(() => {
    commentServiceMock = {
      create: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    };

    controller = new CommentController(commentServiceMock);
  });

  it('should call create with correct dto, request and postId, and return result', async () => {
    const createDto: CreateCommentDto = { body: 'Comment body' };
    const fakeRequest = {} as Request;
    const postId = 42;
    const expectedResult = { id: 1, ...createDto, postId };

    commentServiceMock.create.mockResolvedValue(expectedResult);

    const result = await controller.create(
      createDto,
      fakeRequest,
      String(postId),
    );

    expect(commentServiceMock.create).toHaveBeenCalledWith(
      createDto,
      fakeRequest,
      postId,
    );
    expect(result).toEqual(expectedResult);
  });

  it('should call delete with correct id and return result', async () => {
    const commentId = 5;
    const expectedResult = { id: commentId, deleted: true };

    commentServiceMock.delete.mockResolvedValue(expectedResult);

    const result = await controller.delete(commentId);

    expect(commentServiceMock.delete).toHaveBeenCalledWith(commentId);
    expect(result).toEqual(expectedResult);
  });

  it('should call update with correct id and dto and return result', async () => {
    const commentId = 5;
    const updateDto: UpdateCommentDto = { body: 'Updated comment' };
    const expectedResult = { id: commentId, ...updateDto };

    commentServiceMock.update.mockResolvedValue(expectedResult);

    const result = await controller.update(commentId, updateDto);

    expect(commentServiceMock.update).toHaveBeenCalledWith(
      commentId,
      updateDto,
    );
    expect(result).toEqual(expectedResult);
  });
});
