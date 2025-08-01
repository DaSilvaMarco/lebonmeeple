import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Request } from 'express';
import { CommentController } from '@domains/comment/comment.controller';
import {
  type CreateCommentDto,
  type UpdateCommentDto,
} from '@domains/comment/dtos';

describe('CommentController', () => {
  let controller: CommentController;

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
