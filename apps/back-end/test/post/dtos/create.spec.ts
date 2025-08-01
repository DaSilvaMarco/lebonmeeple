import { describe, expect, it, test } from 'vitest';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { CREATE_DTO } from '../usecases/create/const';
import { prismaMockUserNotFound, requestMock } from '../usecases/create/mock';
import { CreatePostDto } from '@domains/post/dtos';
import { createPost } from '@domains/post/usecases';

describe('CreatePostDto', () => {
  it('should validate successfully with valid data', async () => {
    const dto = new CreatePostDto();
    Object.assign(dto, {
      body: 'This is a post',
      title: 'Post Title',
      image: 'http://example.com/image.jpg',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if body is empty', async () => {
    const dto = new CreatePostDto();
    Object.assign(dto, { title: '', body: '', image: '' });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('title');
    expect(errors[1].property).toBe('body');
    expect(errors[2].property).toBe('image');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if body is missing', async () => {
    const dto = new CreatePostDto();
    Object.assign(dto, {
      title: 'Post Title',
      image: 'http://example.com/image.jpg',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('body');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  test('should throw error if user not found', async () => {
    await expect(
      createPost(CREATE_DTO, requestMock, prismaMockUserNotFound),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
