import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getPostById } from '../api/getPostById';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the api-config utility
vi.mock('@/utils/api-config', () => ({
  getApiBaseUrl: () => 'http://localhost:3001/api',
}));

describe('getPostById API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle successful requests with various post formats and ID types', async () => {
    // Test different ID formats and post structures
    const testCases = [
      {
        id: '1',
        mockPost: {
          id: 1,
          title: 'Test Post',
          body: 'Test content',
          image: '/image.jpg',
          user: {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            avatar: '/avatar.jpg',
          },
          userId: 1,
          comments: [],
        },
        description: 'basic post with all properties',
      },
      {
        id: '123',
        mockPost: { id: 123, title: 'String ID Post' },
        description: 'string ID parameter',
      },
      {
        id: '999',
        mockPost: {
          id: 999,
          title: 'Full Post Title',
          body: 'Detailed body content with multiple paragraphs',
          image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
          user: {
            id: 1,
            username: 'fulluser',
            email: 'full@example.com',
            avatar: '/full-avatar.jpg',
          },
          userId: 1,
          comments: [
            {
              id: 1,
              body: 'Great post!',
              userId: 2,
              postId: 999,
              updatedAt: '2023-01-01T00:00:00Z',
              user: {
                id: 2,
                username: 'commenter',
                email: 'commenter@example.com',
                avatar: '/commenter.jpg',
              },
            },
            {
              id: 2,
              body: 'Thanks for sharing',
              userId: 3,
              postId: 999,
              updatedAt: '2023-01-02T00:00:00Z',
              user: {
                id: 3,
                username: 'another',
                email: 'another@example.com',
                avatar: '/another.jpg',
              },
            },
          ],
        },
        description: 'full post with comments',
      },
      {
        id: '42',
        mockPost: {
          id: 42,
          title: 'Post without comments',
          body: 'Content',
          image: '/image.jpg',
          user: { id: 1, username: 'user' },
          userId: 1,
        },
        description: 'post without comments property',
      },
    ];

    for (const testCase of testCases) {
      vi.clearAllMocks();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(testCase.mockPost),
      });

      const result = await getPostById(testCase.id);

      // Verify correct API call
      expect(mockFetch).toHaveBeenCalledWith(
        `http://localhost:3001/api/post/${testCase.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Verify response handling
      expect(result).toEqual(testCase.mockPost);

      // Verify data types preservation
      if (testCase.mockPost.id) {
        expect(typeof result.id).toBe('number');
      }
      if (testCase.mockPost.comments) {
        expect(Array.isArray(result.comments)).toBe(true);
        expect(result.comments).toHaveLength(testCase.mockPost.comments.length);
      }
    }

    // Test special ID formats
    const specialIds = [
      '',
      'test-id-123',
      '550e8400-e29b-41d4-a716-446655440000',
      'a'.repeat(100),
    ];

    for (const specialId of specialIds) {
      vi.clearAllMocks();
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id: 1, title: 'Test' }),
      });

      await getPostById(specialId);

      expect(mockFetch).toHaveBeenCalledWith(
        `http://localhost:3001/api/post/${specialId}`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }),
      );

      // Verify no authorization header or body
      // eslint-disable-next-line prefer-destructuring
      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers).not.toHaveProperty('Authorization');
      expect(options).not.toHaveProperty('body');
    }
  });

  it('should handle all error scenarios and edge cases comprehensively', async () => {
    // Test all HTTP error status codes
    const errorCases = [
      { status: 400, id: 'invalid' },
      { status: 401, id: '1' },
      { status: 403, id: '1' },
      { status: 404, id: '999' },
      { status: 500, id: '1' },
      { status: 502, id: '1' },
      { status: 503, id: '1' },
    ];

    for (const errorCase of errorCases) {
      vi.clearAllMocks();

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: errorCase.status,
      });

      await expect(getPostById(errorCase.id)).rejects.toThrow(
        `Erreur ${errorCase.status}: Post non trouvé`,
      );
    }

    // Test network and parsing errors
    vi.clearAllMocks();
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(getPostById('1')).rejects.toThrow('Network error');

    // Test JSON parsing error
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
    });
    await expect(getPostById('1')).rejects.toThrow('Invalid JSON');

    // Test timeout error
    vi.clearAllMocks();
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 100);
        }),
    );
    await expect(getPostById('1')).rejects.toThrow('Request timeout');
  });

  it('should handle complex integration scenarios and data type preservation', async () => {
    // Test multiple consecutive calls
    const posts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];

    posts.forEach((post) => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(post),
      });
    });

    const [result1, result2] = await Promise.all([
      getPostById('1'),
      getPostById('2'),
    ]);

    expect(result1).toEqual(posts[0]);
    expect(result2).toEqual(posts[1]);
    expect(mockFetch).toHaveBeenCalledTimes(2);

    // Test mixed success and error scenarios
    vi.clearAllMocks();
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ id: 1, title: 'Success' }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

    const successResult = await getPostById('1');
    expect(successResult).toEqual({ id: 1, title: 'Success' });

    await expect(getPostById('999')).rejects.toThrow(
      'Erreur 404: Post non trouvé',
    );

    // Test data type preservation and rapid consecutive calls
    vi.clearAllMocks();
    const typedPost = {
      id: 123,
      title: 'String Title',
      body: 'String Body',
      image: '/string/image.jpg',
      userId: 456,
      user: {
        id: 456,
        username: 'stringuser',
        email: 'string@example.com',
      },
      comments: [
        {
          id: 1,
          body: 'Comment',
          userId: 2,
          postId: 123,
          updatedAt: '2023-01-01T00:00:00Z',
          user: { id: 2, username: 'commenter' },
        },
      ],
    };

    const rapidPosts = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `Post ${i + 1}`,
    }));

    rapidPosts.forEach((post) => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(post),
      });
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(typedPost),
    });

    // Test rapid calls
    const rapidPromises = rapidPosts.map((_, i) => getPostById(String(i + 1)));
    const rapidResults = await Promise.all(rapidPromises);

    rapidResults.forEach((result, i) => {
      expect(result).toEqual(rapidPosts[i]);
    });

    // Test type preservation
    const typedResult = await getPostById('123');
    expect(typeof typedResult.id).toBe('number');
    expect(typeof typedResult.userId).toBe('number');
    expect(typeof typedResult.user.id).toBe('number');
    expect(typeof typedResult.title).toBe('string');
    expect(typeof typedResult.body).toBe('string');
    expect(typeof typedResult.user.username).toBe('string');
    expect(Array.isArray(typedResult.comments)).toBe(true);
    expect(typedResult.comments).toHaveLength(1);
    expect(typeof typedResult.comments[0].id).toBe('number');
  });
});
