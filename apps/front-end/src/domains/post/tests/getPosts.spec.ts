import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getPosts } from '../api/getPosts';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the api-config utility
vi.mock('@/utils/api-config', () => ({
  getApiBaseUrl: () => 'http://localhost:3001/api',
}));

describe('getPosts API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CI_BUILD = undefined;
  });

  it('should handle successful requests with various response formats', async () => {
    // Test different response scenarios
    const testCases = [
      {
        response: [
          {
            id: 1,
            title: 'Test Post 1',
            body: 'Content 1',
            image: '/image1.jpg',
            user: { id: 1, username: 'user1' },
            userId: 1,
          },
          {
            id: 2,
            title: 'Test Post 2',
            body: 'Content 2',
            image: '/image2.jpg',
            user: { id: 2, username: 'user2' },
            userId: 2,
          },
        ],
        description: 'multiple posts',
      },
      {
        response: [],
        description: 'empty array',
      },
      {
        response: [
          {
            id: 1,
            title: 'Single Post',
            body: 'Single content',
            image: '/single.jpg',
            user: { id: 1, username: 'user1' },
            userId: 1,
          },
        ],
        description: 'single post',
      },
      {
        response: [
          {
            id: 1,
            title: 'Full Post',
            body: 'Full content with lots of text and details',
            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...',
            user: {
              id: 1,
              username: 'testuser',
              email: 'test@example.com',
              avatar: '/avatar.jpg',
            },
            userId: 1,
            comments: [
              {
                id: 1,
                body: 'Test comment',
                userId: 2,
                postId: 1,
                updatedAt: '2023-01-01T00:00:00Z',
                user: {
                  id: 2,
                  username: 'commenter',
                  email: 'commenter@example.com',
                  avatar: '/commenter.jpg',
                },
              },
            ],
          },
        ],
        description: 'full post with comments',
      },
      {
        response: [
          {
            id: 1,
            title: 'Minimal Post',
            body: 'Minimal content',
            image: '',
            user: { id: 1, username: 'testuser' },
            userId: 1,
          },
        ],
        description: 'minimal post without optional properties',
      },
    ];

    for (const testCase of testCases) {
      vi.clearAllMocks();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(testCase.response),
      });

      const result = await getPosts();

      // Verify correct API call
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/posts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Verify response handling
      expect(result).toEqual(testCase.response);
      expect(Array.isArray(result)).toBe(true);

      // Verify data types preservation if response has posts
      if (testCase.response.length > 0) {
        expect(typeof result[0].id).toBe('number');
        expect(typeof result[0].title).toBe('string');
        expect(typeof result[0].body).toBe('string');
        expect(typeof result[0].userId).toBe('number');
        expect(typeof result[0].user.id).toBe('number');

        // Check comments if present
        if (result[0].comments) {
          expect(Array.isArray(result[0].comments)).toBe(true);
        }
      }

      // Verify request configuration
      //eslint-disable-next-line prefer-destructuring
      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers).not.toHaveProperty('Authorization');
      expect(options).not.toHaveProperty('body');
    }

    // Test large response handling
    vi.clearAllMocks();
    const largePosts = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      title: `Post ${index + 1}`,
      body: `Content ${index + 1}`,
      image: `/image${index + 1}.jpg`,
      user: { id: 1, username: 'user1' },
      userId: 1,
    }));

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(largePosts),
    });

    const largeResult = await getPosts();
    expect(largeResult).toHaveLength(100);
    expect(largeResult[0].title).toBe('Post 1');
    expect(largeResult[99].title).toBe('Post 100');
  });

  it('should handle all error scenarios and CI build environment', async () => {
    // Test CI build environment
    process.env.CI_BUILD = 'true';
    const ciResult = await getPosts();
    expect(ciResult).toEqual([]);
    expect(mockFetch).not.toHaveBeenCalled();

    // Reset CI environment for other tests
    process.env.CI_BUILD = undefined;

    // Test all error scenarios with console error logging
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const errorCases = [
      {
        type: 'HTTP errors',
        mockSetup: () => {
          const statusCodes = [400, 401, 403, 404, 500, 502, 503];
          return statusCodes.map((status) => ({
            description: `status ${status}`,
            mock: () =>
              mockFetch.mockResolvedValueOnce({
                ok: false,
                status,
              }),
          }));
        },
      },
      {
        type: 'Network error',
        mockSetup: () => [
          {
            description: 'network failure',
            mock: () =>
              mockFetch.mockRejectedValueOnce(new Error('Network error')),
          },
        ],
      },
      {
        type: 'JSON parsing error',
        mockSetup: () => [
          {
            description: 'invalid JSON response',
            mock: () =>
              mockFetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
              }),
          },
        ],
      },
      {
        type: 'Timeout error',
        mockSetup: () => [
          {
            description: 'request timeout',
            mock: () =>
              mockFetch.mockImplementationOnce(
                () =>
                  new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Timeout')), 100);
                  }),
              ),
          },
        ],
      },
    ];

    for (const errorCategory of errorCases) {
      const testCases = errorCategory.mockSetup();

      for (const testCase of testCases) {
        vi.clearAllMocks();
        consoleSpy.mockClear();

        testCase.mock();

        const result = await getPosts();

        expect(result).toEqual([]);
        expect(consoleSpy).toHaveBeenCalledWith(
          'Error fetching posts:',
          expect.any(Error),
        );
      }
    }

    consoleSpy.mockRestore();
  });

  it('should handle integration scenarios and parameter validation', async () => {
    // Test multiple consecutive calls
    const posts1 = [{ id: 1, title: 'Post 1' }];
    const posts2 = [{ id: 2, title: 'Post 2' }];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(posts1),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(posts2),
      });

    const [result1, result2] = await Promise.all([getPosts(), getPosts()]);

    expect(result1).toEqual(posts1);
    expect(result2).toEqual(posts2);
    expect(mockFetch).toHaveBeenCalledTimes(2);

    // Test mixed success and error scenarios
    vi.clearAllMocks();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const posts = [{ id: 1, title: 'Post 1' }];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(posts),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

    const successResult = await getPosts();
    const errorResult = await getPosts();

    expect(successResult).toEqual(posts);
    expect(errorResult).toEqual([]);

    // Test callable without parameters
    vi.clearAllMocks();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    });

    expect(async () => await getPosts()).not.toThrow();
    const parameterlessResult = await getPosts();
    expect(parameterlessResult).toEqual([]);

    // Test CI_BUILD environment variations
    const ciTestCases = [
      { env: 'false', shouldCall: true },
      { env: undefined, shouldCall: true },
      { env: 'not-true', shouldCall: true },
    ];

    for (const ciTest of ciTestCases) {
      vi.clearAllMocks();
      process.env.CI_BUILD = ciTest.env;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue([]),
      });

      await getPosts();

      if (ciTest.shouldCall) {
        expect(mockFetch).toHaveBeenCalled();
      }
    }

    consoleSpy.mockRestore();
  });
});
