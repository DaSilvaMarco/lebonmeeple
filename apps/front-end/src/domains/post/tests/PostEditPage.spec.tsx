import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PostEditPage from '../pages/PostEditPage';
import { userSlice } from '@frontend/domains/user/slice';
import theme from '@frontend/ui/theme';
import { Post } from '@frontend/domains/post/type';
import { UserState } from '@frontend/domains/user/type';
import * as getPostByIdModule from '@frontend/domains/post/api/getPostById';
import * as toastModule from '@frontend/domains/shared/toat/toast';

// Mock des dépendances
vi.mock('@frontend/domains/shared/warning/NotConnected', () => ({
  default: () => <div>Not Connected</div>,
}));

vi.mock('@frontend/domains/post/components/PostEditFormCard', () => ({
  default: ({ post, token }: { post: Post; token: string }) => (
    <div data-testid="post-edit-form-card">
      Post Edit Form - {post.title} - Token: {token}
    </div>
  ),
}));

vi.mock('@frontend/domains/post/api/getPostById');
vi.mock('@frontend/domains/shared/toat/toast');

const mockGetPostById = vi.mocked(getPostByIdModule.getPostById);
const mockToastError = vi.mocked(toastModule.toastError);

// Store de test
const createTestStore = (userState: UserState) =>
  configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    preloadedState: {
      user: userState,
    },
  });

const renderWithProviders = (
  component: React.ReactElement,
  userState: UserState,
) => {
  const store = createTestStore(userState);
  return render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>{component}</ChakraProvider>
    </Provider>,
  );
};

const mockUser = {
  id: 1,
  email: 'test@test.com',
  username: 'testuser',
  avatar: undefined,
  roles: ['USER'],
};

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'Test body content',
  image: 'test-image.jpg',
  userId: 1,
  user: mockUser,
};

const authenticatedUserState: UserState = {
  token: 'mock-token',
  isAuthenticated: true,
  isLoading: false,
  user: mockUser,
};

const unauthenticatedUserState: UserState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

describe('PostEditPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render NotConnected when user is not authenticated', () => {
    renderWithProviders(<PostEditPage postId={1} />, unauthenticatedUserState);

    expect(screen.getByText('Not Connected')).toBeInTheDocument();
  });

  it('should render NotConnected when user is null', () => {
    const stateWithNullUser: UserState = {
      token: 'mock-token',
      isAuthenticated: true,
      isLoading: false,
      user: null,
    };

    renderWithProviders(<PostEditPage postId={1} />, stateWithNullUser);

    expect(screen.getByText('Not Connected')).toBeInTheDocument();
  });

  it('should show loading state initially', async () => {
    mockGetPostById.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithProviders(<PostEditPage postId={1} />, authenticatedUserState);

    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('should render PostEditFormCard when post is loaded and user is owner', async () => {
    mockGetPostById.mockResolvedValue(mockPost);

    renderWithProviders(<PostEditPage postId={1} />, authenticatedUserState);

    await waitFor(() => {
      expect(screen.getByTestId('post-edit-form-card')).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Post Edit Form - Test Post - Token: mock-token/),
    ).toBeInTheDocument();
  });

  it('should show error when getPostById throws an Error', async () => {
    const errorMessage = 'Post not found';
    mockGetPostById.mockRejectedValue(new Error(errorMessage));

    renderWithProviders(<PostEditPage postId={1} />, authenticatedUserState);

    await waitFor(() => {
      expect(
        screen.getByText('Erreur lors du chargement du post'),
      ).toBeInTheDocument();
    });

    expect(mockToastError).toHaveBeenCalledWith(
      expect.any(Function),
      'Erreur',
      errorMessage,
    );
  });

  it('should show error when getPostById throws a non-Error', async () => {
    mockGetPostById.mockRejectedValue('Some string error');

    renderWithProviders(<PostEditPage postId={1} />, authenticatedUserState);

    await waitFor(() => {
      expect(
        screen.getByText('Erreur lors du chargement du post'),
      ).toBeInTheDocument();
    });

    expect(mockToastError).toHaveBeenCalledWith(
      expect.any(Function),
      'Erreur',
      'Erreur lors du chargement du post',
    );
  });

  it('should show error when post is null after fetch', async () => {
    mockGetPostById.mockResolvedValue(null);

    renderWithProviders(<PostEditPage postId={1} />, authenticatedUserState);

    await waitFor(() => {
      expect(
        screen.getByText('Erreur lors du chargement du post'),
      ).toBeInTheDocument();
    });
  });

  it('should show unauthorized message when user is not the post owner', async () => {
    const postWithDifferentUser = {
      ...mockPost,
      userId: 999, // Different from authenticated user ID (1)
    };
    mockGetPostById.mockResolvedValue(postWithDifferentUser);

    renderWithProviders(<PostEditPage postId={1} />, authenticatedUserState);

    await waitFor(() => {
      expect(
        screen.getByText("Vous n'êtes pas autorisé à modifier ce post"),
      ).toBeInTheDocument();
    });
  });

  it('should call getPostById with correct postId', async () => {
    mockGetPostById.mockResolvedValue(mockPost);

    renderWithProviders(<PostEditPage postId={123} />, authenticatedUserState);

    expect(mockGetPostById).toHaveBeenCalledWith('123');
  });

  it('should not fetch post when postId is falsy', () => {
    renderWithProviders(<PostEditPage postId={0} />, authenticatedUserState);

    expect(mockGetPostById).not.toHaveBeenCalled();
  });
});
