import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request } from 'express';
import { PostController } from 'src/domains/post/post.controller';
import { CreatePostDto, UpdatePostDto } from 'src/domains/post/dtos';

describe('PostController', () => {
  let controller: PostController;
  // eslint-disable-next-line
  let postServiceMock: any;

  beforeEach(() => {
    postServiceMock = {
      create: vi.fn(),
      getAll: vi.fn(),
      getById: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    };

    controller = new PostController(postServiceMock);
  });

  it('should call create with correct dto and request, and return result', async () => {
    const dto: CreatePostDto = { title: 'Test Post', body: 'Content' };
    const fakeRequest = {} as Request;
    const expectedResult = { id: 1, ...dto };

    postServiceMock.create.mockResolvedValue(expectedResult);

    const result = await controller.create(dto, fakeRequest);

    expect(postServiceMock.create).toHaveBeenCalledWith(dto, fakeRequest);
    expect(result).toEqual(expectedResult);
  });

  it('should call getAll and return result', async () => {
    const expectedResult = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];

    postServiceMock.getAll.mockResolvedValue(expectedResult);

    const result = await controller.getAll();

    expect(postServiceMock.getAll).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('should call delete with correct id and return result', async () => {
    const postId = 1;
    const expectedResult = { id: postId, deleted: true };

    postServiceMock.delete.mockResolvedValue(expectedResult);

    const result = await controller.delete(postId);

    expect(postServiceMock.delete).toHaveBeenCalledWith(postId);
    expect(result).toEqual(expectedResult);
  });

  it('should call update with correct params and return result', async () => {
    const postId = 1;
    const dto: UpdatePostDto = {
      title: 'Updated Title',
      body: 'Updated Content',
      image: 'updated-image.png',
    };
    const fakeRequest = {} as Request;
    const expectedResult = { id: postId, ...dto };

    postServiceMock.update.mockResolvedValue(expectedResult);

    const result = await controller.update(postId, fakeRequest, dto);

    expect(postServiceMock.update).toHaveBeenCalledWith(
      postId,
      fakeRequest,
      dto,
    );
    expect(result).toEqual(expectedResult);
  });
});
