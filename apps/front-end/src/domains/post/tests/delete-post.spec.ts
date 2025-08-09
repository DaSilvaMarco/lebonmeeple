import { beforeEach, describe, expect, it, vi } from 'vitest';
import { deletePost } from '../api/delete-post';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the api-config utility
vi.mock('@/utils/api-config', () => ({
  getApiBaseUrl: () => 'http://localhost:3001/api',
}));

describe('deletePost API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockToken = 'test-token-123';
  const mockPostId = 1;

  it('should handle successful deletions with various scenarios', async () => {
    // Test cases: basic success, different IDs, various response formats
    const testCases = [
      {
        postId: 1,
        response: { message: 'Post deleted successfully', deletedId: 1 },
        description: 'basic deletion',
      },
      {
        postId: 0,
        response: { deletedId: 0 },
        description: 'zero ID',
      },
      {
        postId: Number.MAX_SAFE_INTEGER,
        response: { deletedId: Number.MAX_SAFE_INTEGER },
        description: 'large ID',
      },
      {
        postId: 42,
        response: {},
        description: 'empty response',
      },
      {
        postId: 999,
        response: {
          success: true,
          deletedPost: { id: 999, title: 'Test', deletedBy: 'user1' },
          timestamp: '2023-01-01T00:00:00Z',
        },
        description: 'complex response with metadata',
      },
    ];

    for (const testCase of testCases) {
      vi.clearAllMocks();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(testCase.response),
      });

      const result = await deletePost(testCase.postId, mockToken);

      // Verify correct API call
      expect(mockFetch).toHaveBeenCalledWith(
        `http://localhost:3001/api/post/${testCase.postId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${mockToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Verify response handling
      expect(result).toEqual(testCase.response);
    }

    // Test multiple token formats
    const tokenFormats = [
      'simple-token',
      'Bearer already-bearer-token',
      'a'.repeat(1000),
    ];
    for (const token of tokenFormats) {
      vi.clearAllMocks();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      });

      await deletePost(mockPostId, token);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
          }),
        }),
      );
    }
  });

  it('should handle all error scenarios and edge cases comprehensively', async () => {
    // Test all error status codes and edge cases
    const errorCases = [
      { status: 400, message: 'Invalid post ID', postId: -1, token: mockToken },
      {
        status: 401,
        message: 'Unauthorized',
        postId: mockPostId,
        token: 'invalid-token',
      },
      {
        status: 403,
        message: 'Forbidden: Not your post',
        postId: mockPostId,
        token: mockToken,
      },
      { status: 404, message: 'Post not found', postId: 999, token: mockToken },
      {
        status: 500,
        message: 'Internal server error',
        postId: mockPostId,
        token: mockToken,
      },
      { status: 500, message: '', postId: mockPostId, token: mockToken }, // Empty error message
    ];

    for (const errorCase of errorCases) {
      vi.clearAllMocks();

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: errorCase.status,
        text: vi.fn().mockResolvedValue(errorCase.message),
      });

      await expect(
        deletePost(errorCase.postId, errorCase.token),
      ).rejects.toThrow(`Erreur lors de la suppression: ${errorCase.message}`);
    }

    // Test network and parsing errors
    vi.clearAllMocks();
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(deletePost(mockPostId, mockToken)).rejects.toThrow(
      'Network error',
    );

    // Test timeout error
    vi.clearAllMocks();
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 100);
        }),
    );
    await expect(deletePost(mockPostId, mockToken)).rejects.toThrow(
      'Request timeout',
    );

    // Test text parsing error
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: vi.fn().mockRejectedValue(new Error('Failed to parse text')),
    });
    await expect(deletePost(mockPostId, mockToken)).rejects.toThrow(
      'Failed to parse text',
    );

    // Test JSON parsing error in success response
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON response')),
    });
    await expect(deletePost(mockPostId, mockToken)).rejects.toThrow(
      'Invalid JSON response',
    );

    // Test special characters in error text
    vi.clearAllMocks();
    const specialErrorText = 'Erreur avec caractères spéciaux: àáâãäåæçèéêë 🚫';
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: vi.fn().mockResolvedValue(specialErrorText),
    });
    await expect(deletePost(mockPostId, mockToken)).rejects.toThrow(
      `Erreur lors de la suppression: ${specialErrorText}`,
    );

    // Test empty token
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: vi.fn().mockResolvedValue('No token provided'),
    });
    await expect(deletePost(mockPostId, '')).rejects.toThrow(
      'Erreur lors de la suppression: No token provided',
    );
  });

  it('should handle complex integration scenarios and concurrent operations', async () => {
    // Test multiple consecutive deletions
    const postIds = [1, 2, 3, 4, 5];
    postIds.forEach((id) => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ deletedId: id }),
      });
    });

    const results = await Promise.all(
      postIds.map((id) => deletePost(id, mockToken)),
    );

    expect(results).toHaveLength(5);
    results.forEach((result, index) => {
      expect(result.deletedId).toBe(postIds[index]);
    });
    expect(mockFetch).toHaveBeenCalledTimes(5);

    // Test mixed success and error scenarios
    vi.clearAllMocks();
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ deletedId: 1 }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: vi.fn().mockResolvedValue('Not found'),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ deletedId: 3 }),
      });

    const result1 = await deletePost(1, mockToken);
    expect(result1.deletedId).toBe(1);

    await expect(deletePost(999, mockToken)).rejects.toThrow(
      'Erreur lors de la suppression: Not found',
    );

    const result3 = await deletePost(3, mockToken);
    expect(result3.deletedId).toBe(3);

    // Test request isolation with different tokens
    vi.clearAllMocks();
    const token1 = 'token1';
    const token2 = 'token2';

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ deletedBy: 'user1' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ deletedBy: 'user2' }),
      });

    const [isolatedResult1, isolatedResult2] = await Promise.all([
      deletePost(1, token1),
      deletePost(2, token2),
    ]);

    expect(isolatedResult1.deletedBy).toBe('user1');
    expect(isolatedResult2.deletedBy).toBe('user2');

    // Verify request configuration and method validation
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    });

    await deletePost(42, mockToken);

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/post/42',
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${mockToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Verify no body is included in DELETE request
    const [, options] = mockFetch.mock.calls[mockFetch.mock.calls.length - 1];
    expect(options).not.toHaveProperty('body');
  });
});
