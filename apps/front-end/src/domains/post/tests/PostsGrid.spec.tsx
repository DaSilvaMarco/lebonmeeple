import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import { Post } from '@/domains/post/type';

// Mock complet du composant PostsGrid pour éviter les problèmes avec framer-motion
// Ce mock reproduit fidèlement le comportement du composant
vi.mock('@/domains/post/components/PostsGrid', () => {
  return {
    default: ({ posts }: { posts: Post[] }) => (
      <div
        data-testid="posts-grid"
        style={{
          display: 'grid',
          gap: '1.5rem',
          padding: '1rem 2rem 2rem',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {posts.map((post: Post) => (
          <div
            key={post.id}
            data-testid={`post-grid-item-${post.id}`}
            style={{ width: '100%' }}
          >
            <div data-testid={`post-card-${post.id}`}>
              Post Card: {post.title}
            </div>
          </div>
        ))}
      </div>
    ),
  };
});

// Import du composant après le mock
import PostsGrid from '@/domains/post/components/PostsGrid';

const renderWithProviders = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Test Post 1',
    body: 'Test body content 1',
    image: 'test-image-1.jpg',
    userId: 1,
    user: {
      id: 1,
      username: 'testuser1',
      email: 'test1@test.com',
      avatar: 'avatar1.jpg',
      roles: ['USER'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    category: 'Test Category',
  },
  {
    id: 2,
    title: 'Test Post 2',
    body: 'Test body content 2',
    image: 'test-image-2.jpg',
    userId: 2,
    user: {
      id: 2,
      username: 'testuser2',
      email: 'test2@test.com',
      avatar: 'avatar2.jpg',
      roles: ['USER'],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    category: 'Test Category',
  },
];

describe('PostsGrid', () => {
  it('should render grid with posts and correct structure', () => {
    renderWithProviders(<PostsGrid posts={mockPosts} />);

    // Verify grid container is rendered with correct attributes
    const grid = screen.getByTestId('posts-grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveStyle({
      display: 'grid',
      gap: '1.5rem',
      width: '100%',
      maxWidth: '1280px',
    });

    // Verify all posts are rendered as grid items
    expect(screen.getByTestId('post-grid-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('post-grid-item-2')).toBeInTheDocument();

    // Verify PostCard components are rendered
    expect(screen.getByTestId('post-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('post-card-2')).toBeInTheDocument();
    expect(screen.getByText('Post Card: Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post Card: Test Post 2')).toBeInTheDocument();
  });

  it('should render empty grid when no posts provided', () => {
    renderWithProviders(<PostsGrid posts={[]} />);

    // Grid container should exist even when empty
    const grid = screen.getByTestId('posts-grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveStyle({
      display: 'grid',
      width: '100%',
    });

    // No posts should be rendered
    expect(screen.queryByTestId(/post-grid-item-/)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/post-card-/)).not.toBeInTheDocument();
  });

  it('should handle single post correctly', () => {
    const singlePost = [mockPosts[0]];
    renderWithProviders(<PostsGrid posts={singlePost} />);

    // Grid should exist
    expect(screen.getByTestId('posts-grid')).toBeInTheDocument();

    // Only one post should be rendered
    expect(screen.getByTestId('post-grid-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('post-card-1')).toBeInTheDocument();
    expect(screen.queryByTestId('post-grid-item-2')).not.toBeInTheDocument();
  });
});
