import { beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

// Import modules à tester
import * as constants from '../constants';
import {
  addComment,
  commentSlice,
  deleteComment,
  setComments,
  updateComment,
} from '../slice';
import { createCommentSchema } from '../schema';
import { createComment } from '../api/create-comment';
import { updateComment as updateCommentApi } from '../api/update-comment';
import { deleteComment as deleteCommentApi } from '../api/delete-comment';

// Types pour les tests
import type {
  Comment,
  CreateCommentDto,
  InitialStateComment,
  UpdateCommentDto,
} from '../type';

// Mock des dépendances externes
vi.mock('@/utils/api-config', () => ({
  getApiBaseUrl: vi.fn(() => 'http://localhost:3000/api'),
}));

// Mock global de fetch
global.fetch = vi.fn();

describe('Comment Domain', () => {
  const mockComment: Comment = {
    id: 1,
    body: 'Test comment',
    postId: 1,
    userId: 1,
    updatedAt: '2023-01-01T00:00:00Z',
    user: {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      avatar: 'avatar.jpg',
      roles: ['USER'],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockClear();
  });

  it('should export correct constants and validate with schema', () => {
    // Test des constants
    expect(constants.POST_METHOD).toBe('POST');
    expect(constants.DELETE_METHOD).toBe('DELETE');
    expect(constants.PATCH_METHOD).toBe('PATCH');
    expect(constants.GET_METHOD).toBe('GET');

    // Test du schema - cas valide
    const validData = { body: 'Valid comment' };
    const result = createCommentSchema.parse(validData);
    expect(result).toEqual(validData);

    // Test du schema - cas invalide
    expect(() => createCommentSchema.parse({ body: '' })).toThrow();
    expect(() =>
      createCommentSchema.parse({ body: 'a'.repeat(1001) }),
    ).toThrow();
  });

  it('should handle complete Redux slice lifecycle', () => {
    const store = configureStore({
      reducer: { comment: commentSlice.reducer },
    });

    // État initial
    expect(store.getState().comment.comments).toEqual([]);

    // setComments
    const comments = [mockComment];
    store.dispatch(setComments(comments));
    expect(store.getState().comment.comments).toEqual(comments);

    // addComment
    const newComment = { ...mockComment, id: 2, body: 'Second comment' };
    store.dispatch(addComment(newComment));
    expect(store.getState().comment.comments).toHaveLength(2);

    // updateComment
    const updatedComment = { ...mockComment, body: 'Updated comment' };
    store.dispatch(updateComment(updatedComment));
    expect(store.getState().comment.comments[0].body).toBe('Updated comment');

    // deleteComment
    store.dispatch(deleteComment(1));
    expect(store.getState().comment.comments).toHaveLength(1);
    expect(store.getState().comment.comments[0].id).toBe(2);

    // Test cas non-existant
    store.dispatch(deleteComment(999));
    store.dispatch(updateComment({ ...mockComment, id: 999 }));
    expect(store.getState().comment.comments).toHaveLength(1);
  });

  it('should handle API operations with success and error cases', async () => {
    // Test createComment - succès
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: 1, body: 'Created comment' }),
    });

    const createResult = await createComment(1, { body: 'Test' }, 'token');
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/post/1/comment',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        }),
        body: JSON.stringify({ body: 'Test' }),
      }),
    );
    expect(createResult).toEqual({ id: 1, body: 'Created comment' });

    // Test updateComment - succès
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: 1, body: 'Updated comment' }),
    });

    const updateResult = await updateCommentApi(
      1,
      { body: 'Updated' },
      'token',
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/comment/1',
      expect.objectContaining({
        method: 'PATCH',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        }),
      }),
    );
    expect(updateResult).toEqual({ id: 1, body: 'Updated comment' });

    // Test deleteComment - succès
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    const deleteResult = await deleteCommentApi(1, 'token');
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/comment/1',
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          Authorization: 'Bearer token',
        }),
      }),
    );
    expect(deleteResult).toEqual({ success: true });

    // Test cas d'erreur
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    await expect(createComment(1, { body: 'Test' }, 'token')).rejects.toThrow(
      'Erreur 400: Impossible de créer le commentaire',
    );

    // Test erreur réseau
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    await expect(createComment(1, { body: 'Test' }, 'token')).rejects.toThrow(
      'Network error',
    );
  });

  it('should validate types and handle edge cases', () => {
    // Test des types
    const comment: Comment = mockComment;
    const createDto: CreateCommentDto = { body: 'Test' };
    const updateDto: UpdateCommentDto = { body: 'Updated' };
    const initialState: InitialStateComment = { comments: [] };

    expect(comment.id).toBe(1);
    expect(createDto.body).toBe('Test');
    expect(updateDto.body).toBe('Updated');
    expect(initialState.comments).toEqual([]);

    // Test caractères spéciaux et Unicode
    const specialText = '🚀 Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?~`"\'\\';
    const unicodeData = { body: specialText };
    const schemaResult = createCommentSchema.parse(unicodeData);
    expect(schemaResult.body).toBe(specialText);

    // Test limites du schema
    const maxLengthData = { body: 'a'.repeat(1000) };
    expect(() => createCommentSchema.parse(maxLengthData)).not.toThrow();

    const minLengthData = { body: 'a' };
    expect(() => createCommentSchema.parse(minLengthData)).not.toThrow();

    // Test valeurs invalides pour schema
    const invalidInputs = [{ body: null }, { body: undefined }, { body: 123 }];
    invalidInputs.forEach((input) => {
      expect(() => createCommentSchema.parse(input)).toThrow();
    });
  });
});
