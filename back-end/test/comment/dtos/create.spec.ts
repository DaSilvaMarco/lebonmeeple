import { describe, it, expect } from 'vitest';
import { validate } from 'class-validator';
import { CreateCommentDto } from 'src/domains/comment/dtos';

describe('CreateCommentDto', () => {
  it('should validate successfully with valid data', async () => {
    const dto = new CreateCommentDto();
    Object.assign(dto, { body: 'This is a comment' });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if body is empty', async () => {
    const dto = new CreateCommentDto();
    Object.assign(dto, { body: '' });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('body');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if body is missing', async () => {
    const dto = new CreateCommentDto();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('body');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
