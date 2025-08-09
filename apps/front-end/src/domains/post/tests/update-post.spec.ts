import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type UpdatePostData, updatePost } from '../api/update-post';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the api-config utility
vi.mock('@/utils/api-config', () => ({
  getApiBaseUrl: () => 'http://localhost:3001/api',
}));

describe('updatePost API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockToken = 'test-token-123';
  const mockPostId = 1;

  it('should handle all successful update scenarios with proper request configuration', async () => {
    // Test update with all fields
    const fullUpdateData: UpdatePostData = {
      title: 'Updated Title',
      body: 'Updated body content',
      image: '/updated-image.jpg',
    };

    const fullUpdatedPost = {
      id: mockPostId,
      ...fullUpdateData,
      user: { id: 1, username: 'user' },
      userId: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(fullUpdatedPost),
    });

    const fullResult = await updatePost(mockPostId, fullUpdateData, mockToken);

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/api/post/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockToken}`,
      },
      body: JSON.stringify(fullUpdateData),
    });
    expect(fullResult).toEqual(fullUpdatedPost);

    // Test partial updates - title only
    vi.clearAllMocks();
    const titleOnlyData: UpdatePostData = { title: 'New Title Only' };
    const titleOnlyPost = {
      id: mockPostId,
      title: 'New Title Only',
      body: 'Original body',
      image: '/original-image.jpg',
      user: { id: 1, username: 'user' },
      userId: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(titleOnlyPost),
    });

    const titleResult = await updatePost(mockPostId, titleOnlyData, mockToken);
    expect(titleResult).toEqual(titleOnlyPost);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ body: JSON.stringify(titleOnlyData) }),
    );

    // Test body only update
    vi.clearAllMocks();
    const bodyOnlyData: UpdatePostData = { body: 'New body content only' };
    const bodyOnlyPost = {
      id: mockPostId,
      title: 'Original Title',
      body: 'New body content only',
      image: '/original-image.jpg',
      user: { id: 1, username: 'user' },
      userId: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(bodyOnlyPost),
    });

    const bodyResult = await updatePost(mockPostId, bodyOnlyData, mockToken);
    expect(bodyResult.body).toBe('New body content only');
    expect(bodyResult.title).toBe('Original Title');

    // Test image only update
    vi.clearAllMocks();
    const imageOnlyData: UpdatePostData = { image: '/new-image-only.jpg' };
    const imageOnlyPost = {
      id: mockPostId,
      title: 'Original Title',
      body: 'Original body',
      image: '/new-image-only.jpg',
      user: { id: 1, username: 'user' },
      userId: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(imageOnlyPost),
    });

    const imageResult = await updatePost(mockPostId, imageOnlyData, mockToken);
    expect(imageResult.image).toBe('/new-image-only.jpg');
    expect(imageResult.title).toBe('Original Title');
    expect(imageResult.body).toBe('Original body');

    // Test empty update data
    vi.clearAllMocks();
    const emptyData: UpdatePostData = {};
    const originalPost = {
      id: mockPostId,
      title: 'Original Title',
      body: 'Original body',
      image: '/original-image.jpg',
      user: { id: 1, username: 'user' },
      userId: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(originalPost),
    });

    const emptyResult = await updatePost(mockPostId, emptyData, mockToken);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ body: JSON.stringify({}) }),
    );
    expect(emptyResult).toEqual(originalPost);

    // Test base64 image update
    vi.clearAllMocks();
    const base64Data: UpdatePostData = {
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
    };
    const base64Post = {
      id: mockPostId,
      title: 'Title',
      body: 'Body',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
      user: { id: 1, username: 'user' },
      userId: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(base64Post),
    });

    const base64Result = await updatePost(mockPostId, base64Data, mockToken);
    expect(base64Result.image).toBe(
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
    );

    // Test long content and special characters
    vi.clearAllMocks();
    const specialData: UpdatePostData = {
      title: 'Title with émojis 🎮🎲 and special chars: àáâãäåæçèéêë',
      body: `Body with special content:
- Émojis: 🎯
- Accents: éàù
- Symbols: @#$%
${'B'.repeat(5000)}`,
    };
    const specialPost = {
      id: mockPostId,
      ...specialData,
      image: '/image.jpg',
      user: { id: 1, username: 'user' },
      userId: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(specialPost),
    });

    const specialResult = await updatePost(mockPostId, specialData, mockToken);
    expect(specialResult.title).toContain('🎮🎲');
    expect(specialResult.body).toContain('🎯');
    expect(specialResult.body.length).toBeGreaterThan(5000);

    // Test different postId formats and URL construction
    vi.clearAllMocks();
    const testData: UpdatePostData = { title: 'Test' };
    const testPostIds = [42, 999, 0];

    for (const postId of testPostIds) {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id: postId, title: 'Test' }),
      });

      await updatePost(postId, testData, mockToken);
      expect(mockFetch).toHaveBeenLastCalledWith(
        `http://localhost:3001/api/post/${postId}`,
        expect.objectContaining({ method: 'PATCH' }),
      );
    }

    // Test different token formats
    vi.clearAllMocks();
    const longToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    });

    await updatePost(mockPostId, testData, longToken);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${longToken}`,
        }),
      }),
    );

    // Test undefined values filtering
    vi.clearAllMocks();
    const undefinedData: UpdatePostData = {
      title: undefined,
      body: 'Valid body',
      image: undefined,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    });

    await updatePost(mockPostId, undefinedData, mockToken);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ body: 'Valid body' }),
      }),
    );
  });

  it('should handle all error scenarios comprehensively', async () => {
    const updateData: UpdatePostData = { title: 'New Title' };

    // Test 404 error
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: vi.fn().mockResolvedValue({ message: 'Post not found' }),
    });

    await expect(updatePost(999, updateData, mockToken)).rejects.toThrow(
      'Post not found',
    );

    // Test 401 unauthorized
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: vi.fn().mockResolvedValue({ message: 'Unauthorized' }),
    });

    await expect(
      updatePost(mockPostId, updateData, 'invalid-token'),
    ).rejects.toThrow('Unauthorized');

    // Test 403 forbidden
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: vi.fn().mockResolvedValue({ message: 'Forbidden' }),
    });

    await expect(updatePost(mockPostId, updateData, mockToken)).rejects.toThrow(
      'Forbidden',
    );

    // Test 400 bad request
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({ message: 'Title cannot be empty' }),
    });

    await expect(
      updatePost(mockPostId, { title: '' }, mockToken),
    ).rejects.toThrow('Title cannot be empty');

    // Test default error when no message provided
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(updatePost(mockPostId, updateData, mockToken)).rejects.toThrow(
      'Erreur lors de la mise à jour',
    );

    // Test network errors
    vi.clearAllMocks();
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(updatePost(mockPostId, updateData, mockToken)).rejects.toThrow(
      'Network error',
    );

    // Test JSON parsing errors in error response
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
    });

    await expect(updatePost(mockPostId, updateData, mockToken)).rejects.toThrow(
      'Invalid JSON',
    );

    // Test timeout errors
    vi.clearAllMocks();
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 100);
        }),
    );

    await expect(updatePost(mockPostId, updateData, mockToken)).rejects.toThrow(
      'Request timeout',
    );
  });

  it('should handle complex integration scenarios and data integrity', async () => {
    // Test multiple consecutive updates
    const updates = [
      { title: 'First Update' },
      { body: 'Second Update' },
      { image: '/third-update.jpg' },
    ];

    const responses = updates.map((update, index) => ({
      id: mockPostId,
      ...update,
      updatedAt: `2023-01-0${index + 1}T00:00:00Z`,
    }));

    responses.forEach((response) => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(response),
      });
    });

    const results = await Promise.all(
      updates.map((update) => updatePost(mockPostId, update, mockToken)),
    );

    expect(results).toHaveLength(3);
    expect(results[0].title).toBe('First Update');
    expect(results[1].body).toBe('Second Update');
    expect(results[2].image).toBe('/third-update.jpg');
    expect(mockFetch).toHaveBeenCalledTimes(3);

    // Test mixed success and error scenarios
    vi.clearAllMocks();
    const testData: UpdatePostData = { title: 'Test' };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id: 1, title: 'Test' }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: vi.fn().mockResolvedValue({ message: 'Not found' }),
      });

    const successResult = await updatePost(1, testData, mockToken);
    expect(successResult.title).toBe('Test');

    await expect(updatePost(999, testData, mockToken)).rejects.toThrow(
      'Not found',
    );

    // Test data integrity across updates
    vi.clearAllMocks();
    const originalPost = {
      id: mockPostId,
      title: 'Original',
      body: 'Original body',
      image: '/original.jpg',
      user: { id: 1, username: 'user' },
      userId: 1,
    };

    const updateDataIntegrity: UpdatePostData = { title: 'Updated Title' };
    const expectedResponse = { ...originalPost, title: 'Updated Title' };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(expectedResponse),
    });

    const integrityResult = await updatePost(
      mockPostId,
      updateDataIntegrity,
      mockToken,
    );

    expect(integrityResult.title).toBe('Updated Title');
    expect(integrityResult.body).toBe('Original body');
    expect(integrityResult.image).toBe('/original.jpg');
    expect(integrityResult.user).toEqual(originalPost.user);

    // Test empty string handling
    vi.clearAllMocks();
    const emptyStringData: UpdatePostData = {
      title: '',
      body: '',
      image: '',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    });

    await updatePost(mockPostId, emptyStringData, mockToken);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify(emptyStringData),
      }),
    );
  });
});
