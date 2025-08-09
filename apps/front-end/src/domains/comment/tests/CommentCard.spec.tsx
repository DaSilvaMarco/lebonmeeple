import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import CommentCard from '../components/CommentCard';
import { userSlice } from '@frontend/domains/user/slice';
import { deleteComment } from '../api/delete-comment';
import theme from '@frontend/ui/theme';
import type { Comment } from '../type';
import type { User, UserState } from '@frontend/domains/user/type';

// Mock des dépendances
vi.mock('../api/delete-comment');
vi.mock('@frontend/domains/shared/toat/toast', () => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock('../components/CommentEditForm', () => ({
  default: vi.fn(({ onCommentUpdated, onCancel }) => (
    <div data-testid="comment-edit-form">
      <button onClick={onCommentUpdated}>Save Edit</button>
      <button onClick={onCancel}>Cancel Edit</button>
    </div>
  )),
}));

const mockDeleteComment = deleteComment as Mock;

// Mock data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  avatar: 'avatar.jpg',
};

const mockComment: Comment = {
  id: 1,
  body: 'This is a test comment',
  postId: 1,
  userId: 1,
  updatedAt: '2023-01-01T12:00:00Z',
  user: mockUser,
};

const mockOtherUserComment: Comment = {
  ...mockComment,
  id: 2,
  userId: 2,
  user: { ...mockUser, id: 2, username: 'otheruser' },
};

// Store configuration
const createTestStore = (initialUserState: Partial<UserState> = {}) => {
  return configureStore({
    reducer: { user: userSlice.reducer },
    preloadedState: {
      user: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ...initialUserState,
      },
    },
  });
};

const TestWrapper = ({
  children,
  store = createTestStore(),
}: {
  children: React.ReactNode;
  store?: ReturnType<typeof createTestStore>;
}) => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </Provider>
);

describe('CommentCard Component', () => {
  const defaultProps = {
    comment: mockComment,
    onCommentDeleted: vi.fn(),
    onCommentUpdated: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockDeleteComment.mockResolvedValue({});
  });

  it('should render comment content and handle basic display scenarios', () => {
    render(
      <TestWrapper>
        <CommentCard {...defaultProps} />
      </TestWrapper>,
    );

    // Rendu de base
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText(/1 janvier 2023/)).toBeInTheDocument();
    expect(screen.getByLabelText('testuser')).toBeInTheDocument(); // Avatar

    // Pas de boutons quand non authentifié
    expect(
      screen.queryByLabelText('Modifier le commentaire'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Supprimer le commentaire'),
    ).not.toBeInTheDocument();

    // Test avec commentaire multiligne et caractères spéciaux
    const specialComment = {
      ...mockComment,
      body: 'Line 1\nLine 2\n!@#$%^&*()',
      user: { ...mockUser, avatar: undefined },
    };

    render(
      <TestWrapper>
        <CommentCard {...defaultProps} comment={specialComment} />
      </TestWrapper>,
    );

    expect(
      screen.getByText((content) => content.includes('Line 1')),
    ).toBeInTheDocument();
  });

  it('should handle user permissions and show/hide action buttons correctly', () => {
    // Utilisateur propriétaire du commentaire
    const ownerStore = createTestStore({
      user: mockUser,
      token: 'valid-token',
    });

    const { unmount } = render(
      <TestWrapper store={ownerStore}>
        <CommentCard {...defaultProps} />
      </TestWrapper>,
    );

    expect(
      screen.getByLabelText('Modifier le commentaire'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Supprimer le commentaire'),
    ).toBeInTheDocument();

    // Clean up before next render
    unmount();

    // Utilisateur non propriétaire
    render(
      <TestWrapper store={ownerStore}>
        <CommentCard {...defaultProps} comment={mockOtherUserComment} />
      </TestWrapper>,
    );

    expect(
      screen.queryByLabelText('Modifier le commentaire'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Supprimer le commentaire'),
    ).not.toBeInTheDocument();
  });

  it('should handle delete functionality with success and error cases', async () => {
    const store = createTestStore({
      user: mockUser,
      token: 'valid-token',
    });

    const onCommentDeleted = vi.fn();

    const { unmount } = render(
      <TestWrapper store={store}>
        <CommentCard {...defaultProps} onCommentDeleted={onCommentDeleted} />
      </TestWrapper>,
    );

    const deleteButton = screen.getByLabelText('Supprimer le commentaire');

    // Test suppression réussie
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteComment).toHaveBeenCalledWith(1, 'valid-token');
      expect(onCommentDeleted).toHaveBeenCalled();
    });

    // Test cas d'erreur
    mockDeleteComment.mockRejectedValueOnce(new Error('Delete failed'));
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteComment).toHaveBeenCalledTimes(2);
    });

    // Clean up before next render
    unmount();

    // Test sans token
    const storeNoToken = createTestStore({
      user: mockUser,
      token: null,
    });

    render(
      <TestWrapper store={storeNoToken}>
        <CommentCard {...defaultProps} />
      </TestWrapper>,
    );

    const deleteButtonNoToken = screen.getByLabelText(
      'Supprimer le commentaire',
    );
    fireEvent.click(deleteButtonNoToken);

    // Ne doit pas appeler l'API sans token
    expect(mockDeleteComment).toHaveBeenCalledTimes(2);
  });

  it('should handle edit mode functionality and form interactions', async () => {
    const store = createTestStore({
      user: mockUser,
      token: 'valid-token',
    });

    const onCommentUpdated = vi.fn();

    const { unmount } = render(
      <TestWrapper store={store}>
        <CommentCard {...defaultProps} onCommentUpdated={onCommentUpdated} />
      </TestWrapper>,
    );

    const editButton = screen.getByLabelText('Modifier le commentaire');
    const deleteButton = screen.getByLabelText('Supprimer le commentaire');

    // Entrer en mode édition
    fireEvent.click(editButton);

    expect(screen.getByTestId('comment-edit-form')).toBeInTheDocument();
    expect(
      screen.queryByText('This is a test comment'),
    ).not.toBeInTheDocument();
    expect(editButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();

    // Annuler l'édition
    const cancelButton = screen.getByText('Cancel Edit');
    fireEvent.click(cancelButton);

    expect(screen.queryByTestId('comment-edit-form')).not.toBeInTheDocument();
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();

    // Retourner en mode édition et sauvegarder
    fireEvent.click(editButton);
    const saveButton = screen.getByText('Save Edit');
    fireEvent.click(saveButton);

    expect(onCommentUpdated).toHaveBeenCalled();

    // Clean up before next render
    unmount();

    // Test sans callback onCommentUpdated
    const propsWithoutCallback = {
      comment: mockComment,
      onCommentDeleted: vi.fn(),
    };

    render(
      <TestWrapper store={store}>
        <CommentCard {...propsWithoutCallback} />
      </TestWrapper>,
    );

    const editButton2 = screen.getByLabelText('Modifier le commentaire');
    fireEvent.click(editButton2);
    const saveButton2 = screen.getByText('Save Edit');

    expect(() => fireEvent.click(saveButton2)).not.toThrow();
  });

  it('should handle edge cases and accessibility features', () => {
    const store = createTestStore({
      user: mockUser,
      token: 'valid-token',
    });

    // Test prévention de propagation d'événements
    const containerClickHandler = vi.fn();

    const { unmount } = render(
      <TestWrapper store={store}>
        <div onClick={containerClickHandler}>
          <CommentCard {...defaultProps} />
        </div>
      </TestWrapper>,
    );

    const editButton = screen.getByLabelText('Modifier le commentaire');
    const deleteButton = screen.getByLabelText('Supprimer le commentaire');

    // Test that clicking buttons when enabled doesn't propagate
    fireEvent.click(deleteButton);

    expect(containerClickHandler).not.toHaveBeenCalled();

    // Reset and test edit button
    containerClickHandler.mockClear();
    fireEvent.click(editButton);

    expect(containerClickHandler).not.toHaveBeenCalled();

    // Clean up before next render
    unmount();

    // Test accessibilité et cas limites
    const edgeCaseComment = {
      ...mockComment,
      body: '',
      updatedAt: 'invalid-date',
      user: {
        id: 1,
        username: 'a'.repeat(100),
        email: 'test@example.com',
      } as User,
    };

    render(
      <TestWrapper>
        <CommentCard {...defaultProps} comment={edgeCaseComment} />
      </TestWrapper>,
    );

    expect(screen.getByText('a'.repeat(100))).toBeInTheDocument();
    expect(screen.getAllByRole('img')[0]).toBeInTheDocument(); // Avatar
  });
});
