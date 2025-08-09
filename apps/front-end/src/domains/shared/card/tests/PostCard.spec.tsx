import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import PostCard from '../components/PostCard';
import { deletePost as deletePostApi } from '@frontend/domains/post/api/delete-post';
import { toastSuccess, toastError } from '@frontend/domains/shared/toat/toast';
import { Post } from '@frontend/domains/post/type';
import { UserState } from '@frontend/domains/user/type';

// Mock des modules externes
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@frontend/domains/post/api/delete-post', () => ({
  deletePost: vi.fn(),
}));

vi.mock('@frontend/domains/shared/toat/toast', () => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock('next/link', () => {
  return {
    default: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href: string;
    }) => <a href={href}>{children}</a>,
  };
});

vi.mock('@frontend/domains/shared/image/components/Image', () => {
  return {
    default: ({
      alt,
      src,
      fallbackSrc,
    }: {
      alt: string;
      src: string;
      fallbackSrc: string;
    }) => <img alt={alt} src={src || fallbackSrc} />,
  };
});

// Types pour le store de test
interface TestStoreState {
  user: UserState;
  post?: { posts: Post[] };
}

// Mock du store Redux
const createMockStore = (initialState: TestStoreState) => {
  return configureStore({
    reducer: {
      user: (state = initialState.user) => state,
      post: (state = initialState.post || { posts: [] }) => state,
    },
    preloadedState: initialState,
  });
};

// Mock des hooks Chakra UI
const mockToast = vi.fn();
vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react');
  return {
    ...actual,
    useToast: () => mockToast,
    useColorModeValue: (light: string) => light,
  };
});

const mockPush = vi.fn();
vi.mocked(useRouter).mockReturnValue({
  push: mockPush,
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
});

// Données de test
const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'This is a test post description',
  image: '/test-image.jpg',
  userId: 1,
  user: {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    avatar: '/test-avatar.jpg',
  },
};

const mockUserState: UserState = {
  user: { id: 1, username: 'testuser', email: 'test@example.com' },
  token: 'test-token',
  isAuthenticated: true,
  isLoading: false,
};

const mockUserStateNoToken: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const mockUserStateDifferentUser: UserState = {
  user: { id: 2, username: 'otheruser', email: 'other@example.com' },
  token: 'other-token',
  isAuthenticated: true,
  isLoading: false,
};

const renderWithProviders = (
  component: React.ReactElement,
  initialState: TestStoreState,
) => {
  const store = createMockStore(initialState);
  return render(
    <Provider store={store}>
      <ChakraProvider>{component}</ChakraProvider>
    </Provider>,
  );
};

describe('PostCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render post card with all information', () => {
    renderWithProviders(<PostCard post={mockPost} />, { user: mockUserState });

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test post description'),
    ).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText("Auteur de l'annonce")).toBeInTheDocument();
    expect(screen.getByText('Jeu de société')).toBeInTheDocument();
    expect(
      screen.getByAltText("Photo de l'article Test Post"),
    ).toBeInTheDocument();
  });

  it('should show edit and delete buttons when user owns the post', () => {
    renderWithProviders(<PostCard post={mockPost} />, { user: mockUserState });

    expect(screen.getByLabelText('Modifier le post')).toBeInTheDocument();
    expect(screen.getByLabelText('Supprimer le post')).toBeInTheDocument();
  });

  it('should not show edit and delete buttons when user does not own the post', () => {
    renderWithProviders(<PostCard post={mockPost} />, {
      user: mockUserStateDifferentUser,
    });

    expect(screen.queryByLabelText('Modifier le post')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Supprimer le post'),
    ).not.toBeInTheDocument();
  });

  it('should not show edit and delete buttons when user is not logged in', () => {
    renderWithProviders(<PostCard post={mockPost} />, {
      user: mockUserStateNoToken,
    });

    expect(screen.queryByLabelText('Modifier le post')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Supprimer le post'),
    ).not.toBeInTheDocument();
  });

  it('should navigate to edit page when edit button is clicked', () => {
    renderWithProviders(<PostCard post={mockPost} />, { user: mockUserState });

    const editButton = screen.getByLabelText('Modifier le post');
    fireEvent.click(editButton);

    expect(mockPush).toHaveBeenCalledWith('/posts/1/edit');
  });

  it('should show error toast when trying to delete without token', async () => {
    const storeWithUser = createMockStore({
      user: {
        user: { id: 1, username: 'testuser', email: 'test@example.com' },
        token: null,
        isAuthenticated: false,
        isLoading: false,
      },
    });
    render(
      <Provider store={storeWithUser}>
        <ChakraProvider>
          <PostCard post={mockPost} />
        </ChakraProvider>
      </Provider>,
    );

    const deleteButton = screen.getByLabelText('Supprimer le post');
    fireEvent.click(deleteButton);

    expect(toastError).toHaveBeenCalledWith(
      mockToast,
      'Erreur',
      'Vous devez être connecté pour supprimer un post.',
    );
  });

  it('should successfully delete post when delete button is clicked', async () => {
    vi.mocked(deletePostApi).mockResolvedValue({});

    renderWithProviders(<PostCard post={mockPost} />, { user: mockUserState });

    const deleteButton = screen.getByLabelText('Supprimer le post');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deletePostApi).toHaveBeenCalledWith(1, 'test-token');
      expect(toastSuccess).toHaveBeenCalledWith(
        mockToast,
        'Succès',
        'Le post a été supprimé avec succès.',
      );
    });
  });

  it('should show error toast when delete fails with Error instance', async () => {
    const errorMessage = 'Delete failed';
    vi.mocked(deletePostApi).mockRejectedValue(new Error(errorMessage));

    renderWithProviders(<PostCard post={mockPost} />, { user: mockUserState });

    const deleteButton = screen.getByLabelText('Supprimer le post');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        mockToast,
        'Erreur',
        errorMessage,
      );
    });
  });

  it('should show generic error toast when delete fails with non-Error instance', async () => {
    vi.mocked(deletePostApi).mockRejectedValue('Some string error');

    renderWithProviders(<PostCard post={mockPost} />, { user: mockUserState });

    const deleteButton = screen.getByLabelText('Supprimer le post');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(
        mockToast,
        'Erreur',
        'Une erreur est survenue',
      );
    });
  });

  it('should render with default avatar when user has no avatar', () => {
    const postWithoutAvatar: Post = {
      ...mockPost,
      user: {
        ...mockPost.user,
        avatar: undefined,
      },
    };

    renderWithProviders(<PostCard post={postWithoutAvatar} />, {
      user: mockUserState,
    });

    expect(screen.getByText('testuser')).toBeInTheDocument();
  });
});
