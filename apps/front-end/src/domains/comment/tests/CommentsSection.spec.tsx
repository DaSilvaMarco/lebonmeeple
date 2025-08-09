import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import CommentsSection from '../components/CommentsSection';
import { userSlice } from '@frontend/domains/user/slice';
import theme from '@frontend/ui/theme';
import type { Comment } from '../type';
import type { User, UserState } from '@frontend/domains/user/type';

// Mock des composants enfants
vi.mock('../components/CommentCard', () => ({
  default: vi.fn(({ comment, onCommentDeleted, onCommentUpdated }) => (
    <div data-testid={`comment-card-${comment.id}`}>
      <div>
        Comment by {comment.user.username}: {comment.body}
      </div>
      <button onClick={onCommentDeleted}>Delete</button>
      <button onClick={onCommentUpdated}>Update</button>
    </div>
  )),
}));

vi.mock('../components/CommentForm', () => ({
  default: vi.fn(({ postId, onCommentAdded }) => (
    <div data-testid="comment-form">
      <div>Comment form for post {postId}</div>
      <button onClick={onCommentAdded}>Add Comment</button>
    </div>
  )),
}));

// Mock data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  avatar: 'avatar.jpg',
};

const mockUser2: User = {
  id: 2,
  email: 'test2@example.com',
  username: 'testuser2',
  avatar: 'avatar2.jpg',
};

const mockComments: Comment[] = [
  {
    id: 1,
    body: 'First comment',
    postId: 1,
    userId: 1,
    updatedAt: '2023-01-01T10:00:00Z',
    user: mockUser,
  },
  {
    id: 2,
    body: 'Second comment',
    postId: 1,
    userId: 2,
    updatedAt: '2023-01-01T12:00:00Z',
    user: mockUser2,
  },
  {
    id: 3,
    body: 'Third comment',
    postId: 1,
    userId: 1,
    updatedAt: '2023-01-01T08:00:00Z',
    user: mockUser,
  },
];

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

describe('CommentsSection Component', () => {
  const defaultProps = {
    postId: 1,
    comments: mockComments,
    onCommentsUpdate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render basic structure and handle comment count variations', () => {
    // Test rendu de base avec commentaires
    const { unmount } = render(
      <TestWrapper>
        <CommentsSection {...defaultProps} />
      </TestWrapper>,
    );

    // Éléments de base
    expect(screen.getByText('Commentaires (3)')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument(); // Divider
    expect(screen.getByTestId('comment-form')).toBeInTheDocument();
    expect(screen.getByText('Comment form for post 1')).toBeInTheDocument();

    // Toutes les cartes de commentaires
    expect(screen.getByTestId('comment-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('comment-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('comment-card-3')).toBeInTheDocument();
    unmount();

    // Test avec un seul commentaire
    const { unmount: unmount2 } = render(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={[mockComments[0]]} />
      </TestWrapper>,
    );

    expect(screen.getByText('Commentaires (1)')).toBeInTheDocument();
    unmount2();

    // Test sans commentaires (état vide)
    render(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={[]} />
      </TestWrapper>,
    );

    expect(screen.getByText('Commentaires (0)')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Aucun commentaire pour le moment. Soyez le premier à commenter !',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByTestId(/comment-card-/)).not.toBeInTheDocument();
    expect(screen.getByTestId('comment-form')).toBeInTheDocument(); // Formulaire toujours présent
  });

  it('should handle comment sorting and display correct order', () => {
    const { unmount } = render(
      <TestWrapper>
        <CommentsSection {...defaultProps} />
      </TestWrapper>,
    );

    const commentCards = screen.getAllByTestId(/comment-card-/);

    // Vérifier l'ordre par date décroissante: comment 2 (12h00), comment 1 (10h00), comment 3 (08h00)
    expect(commentCards[0]).toHaveAttribute('data-testid', 'comment-card-2');
    expect(commentCards[1]).toHaveAttribute('data-testid', 'comment-card-1');
    expect(commentCards[2]).toHaveAttribute('data-testid', 'comment-card-3');

    // Vérifier le contenu des commentaires
    expect(
      screen.getByText('Comment by testuser: First comment'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Comment by testuser2: Second comment'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Comment by testuser: Third comment'),
    ).toBeInTheDocument();
    unmount();

    // Test avec commentaires ayant la même date
    const sameTimeComments = [
      { ...mockComments[0], id: 1, updatedAt: '2023-01-01T12:00:00Z' },
      { ...mockComments[1], id: 2, updatedAt: '2023-01-01T12:00:00Z' },
    ];

    render(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={sameTimeComments} />
      </TestWrapper>,
    );

    expect(screen.getByTestId('comment-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('comment-card-2')).toBeInTheDocument();

    // Vérifier que l'original n'est pas muté
    const originalOrder = mockComments.map((c) => c.id);
    expect(defaultProps.comments.map((c) => c.id)).toEqual(originalOrder);
  });

  it('should handle props passing and callback integration', () => {
    const onCommentsUpdate = vi.fn();
    const customPostId = 42;

    render(
      <TestWrapper>
        <CommentsSection
          {...defaultProps}
          postId={customPostId}
          onCommentsUpdate={onCommentsUpdate}
        />
      </TestWrapper>,
    );

    // Test postId passé au formulaire
    expect(screen.getByText('Comment form for post 42')).toBeInTheDocument();

    // Test callbacks - ajout de commentaire
    const addButton = screen.getByText('Add Comment');
    addButton.click();
    expect(onCommentsUpdate).toHaveBeenCalled();

    // Test callbacks - suppression de commentaire
    vi.clearAllMocks();
    const deleteButton = screen.getAllByText('Delete')[0];
    deleteButton.click();
    expect(onCommentsUpdate).toHaveBeenCalled();

    // Test callbacks - mise à jour de commentaire
    vi.clearAllMocks();
    const updateButton = screen.getAllByText('Update')[0];
    updateButton.click();
    expect(onCommentsUpdate).toHaveBeenCalled();

    // Test callbacks multiples rapides
    vi.clearAllMocks();
    addButton.click();
    deleteButton.click();
    updateButton.click();
    expect(onCommentsUpdate).toHaveBeenCalledTimes(3);

    // Test avec différents postIds
    [1, 999].forEach((postId) => {
      render(
        <TestWrapper>
          <CommentsSection {...defaultProps} postId={postId} />
        </TestWrapper>,
      );
      expect(
        screen.getByText(`Comment form for post ${postId}`),
      ).toBeInTheDocument();
    });
  });

  it('should handle edge cases and performance scenarios', () => {
    // Test avec données utilisateur manquantes
    const commentsWithMissingUser = [
      {
        ...mockComments[0],
        user: { ...mockUser, username: '' },
      },
    ];

    const { unmount } = render(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={commentsWithMissingUser} />
      </TestWrapper>,
    );

    expect(screen.getByTestId('comment-card-1')).toBeInTheDocument();
    unmount();

    // Test avec dates invalides
    const commentsWithInvalidDate = [
      {
        ...mockComments[0],
        updatedAt: 'invalid-date',
      },
    ];

    const { unmount: unmount2 } = render(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={commentsWithInvalidDate} />
      </TestWrapper>,
    );

    expect(screen.getByTestId('comment-card-1')).toBeInTheDocument();
    unmount2();

    // Test avec grand nombre de commentaires
    const manyComments = Array.from({ length: 50 }, (_, index) => ({
      ...mockComments[0],
      id: index + 1,
      body: `Comment ${index + 1}`,
      updatedAt: `2023-01-01T${String(10 + index).padStart(2, '0')}:00:00Z`,
    }));

    const { unmount: unmount3 } = render(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={manyComments} />
      </TestWrapper>,
    );

    expect(screen.getByText('Commentaires (50)')).toBeInTheDocument();
    expect(screen.getAllByTestId(/comment-card-/).length).toBe(50);
    unmount3();

    // Test avec texte très long et caractères spéciaux
    const specialComments = [
      { ...mockComments[0], body: 'a'.repeat(1000) },
      {
        ...mockComments[1],
        body: 'Comment with special chars: !@#$%^&*()_+-=',
      },
      { ...mockComments[2], body: 'Comment avec émojis: café, naïve' },
    ];

    const { unmount: unmount4 } = render(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={specialComments} />
      </TestWrapper>,
    );

    expect(screen.getByTestId('comment-card-1')).toBeInTheDocument();
    expect(screen.getByText(/Comment with special chars/)).toBeInTheDocument();
    expect(screen.getByText(/Comment avec émojis/)).toBeInTheDocument();
    unmount4();

    // Test transitions rapides de props
    const { rerender } = render(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={[]} />
      </TestWrapper>,
    );

    expect(
      screen.getByText(
        'Aucun commentaire pour le moment. Soyez le premier à commenter !',
      ),
    ).toBeInTheDocument();

    // Transition vers état avec commentaires
    rerender(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={mockComments} />
      </TestWrapper>,
    );

    expect(
      screen.queryByText(
        'Aucun commentaire pour le moment. Soyez le premier à commenter !',
      ),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Commentaires (3)')).toBeInTheDocument();

    // Ajout de nouveaux commentaires
    const newComments = [
      ...mockComments,
      {
        id: 4,
        body: 'New comment',
        postId: 1,
        userId: 1,
        updatedAt: '2023-01-01T14:00:00Z',
        user: mockUser,
      },
    ];

    rerender(
      <TestWrapper>
        <CommentsSection {...defaultProps} comments={newComments} />
      </TestWrapper>,
    );

    expect(screen.getByText('Commentaires (4)')).toBeInTheDocument();
    expect(screen.getByTestId('comment-card-4')).toBeInTheDocument();
  });
});
