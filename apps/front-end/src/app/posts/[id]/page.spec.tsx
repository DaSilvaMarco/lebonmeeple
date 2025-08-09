import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import PostDetailPageApp from './page';
import { lebonmeepleApi } from '@frontend/store/lebonmeepleApi';
import theme from '@frontend/ui/theme';

// Mock du domaine post
vi.mock('@frontend/domains/post/pages/PostViewPage', () => ({
  default: vi.fn(({ post }) => (
    <div data-testid="post-view-page" data-post-id={post?.id}>
      Mocked PostViewPage for post {post?.id}
    </div>
  )),
}));

// Mock de l'API
vi.mock('@frontend/domains/post/api/getPostById', () => ({
  getPostById: vi.fn(),
}));

// Import des composants mockés pour les types
import PostViewPage from '@frontend/domains/post/pages/PostViewPage';
import { getPostById } from '@frontend/domains/post/api/getPostById';

// Mock data
const mockPost = {
  id: '123',
  title: 'Test Post',
  content: 'Test content',
  author: 'Test Author',
};

// Configuration du store de test
const createTestStore = () => {
  return configureStore({
    reducer: {
      [lebonmeepleApi.reducerPath]: lebonmeepleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(lebonmeepleApi.middleware),
  });
};

// Composant wrapper pour les tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createTestStore();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
};

describe('Post Detail Page App - Complete Coverage', () => {
  beforeEach(() => {
    // Reset tous les mocks avant chaque test
    vi.clearAllMocks();

    // Remettre le mock par défaut pour PostViewPage
    const MockedPostViewPage = vi.mocked(PostViewPage);
    MockedPostViewPage.mockImplementation(({ post }) => (
      <div data-testid="post-view-page" data-post-id={post?.id}>
        Mocked PostViewPage for post {post?.id}
      </div>
    ));

    // Remettre le mock par défaut pour getPostById
    const MockedGetPostById = vi.mocked(getPostById);
    MockedGetPostById.mockResolvedValue(mockPost);
  });

  describe('Basic Functionality', () => {
    it('should render the page successfully with valid params', async () => {
      const params = { id: '123' };

      const result = await PostDetailPageApp({ params });

      render(<TestWrapper>{result}</TestWrapper>);

      expect(screen.getByTestId('post-view-page')).toBeInTheDocument();
      expect(screen.getByTestId('post-view-page')).toHaveAttribute(
        'data-post-id',
        '123',
      );
    });

    it('should call getPostById with correct id', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const params = { id: '456' };

      await PostDetailPageApp({ params });

      expect(MockedGetPostById).toHaveBeenCalledWith('456');
      expect(MockedGetPostById).toHaveBeenCalledTimes(1);
    });

    it('should pass the fetched post to PostViewPage', async () => {
      const MockedPostViewPage = vi.mocked(PostViewPage);
      const params = { id: '789' };

      const result = await PostDetailPageApp({ params });

      render(<TestWrapper>{result}</TestWrapper>);

      expect(MockedPostViewPage).toHaveBeenCalledWith({ post: mockPost }, {});
    });
  });

  describe('Component Structure', () => {
    it('should return JSX element', async () => {
      const params = { id: '123' };
      const result = await PostDetailPageApp({ params });

      expect(result).toBeTruthy();
      expect(React.isValidElement(result)).toBe(true);
    });

    it('should be an async function component', () => {
      expect(typeof PostDetailPageApp).toBe('function');
      expect(PostDetailPageApp.constructor.name).toBe('AsyncFunction');
    });

    it('should accept params with id', async () => {
      const params = { id: 'test-id' };

      // La fonction ne devrait pas lever d'erreur avec des params valides
      await expect(PostDetailPageApp({ params })).resolves.toBeDefined();
    });
  });

  describe('API Integration', () => {
    it('should integrate correctly with getPostById API', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const params = { id: 'api-test' };

      await PostDetailPageApp({ params });

      expect(MockedGetPostById).toHaveBeenCalledWith('api-test');
    });

    it('should handle different post IDs', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const testIds = ['1', '999', 'abc-123'];

      for (const id of testIds) {
        const params = { id };
        await PostDetailPageApp({ params });
        expect(MockedGetPostById).toHaveBeenCalledWith(id);
      }

      expect(MockedGetPostById).toHaveBeenCalledTimes(testIds.length);
    });

    it('should handle API response correctly', async () => {
      const customPost = { id: 'custom', title: 'Custom Post' };
      const MockedGetPostById = vi.mocked(getPostById);
      MockedGetPostById.mockResolvedValueOnce(customPost);

      const params = { id: 'custom' };
      const result = await PostDetailPageApp({ params });

      render(<TestWrapper>{result}</TestWrapper>);

      expect(
        screen.getByText('Mocked PostViewPage for post custom'),
      ).toBeInTheDocument();
    });
  });

  describe('Domain Integration', () => {
    it('should integrate correctly with post domain', async () => {
      const params = { id: 'domain-test' };

      const result = await PostDetailPageApp({ params });
      render(<TestWrapper>{result}</TestWrapper>);

      expect(screen.getByTestId('post-view-page')).toBeInTheDocument();
    });

    it('should maintain clean architecture', async () => {
      const MockedPostViewPage = vi.mocked(PostViewPage);
      const params = { id: 'architecture-test' };

      const result = await PostDetailPageApp({ params });
      render(<TestWrapper>{result}</TestWrapper>);

      // Vérifier que PostViewPage est appelé avec le bon post
      expect(MockedPostViewPage).toHaveBeenCalledWith({ post: mockPost }, {});
    });
  });

  describe('Error Handling', () => {
    it('should handle getPostById errors gracefully', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      MockedGetPostById.mockRejectedValueOnce(new Error('Post not found'));

      const params = { id: 'nonexistent' };

      // La fonction devrait rejeter avec l'erreur
      await expect(PostDetailPageApp({ params })).rejects.toThrow(
        'Post not found',
      );
    });

    it('should handle invalid params', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const params = { id: '' };

      await PostDetailPageApp({ params });

      expect(MockedGetPostById).toHaveBeenCalledWith('');
    });

    it('should handle network errors', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      MockedGetPostById.mockRejectedValueOnce(new Error('Network error'));

      const params = { id: 'network-test' };

      await expect(PostDetailPageApp({ params })).rejects.toThrow(
        'Network error',
      );
    });
  });

  describe('DDD Architecture Compliance', () => {
    it('should act as application layer component', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const MockedPostViewPage = vi.mocked(PostViewPage);
      const params = { id: 'ddd-test' };

      const result = await PostDetailPageApp({ params });
      render(<TestWrapper>{result}</TestWrapper>);

      // Le composant application orchestre les appels
      expect(MockedGetPostById).toHaveBeenCalled();
      expect(MockedPostViewPage).toHaveBeenCalled();
    });

    it('should delegate business logic to domain layer', async () => {
      const params = { id: 'delegation-test' };
      const componentCode = PostDetailPageApp.toString();

      // Le composant ne devrait pas contenir de logique métier complexe
      expect(componentCode).not.toMatch(/if.*post.*status/i);
      expect(componentCode).not.toMatch(/switch.*post.*type/i);
      expect(componentCode).not.toMatch(/business.*logic/i);

      await PostDetailPageApp({ params });
    });
  });

  describe('Async Behavior', () => {
    it('should handle async params correctly', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const params = { id: 'async-test' };

      const result = await PostDetailPageApp({ params });

      expect(MockedGetPostById).toHaveBeenCalledWith('async-test');
      expect(React.isValidElement(result)).toBe(true);
    });

    it('should wait for API call completion', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const delayedPost = { ...mockPost, id: 'delayed' };

      // Créer une promise qui se résout après un délai
      MockedGetPostById.mockImplementationOnce(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return delayedPost;
      });

      const params = { id: 'waiting-test' };
      const result = await PostDetailPageApp({ params });

      expect(MockedGetPostById).toHaveBeenCalledWith('waiting-test');
      expect(React.isValidElement(result)).toBe(true);
    });

    it('should handle concurrent requests', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const params1 = { id: 'concurrent-1' };
      const params2 = { id: 'concurrent-2' };

      const [result1, result2] = await Promise.all([
        PostDetailPageApp({ params: params1 }),
        PostDetailPageApp({ params: params2 }),
      ]);

      expect(MockedGetPostById).toHaveBeenCalledTimes(2);
      expect(MockedGetPostById).toHaveBeenCalledWith('concurrent-1');
      expect(MockedGetPostById).toHaveBeenCalledWith('concurrent-2');
      expect(React.isValidElement(result1)).toBe(true);
      expect(React.isValidElement(result2)).toBe(true);
    });
  });

  describe('Component Props and Types', () => {
    it('should accept correct PageProps interface', async () => {
      const params = { id: 'props-test' };

      // Test avec l'interface exacte
      const pageProps = { params };
      const result = await PostDetailPageApp(pageProps);

      expect(React.isValidElement(result)).toBe(true);
    });

    it('should handle string id params', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const params = { id: 'string-123' };

      await PostDetailPageApp({ params });

      expect(MockedGetPostById).toHaveBeenCalledWith('string-123');
    });

    it('should work with numeric string ids', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const params = { id: '12345' };

      await PostDetailPageApp({ params });

      expect(MockedGetPostById).toHaveBeenCalledWith('12345');
    });
  });

  describe('Component Naming and Export', () => {
    it('should export the component as default', () => {
      expect(PostDetailPageApp).toBeDefined();
      expect(typeof PostDetailPageApp).toBe('function');
    });

    it('should have correct component name', () => {
      expect(PostDetailPageApp.name).toBe('App');
    });
  });

  describe('Next.js Server Component Integration', () => {
    it('should work as Next.js Server Component', async () => {
      const params = { id: 'server-component-test' };

      // Server Components retournent directement du JSX
      const result = await PostDetailPageApp({ params });

      expect(React.isValidElement(result)).toBe(true);
    });

    it('should handle dynamic route params', async () => {
      const MockedGetPostById = vi.mocked(getPostById);
      const dynamicId = 'dynamic-route-123';
      const params = { id: dynamicId };

      await PostDetailPageApp({ params });

      expect(MockedGetPostById).toHaveBeenCalledWith(dynamicId);
    });

    it('should be compatible with Next.js async params', async () => {
      const MockedGetPostById = vi.mocked(getPostById);

      // Simuler une utilisation standard de Next.js
      const params = { id: 'nextjs-async' };

      await PostDetailPageApp({ params });

      expect(MockedGetPostById).toHaveBeenCalledWith('nextjs-async');
    });
  });
});
