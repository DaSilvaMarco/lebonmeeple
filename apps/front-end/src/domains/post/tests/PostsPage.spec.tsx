import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import PostsPage from '../pages/PostsPage';
import theme from '@frontend/ui/theme';
import { postSlice } from '@frontend/domains/post/slice';
import { userSlice } from '@frontend/domains/user/slice';
import type { Post } from '@frontend/domains/post/type';
import type { User } from '@frontend/domains/user/type';

// Mock the child components
vi.mock('../components/PostsGrid', () => ({
  default: ({ posts }: { posts: Post[] }) => (
    <div data-testid="posts-grid" data-posts-count={posts.length}>
      Posts Grid with {posts.length} posts
      {posts.map((post) => (
        <div key={post.id} data-testid={`post-${post.id}`}>
          {post.title}
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../components/PostsHeader', () => ({
  default: () => <div data-testid="posts-header">Posts Header Component</div>,
}));

// Mock data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  avatar: '/defaultAvatar.jpg',
  roles: ['USER'],
};

const mockPost1: Post = {
  id: 1,
  title: 'First Test Post',
  body: 'This is the first test post content',
  image: '/test-image1.jpg',
  user: mockUser,
  userId: 1,
};

const mockPost2: Post = {
  id: 2,
  title: 'Second Test Post',
  body: 'This is the second test post content',
  image: '/test-image2.jpg',
  user: mockUser,
  userId: 1,
};

const mockPost3: Post = {
  id: 3,
  title: 'Third Test Post',
  body: 'This is the third test post content',
  image: '/test-image3.jpg',
  user: mockUser,
  userId: 1,
};

// Helper function to create a mock store
const createMockStore = (posts: Post[] = []) => {
  return configureStore({
    reducer: {
      post: postSlice.reducer,
      user: userSlice.reducer,
    },
    preloadedState: {
      post: { posts },
      user: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      },
    },
  });
};

// Helper function to render component with providers
const renderWithProviders = (posts: Post[] = []) => {
  const store = createMockStore(posts);
  return render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PostsPage />
      </ChakraProvider>
    </Provider>,
  );
};

describe('PostsPage', () => {
  it('should render basic layout with empty posts', () => {
    // Test basic rendering, layout structure, and empty posts handling
    const { container } = renderWithProviders([]);

    // Verify basic rendering and layout structure
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByTestId('posts-header')).toBeInTheDocument();
    expect(screen.getByTestId('posts-grid')).toBeInTheDocument();

    // Verify component order and structure
    const header = screen.getByTestId('posts-header');
    const grid = screen.getByTestId('posts-grid');
    expect(header.compareDocumentPosition(grid)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );

    // Verify empty posts handling
    expect(grid).toHaveAttribute('data-posts-count', '0');
    expect(grid).toHaveTextContent('Posts Grid with 0 posts');

    // Verify accessibility and semantic structure
    expect(container.firstChild).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(grid).toBeInTheDocument();

    // Test component boundaries
    expect(header).not.toBe(grid);
    expect(header.contains(grid)).toBe(false);
    expect(grid.contains(header)).toBe(false);
  });

  it('should handle posts data and Redux integration correctly', () => {
    // Test posts data handling with various scenarios
    const posts = [mockPost1, mockPost2, mockPost3];
    const { unmount: unmount1 } = renderWithProviders(posts);

    // Verify multiple posts display
    const grid = screen.getByTestId('posts-grid');
    expect(grid).toHaveAttribute('data-posts-count', '3');
    expect(grid).toHaveTextContent('Posts Grid with 3 posts');

    // Verify individual posts rendering
    expect(screen.getByTestId('post-1')).toHaveTextContent('First Test Post');
    expect(screen.getByTestId('post-2')).toHaveTextContent('Second Test Post');
    expect(screen.getByTestId('post-3')).toHaveTextContent('Third Test Post');

    // Clean up before next render
    unmount1();

    // Test Redux integration with store updates
    const { rerender, unmount: unmount2 } = renderWithProviders([mockPost1]);
    expect(screen.getByTestId('posts-grid')).toHaveAttribute(
      'data-posts-count',
      '1',
    );

    // Simulate store update
    rerender(
      <Provider store={createMockStore([mockPost1, mockPost2])}>
        <ChakraProvider theme={theme}>
          <PostsPage />
        </ChakraProvider>
      </Provider>,
    );
    expect(screen.getByTestId('posts-grid')).toHaveAttribute(
      'data-posts-count',
      '2',
    );

    // Clean up before next render
    unmount2();

    // Test with real Redux store
    const store = configureStore({
      reducer: {
        post: postSlice.reducer,
        user: userSlice.reducer,
      },
    });
    const { unmount: unmount3 } = render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <PostsPage />
        </ChakraProvider>
      </Provider>,
    );
    expect(screen.getByTestId('posts-grid')).toHaveAttribute(
      'data-posts-count',
      '0',
    );

    // Clean up before next render
    unmount3();

    // Test large datasets and performance
    const largePosts = Array.from({ length: 50 }, (_, index) => ({
      ...mockPost1,
      id: index + 1,
      title: `Post ${index + 1}`,
    }));
    const startTime = performance.now();
    const { unmount: unmount4 } = renderWithProviders(largePosts);
    const endTime = performance.now();
    expect(screen.getByTestId('posts-grid')).toHaveAttribute(
      'data-posts-count',
      '50',
    );
    expect(endTime - startTime).toBeLessThan(1000);

    // Final cleanup
    unmount4();
  });

  it('should handle edge cases, error scenarios and integration requirements', () => {
    // Test 1: Edge cases with missing properties
    // First test scenario
    const postsWithMissingData = [
      { ...mockPost1, image: '' },
      { ...mockPost2, body: 'Very long content '.repeat(100) },
      { ...mockPost3, title: 'Short' },
    ];

    expect(() => {
      const { unmount: unmount1 } = renderWithProviders(postsWithMissingData);

      const grid = screen.getByTestId('posts-grid');
      expect(grid).toHaveAttribute('data-posts-count', '3');
      postsWithMissingData.forEach((post) => {
        expect(screen.getByTestId(`post-${post.id}`)).toBeInTheDocument();
      });

      // Clean up first test
      unmount1();
    }).not.toThrow();

    // Test 2: Error handling with missing Redux store
    expect(() => {
      render(
        <ChakraProvider theme={theme}>
          <PostsPage />
        </ChakraProvider>,
      );
    }).toThrow();

    // Test 3: Theme handling without ChakraProvider
    const store = createMockStore([mockPost1]);
    const { unmount: unmount2 } = render(
      <Provider store={store}>
        <PostsPage />
      </Provider>,
    );
    expect(screen.getByTestId('posts-header')).toBeInTheDocument();
    expect(screen.getByTestId('posts-grid')).toBeInTheDocument();

    // Clean up
    unmount2();

    // Test 4: Unmounting and memory management
    const { unmount: unmount3 } = renderWithProviders([mockPost1, mockPost2]);
    expect(screen.getByTestId('posts-header')).toBeInTheDocument();
    expect(screen.getByTestId('posts-grid')).toBeInTheDocument();
    unmount3();
    expect(screen.queryByTestId('posts-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('posts-grid')).not.toBeInTheDocument();

    // Test 5: Rapid re-renders and state changes
    const { rerender, unmount: unmount4 } = renderWithProviders([mockPost1]);
    const dataUpdates = [
      [mockPost1, mockPost2],
      [mockPost1, mockPost2, mockPost3],
      [mockPost2, mockPost3],
      [mockPost3],
      [],
    ];

    dataUpdates.forEach((posts) => {
      rerender(
        <Provider store={createMockStore(posts)}>
          <ChakraProvider theme={theme}>
            <PostsPage />
          </ChakraProvider>
        </Provider>,
      );
      expect(screen.getByTestId('posts-grid')).toHaveAttribute(
        'data-posts-count',
        posts.length.toString(),
      );
    });

    // Clean up
    unmount4();

    // Test 6: Component integration and data passing
    const integrationPosts = [mockPost1, mockPost2];
    const { unmount: unmount5 } = renderWithProviders(integrationPosts);
    expect(screen.getByTestId('posts-header')).toHaveTextContent(
      'Posts Header Component',
    );
    const finalGrid = screen.getByTestId('posts-grid');
    expect(finalGrid).toHaveAttribute('data-posts-count', '2');
    integrationPosts.forEach((post) => {
      expect(screen.getByTestId(`post-${post.id}`)).toBeInTheDocument();
    });

    // Final cleanup
    unmount5();
  });
});
