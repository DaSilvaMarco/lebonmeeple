import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import PostViewPage from '../pages/PostViewPage';
import theme from '@frontend/ui/theme';
import type { Post } from '@frontend/domains/post/type';
import type { User } from '@frontend/domains/user/type';
import type { Comment } from '@frontend/domains/comment/type';

// Mock the child components and dependencies
vi.mock('@frontend/domains/shared/button/components/GoBackButton', () => ({
  default: () => <button data-testid="go-back-button">Go Back</button>,
}));

vi.mock('@frontend/domains/shared/image/components/Image', () => ({
  default: ({
    alt,
    src,
    fallbackSrc,
    ...props
  }: {
    alt: string;
    src: string;
    fallbackSrc: string;
    [key: string]: unknown;
  }) => (
    <img
      data-testid="post-image"
      alt={alt}
      src={src}
      data-fallback={fallbackSrc}
      {...props}
    />
  ),
}));

vi.mock('@frontend/domains/comment/components/CommentsSection', () => ({
  default: ({
    postId,
    comments,
    onCommentsUpdate,
  }: {
    postId: number;
    comments: Comment[];
    onCommentsUpdate: () => void;
  }) => (
    <div
      data-testid="comments-section"
      data-post-id={postId}
      data-comments-count={comments.length}
    >
      Comments Section
      <button onClick={onCommentsUpdate} data-testid="update-comments">
        Update Comments
      </button>
    </div>
  ),
}));

// Mock getPostById API
vi.mock('../api/getPostById', () => ({
  getPostById: vi.fn(),
}));

import { getPostById } from '../api/getPostById';
const mockGetPostById = vi.mocked(getPostById);

// Mock data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  avatar: '/user-avatar.jpg',
  roles: ['USER'],
};

const mockComment: Comment = {
  id: 1,
  body: 'Test comment',
  postId: 1,
  userId: 1,
  updatedAt: '2023-01-01T00:00:00.000Z',
  user: mockUser,
};

const mockPostWithImage: Post = {
  id: 1,
  title: 'Test Post Title',
  body: 'This is a test post body content.',
  image: '/test-image.jpg',
  user: mockUser,
  userId: 1,
  comments: [mockComment],
};

const mockPostWithoutImage: Post = {
  id: 2,
  title: 'Post Without Image',
  body: 'This post has no image.',
  image: '',
  user: { ...mockUser, avatar: '' },
  userId: 1,
  comments: [],
};

const renderWithChakra = (component: React.ReactElement) => {
  return render(<ChakraProvider theme={theme}>{component}</ChakraProvider>);
};

describe('PostViewPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders post with all elements when image is present', () => {
    renderWithChakra(<PostViewPage post={mockPostWithImage} />);

    // Check main elements are rendered
    expect(screen.getByTestId('go-back-button')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Test Post Title' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('This is a test post body content.'),
    ).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText("Auteur de l'annonce")).toBeInTheDocument();
    expect(screen.getByText('Article de blog')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Voir tous les articles' }),
    ).toBeInTheDocument();

    // Check image is rendered
    expect(screen.getByTestId('post-image')).toBeInTheDocument();
    expect(screen.getByTestId('post-image')).toHaveAttribute(
      'alt',
      "Photo de l'article: Test Post Title",
    );
    expect(screen.getByTestId('post-image')).toHaveAttribute(
      'src',
      '/test-image.jpg',
    );

    // Check comments section
    expect(screen.getByTestId('comments-section')).toBeInTheDocument();
    expect(screen.getByTestId('comments-section')).toHaveAttribute(
      'data-post-id',
      '1',
    );
    expect(screen.getByTestId('comments-section')).toHaveAttribute(
      'data-comments-count',
      '1',
    );
  });

  it('renders post without image correctly', () => {
    renderWithChakra(<PostViewPage post={mockPostWithoutImage} />);

    // Check main elements are rendered
    expect(
      screen.getByRole('heading', { name: 'Post Without Image' }),
    ).toBeInTheDocument();
    expect(screen.getByText('This post has no image.')).toBeInTheDocument();

    // Check image is not rendered when not present
    expect(screen.queryByTestId('post-image')).not.toBeInTheDocument();

    // Check that avatar is rendered (even if it shows initials instead of image)
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('handles comments update successfully', async () => {
    const updatedPost = {
      ...mockPostWithImage,
      comments: [...mockPostWithImage.comments!, mockComment],
    };
    mockGetPostById.mockResolvedValue(updatedPost);

    renderWithChakra(<PostViewPage post={mockPostWithImage} />);

    // Trigger comments update
    const updateButton = screen.getByTestId('update-comments');
    updateButton.click();

    await waitFor(() => {
      expect(mockGetPostById).toHaveBeenCalledWith('1');
    });

    // The updated post should be reflected in the component
    expect(screen.getByTestId('comments-section')).toHaveAttribute(
      'data-comments-count',
      '2',
    );
  });

  it('handles comments update error gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockGetPostById.mockRejectedValue(new Error('API Error'));

    renderWithChakra(<PostViewPage post={mockPostWithImage} />);

    // Trigger comments update
    const updateButton = screen.getByTestId('update-comments');
    updateButton.click();

    await waitFor(() => {
      expect(mockGetPostById).toHaveBeenCalledWith('1');
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Erreur lors de la mise à jour des commentaires:',
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it('renders with empty comments array', () => {
    renderWithChakra(<PostViewPage post={mockPostWithoutImage} />);

    expect(screen.getByTestId('comments-section')).toHaveAttribute(
      'data-comments-count',
      '0',
    );
  });

  it('renders with undefined comments', () => {
    const postWithUndefinedComments = {
      ...mockPostWithImage,
      comments: undefined,
    };
    renderWithChakra(<PostViewPage post={postWithUndefinedComments} />);

    expect(screen.getByTestId('comments-section')).toHaveAttribute(
      'data-comments-count',
      '0',
    );
  });

  it('uses fallback avatar when user avatar is not provided', () => {
    const postWithNoAvatar = {
      ...mockPostWithoutImage, // Use post without image to avoid conflicts
      user: { ...mockUser, avatar: undefined },
    };
    renderWithChakra(<PostViewPage post={postWithNoAvatar} />);

    // Check that username is still displayed even without avatar image
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText("Auteur de l'annonce")).toBeInTheDocument();
  });
});
