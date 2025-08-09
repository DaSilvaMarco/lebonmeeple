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

describe('Post Detail Page App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getPostById).mockResolvedValue(mockPost);
  });

  it('should render PostViewPage with fetched post data', async () => {
    const MockedPostViewPage = vi.mocked(PostViewPage);
    const MockedGetPostById = vi.mocked(getPostById);
    const params = { id: '123' };

    const result = await PostDetailPageApp({ params });

    render(<TestWrapper>{result}</TestWrapper>);

    // Vérifie que getPostById est appelé avec le bon ID
    expect(MockedGetPostById).toHaveBeenCalledWith('123');
    expect(MockedGetPostById).toHaveBeenCalledTimes(1);

    // Vérifie que PostViewPage est appelé avec le post récupéré
    expect(MockedPostViewPage).toHaveBeenCalledWith({ post: mockPost }, {});

    // Vérifie que le composant est rendu dans le DOM
    expect(screen.getByTestId('post-view-page')).toBeInTheDocument();
    expect(screen.getByTestId('post-view-page')).toHaveAttribute(
      'data-post-id',
      '123',
    );
  });

  it('should handle different post IDs correctly', async () => {
    const MockedGetPostById = vi.mocked(getPostById);
    const testIds = ['1', 'abc-123', ''];

    for (const id of testIds) {
      const params = { id };
      await PostDetailPageApp({ params });
      expect(MockedGetPostById).toHaveBeenCalledWith(id);
    }

    expect(MockedGetPostById).toHaveBeenCalledTimes(testIds.length);
  });

  it('should return valid JSX element', async () => {
    const params = { id: 'test-id' };
    const result = await PostDetailPageApp({ params });

    expect(React.isValidElement(result)).toBe(true);
    expect(typeof PostDetailPageApp).toBe('function');
  });

  it('should handle API errors gracefully', async () => {
    const MockedGetPostById = vi.mocked(getPostById);
    MockedGetPostById.mockRejectedValueOnce(new Error('Post not found'));

    const params = { id: 'nonexistent' };

    await expect(PostDetailPageApp({ params })).rejects.toThrow(
      'Post not found',
    );
  });
});
