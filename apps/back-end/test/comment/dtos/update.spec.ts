import { UpdateCommentDto } from 'apps/back-end/src/domains/comment/dtos';
import { describe, it, expect } from 'vitest';

describe('UpdateCommentDto', () => {
  it('should assign the body property', () => {
    const dto = new UpdateCommentDto();
    Object.assign(dto, { body: 'This is a comment' });
    Object.assign(dto, { body: 'Updated comment' });
    expect(dto.body).toBe('Updated comment');
  });
});
