import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import PostsClientPage from '../pages/PostsClientPage';
import theme from '@frontend/ui/theme';
import { postSlice } from '../slice';

// Mock getPosts API
vi.mock('@frontend/domains/post/api/getPosts', () => ({
  getPosts: vi.fn(),
}));

// Mock PostsPage component
vi.mock('@frontend/domains/post/pages/PostsPage', () => ({
  default: () => <div data-testid="posts-page">Posts Page Content</div>,
}));

// Mock PostsPageSkeleton component
vi.mock('@frontend/domains/post/pages/PostsPageSkeleton', () => ({
  default: () => <div data-testid="posts-page-skeleton">Loading...</div>,
}));

// Mock console.error to avoid noise in tests
const mockConsoleError = vi
  .spyOn(console, 'error')
  .mockImplementation(() => {});

// Helper function to create a mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      post: postSlice.reducer,
    },
    preloadedState: {
      post: {
        posts: [],
      },
    },
  });
};

// Helper function to render component with providers
const renderWithProviders = () => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PostsClientPage />
      </ChakraProvider>
    </Provider>,
  );
};

describe('PostsClientPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockConsoleError.mockClear();
  });

  it('should show loading skeleton initially and then show posts page on successful fetch', async () => {
    const { getPosts } = await import('@frontend/domains/post/api/getPosts');
    const mockPosts = [
      { id: 1, title: 'Test Post 1' },
      { id: 2, title: 'Test Post 2' },
    ];

    vi.mocked(getPosts).mockResolvedValueOnce(mockPosts);
    const store = createMockStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <PostsClientPage />
        </ChakraProvider>
      </Provider>,
    );

    // Should show skeleton initially
    expect(screen.getByTestId('posts-page-skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('posts-page')).not.toBeInTheDocument();

    // Wait for loading to complete and posts page to appear
    await waitFor(() => {
      expect(screen.getByTestId('posts-page')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('posts-page-skeleton')).not.toBeInTheDocument();
    expect(getPosts).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'post/postsList',
      payload: mockPosts,
    });
  });

  it('should show error message when posts fetch fails', async () => {
    const { getPosts } = await import('@frontend/domains/post/api/getPosts');

    vi.mocked(getPosts).mockRejectedValueOnce(new Error('Network error'));

    renderWithProviders();

    // Should show skeleton initially
    expect(screen.getByTestId('posts-page-skeleton')).toBeInTheDocument();

    // Wait for error to appear
    await waitFor(() => {
      expect(
        screen.getByText('Erreur lors du chargement des articles'),
      ).toBeInTheDocument();
    });

    expect(screen.queryByTestId('posts-page-skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('posts-page')).not.toBeInTheDocument();
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error fetching posts:',
      expect.any(Error),
    );
  });

  it('should maintain minimum loading time with Promise.all delay', async () => {
    const { getPosts } = await import('@frontend/domains/post/api/getPosts');
    const mockPosts = [{ id: 1, title: 'Test Post' }];

    // Mock a very fast API response
    vi.mocked(getPosts).mockResolvedValueOnce(mockPosts);

    const startTime = Date.now();
    renderWithProviders();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('posts-page')).toBeInTheDocument();
    });

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    // Should take at least 500ms due to the Promise.all delay
    expect(elapsedTime).toBeGreaterThanOrEqual(450); // Small margin for test execution
  });
});
