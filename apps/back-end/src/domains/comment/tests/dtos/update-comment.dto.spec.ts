import { describe, expect, it } from 'vitest';
import { UpdateCommentDto } from '../../dtos/update-comment-dto';

describe('UpdateCommentDto', () => {
  it('should assign the body property', () => {
    const dto = new UpdateCommentDto();
    Object.assign(dto, { body: 'This is a comment' });
    Object.assign(dto, { body: 'Updated comment' });
    expect(dto.body).toBe('Updated comment');
  });
});
