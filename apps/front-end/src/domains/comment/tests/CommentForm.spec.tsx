import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import CommentForm from '../components/CommentForm';
import { userSlice } from '@frontend/domains/user/slice';
import { createComment } from '../api/create-comment';
import theme from '@frontend/ui/theme';
import type { User, UserState } from '@frontend/domains/user/type';

// Mock des dépendances
vi.mock('../api/create-comment');
vi.mock('@frontend/domains/shared/toat/toast', () => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

const mockCreateComment = createComment as Mock;

// Mock data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  avatar: 'avatar.jpg',
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

describe('CommentForm Component', () => {
  const defaultProps = {
    postId: 1,
    onCommentAdded: vi.fn(),
  };

  const authenticatedStore = () =>
    createTestStore({
      user: mockUser,
      token: 'valid-token',
      isAuthenticated: true,
    });

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateComment.mockResolvedValue({ id: 1, body: 'New comment' });
  });

  it('should handle authentication states and form rendering', () => {
    // Test état non connecté
    const { unmount: unmountUnauthenticated } = render(
      <TestWrapper>
        <CommentForm {...defaultProps} />
      </TestWrapper>,
    );

    expect(
      screen.getByText('Vous devez être connecté pour ajouter un commentaire.'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    // Clean up before next render
    unmountUnauthenticated();

    // Test état connecté avec rendu du formulaire
    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentForm {...defaultProps} />
      </TestWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {
      name: 'Publier le commentaire',
    });

    expect(screen.getByText('Ajouter un commentaire')).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Vérification des attributs
    expect(textarea).toHaveAttribute(
      'placeholder',
      'Écrivez votre commentaire...',
    );
    expect(textarea).not.toBeDisabled();
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(submitButton).not.toBeDisabled();

    // Structure du formulaire et accessibilité
    const form = textarea.closest('form');
    expect(form).toBeInTheDocument();
  });

  it('should handle form input, validation, and character scenarios', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentForm {...defaultProps} />
      </TestWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {
      name: 'Publier le commentaire',
    });

    // Test saisie normale
    await user.type(textarea, 'This is a test comment');
    expect(textarea).toHaveValue('This is a test comment');
    expect(textarea).toHaveFocus();

    // Test validation pour commentaire vide
    await user.clear(textarea);
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Le commentaire ne peut pas être vide'),
      ).toBeInTheDocument();
    });

    // Test caractères spéciaux et unicode
    const specialComment =
      'Comment with special chars: !@#$%^&*()_+-= café, naïve';
    await user.clear(textarea);
    await user.type(textarea, specialComment);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateComment).toHaveBeenCalledWith(
        1,
        { body: specialComment },
        'valid-token',
      );
    });

    // Test commentaire multiligne
    vi.clearAllMocks();
    const multilineComment = 'Line 1\nLine 2\nLine 3';
    await user.clear(textarea);
    await user.type(textarea, multilineComment);
    expect(textarea).toHaveValue(multilineComment);

    // Test commentaire très long
    vi.clearAllMocks();
    const longComment = 'a'.repeat(501);
    fireEvent.change(textarea, { target: { value: longComment } });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateComment).toHaveBeenCalledWith(
        1,
        { body: longComment },
        'valid-token',
      );
    });

    // Test commentaire avec espaces uniquement
    vi.clearAllMocks();
    fireEvent.change(textarea, { target: { value: '   ' } });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateComment).toHaveBeenCalledWith(
        1,
        { body: '   ' },
        'valid-token',
      );
    });
  });

  it('should handle form submission with success, loading, and error states', async () => {
    const user = userEvent.setup();
    const onCommentAdded = vi.fn();

    const { unmount: unmountMain } = render(
      <TestWrapper store={authenticatedStore()}>
        <CommentForm {...defaultProps} onCommentAdded={onCommentAdded} />
      </TestWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {
      name: 'Publier le commentaire',
    });

    // Test soumission réussie et réinitialisation du formulaire
    await user.type(textarea, 'Test comment');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateComment).toHaveBeenCalledWith(
        1,
        { body: 'Test comment' },
        'valid-token',
      );
      expect(onCommentAdded).toHaveBeenCalled();
      expect(textarea).toHaveValue(''); // Formulaire réinitialisé
    });

    // Test état de chargement
    vi.clearAllMocks();
    mockCreateComment.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    await user.type(textarea, 'Loading test');
    await user.click(submitButton);

    expect(screen.getByText('Envoi...')).toBeInTheDocument();
    expect(textarea).toBeDisabled();
    expect(submitButton).toBeDisabled();

    // Wait for loading to complete
    await waitFor(() => {
      expect(textarea).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
    });

    // Test gestion d'erreur
    vi.clearAllMocks();
    mockCreateComment.mockRejectedValue(new Error('API Error'));

    fireEvent.change(textarea, { target: { value: 'Error test' } });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateComment).toHaveBeenCalled();
    });

    // Le formulaire doit redevenir fonctionnel après l'erreur
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(textarea).not.toBeDisabled();
    });

    // Clean up before next test
    unmountMain();

    // Test sans token
    vi.clearAllMocks();
    mockCreateComment.mockResolvedValue({});
    const storeNoToken = createTestStore({
      user: mockUser,
      token: null,
      isAuthenticated: true,
    });

    const { unmount: unmountNoToken } = render(
      <TestWrapper store={storeNoToken}>
        <CommentForm {...defaultProps} />
      </TestWrapper>,
    );

    const textareaNoToken = screen.getByRole('textbox');
    const submitButtonNoToken = screen.getByRole('button', {
      name: 'Publier le commentaire',
    });

    fireEvent.change(textareaNoToken, { target: { value: 'No token test' } });
    await user.click(submitButtonNoToken);

    expect(mockCreateComment).not.toHaveBeenCalled();

    // Clean up
    unmountNoToken();
  });

  it('should handle props integration and edge cases', async () => {
    const user = userEvent.setup();

    // Test avec postId personnalisé
    const customPostId = 42;
    const customCallback = vi.fn();

    const { unmount: unmountFirst } = render(
      <TestWrapper store={authenticatedStore()}>
        <CommentForm
          {...defaultProps}
          postId={customPostId}
          onCommentAdded={customCallback}
        />
      </TestWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {
      name: 'Publier le commentaire',
    });

    await user.type(textarea, 'Custom props test');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateComment).toHaveBeenCalledWith(
        customPostId,
        { body: 'Custom props test' },
        'valid-token',
      );
      expect(customCallback).toHaveBeenCalled();
    });

    // Test soumissions rapides multiples
    vi.clearAllMocks();
    await user.clear(textarea);
    await user.type(textarea, 'Rapid submission test');

    // Clics rapides multiples
    await user.click(submitButton);
    await user.click(submitButton);
    await user.click(submitButton);

    // L'API ne doit être appelée qu'une fois grâce à l'état de chargement
    await waitFor(() => {
      expect(mockCreateComment).toHaveBeenCalledTimes(1);
    });

    // Clean up before next render
    unmountFirst();

    // Test démontage du composant pendant soumission
    mockCreateComment.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000)),
    );

    const { unmount } = render(
      <TestWrapper store={authenticatedStore()}>
        <CommentForm {...defaultProps} />
      </TestWrapper>,
    );

    const textareaUnmount = screen.getByRole('textbox');
    const submitButtonUnmount = screen.getByRole('button', {
      name: 'Publier le commentaire',
    });

    await user.clear(textareaUnmount);
    await user.type(textareaUnmount, 'Unmount test');
    await user.click(submitButtonUnmount);

    expect(() => unmount()).not.toThrow();

    // Test message d'erreur avec accessibilité
    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentForm {...defaultProps} />
      </TestWrapper>,
    );

    const textareaError = screen.getByRole('textbox');
    const submitButtonError = screen.getByRole('button', {
      name: 'Publier le commentaire',
    });

    await user.clear(textareaError);
    await user.click(submitButtonError);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        'Le commentaire ne peut pas être vide',
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
