import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import CommentEditForm from '../components/CommentEditForm';
import { userSlice } from '@frontend/domains/user/slice';
import { updateComment } from '../api/update-comment';
import theme from '@frontend/ui/theme';
import type { User, UserState } from '@frontend/domains/user/type';

// Mock des dépendances
vi.mock('../api/update-comment');
vi.mock('@frontend/domains/shared/toat/toast', () => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

const mockUpdateComment = updateComment as Mock;

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

describe('CommentEditForm Component', () => {
  const defaultProps = {
    commentId: 1,
    initialBody: 'Initial comment text',
    onCommentUpdated: vi.fn(),
    onCancel: vi.fn(),
  };

  const authenticatedStore = () =>
    createTestStore({
      user: mockUser,
      token: 'valid-token',
      isAuthenticated: true,
    });

  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateComment.mockResolvedValue({ id: 1, body: 'Updated comment' });
  });

  afterEach(() => {
    cleanup();
  });

  it('should render form elements and handle basic functionality', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentEditForm {...defaultProps} />
      </TestWrapper>,
    );

    // Rendu des éléments
    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Modifier' });
    const cancelButton = screen.getByRole('button', { name: 'Annuler' });

    expect(textarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    // Valeur initiale et attributs
    expect(textarea).toHaveValue('Initial comment text');
    expect(textarea).toHaveAttribute(
      'placeholder',
      'Écrivez votre commentaire...',
    );
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(cancelButton).not.toHaveAttribute('type', 'submit');

    // Test modification du contenu
    await user.clear(textarea);
    await user.type(textarea, 'Updated comment text');
    expect(textarea).toHaveValue('Updated comment text');

    // Test structure du formulaire et accessibilité
    const form = textarea.closest('form');
    expect(form).toBeInTheDocument();
    expect(textarea).toHaveFocus();

    // Test avec props personnalisées
    const customInitialBody = 'Custom initial text';
    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentEditForm {...defaultProps} initialBody={customInitialBody} />
      </TestWrapper>,
    );

    expect(screen.getByDisplayValue(customInitialBody)).toBeInTheDocument();
  });

  it('should handle form validation with different input scenarios', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentEditForm {...defaultProps} />
      </TestWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Modifier' });

    // Test validation pour commentaire vide
    await user.clear(textarea);
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Le commentaire ne peut pas être vide'),
      ).toBeInTheDocument();
    });

    // Test commentaire avec caractères spéciaux et unicode
    const specialComment =
      'Comment with special chars: !@#$%^&*()_+-= café, naïve';
    await user.clear(textarea);
    await user.type(textarea, specialComment);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateComment).toHaveBeenCalledWith(
        1,
        { body: specialComment },
        'valid-token',
      );
    });

    // Test commentaire multiligne
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
      expect(mockUpdateComment).toHaveBeenCalledWith(
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
      expect(mockUpdateComment).toHaveBeenCalledWith(
        1,
        { body: '   ' },
        'valid-token',
      );
    });
  });

  it('should handle form submission with success, loading, and error states', async () => {
    const user = userEvent.setup();
    const onCommentUpdated = vi.fn();

    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentEditForm
          {...defaultProps}
          onCommentUpdated={onCommentUpdated}
        />
      </TestWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Modifier' });
    const cancelButton = screen.getByRole('button', { name: 'Annuler' });

    // Test soumission réussie
    await user.clear(textarea);
    await user.type(textarea, 'Updated comment');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateComment).toHaveBeenCalledWith(
        1,
        { body: 'Updated comment' },
        'valid-token',
      );
      expect(onCommentUpdated).toHaveBeenCalled();
    });

    // Test état de chargement
    vi.clearAllMocks();
    mockUpdateComment.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    await user.clear(textarea);
    await user.type(textarea, 'Loading test');
    await user.click(submitButton);

    expect(screen.getByText('Modification...')).toBeInTheDocument();
    expect(textarea).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();

    // Wait for loading to complete
    await waitFor(() => {
      expect(textarea).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
    });

    // Test gestion d'erreur
    vi.clearAllMocks();
    mockUpdateComment.mockRejectedValue(new Error('API Error'));

    await user.clear(textarea);
    await user.type(textarea, 'Error test');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateComment).toHaveBeenCalled();
    });

    // Le formulaire doit redevenir fonctionnel après l'erreur
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(textarea).not.toBeDisabled();
    });

    // Test sans token
    vi.clearAllMocks();
    mockUpdateComment.mockResolvedValue({});
    const storeNoToken = createTestStore({
      user: mockUser,
      token: null,
      isAuthenticated: true,
    });

    render(
      <TestWrapper store={storeNoToken}>
        <CommentEditForm {...defaultProps} />
      </TestWrapper>,
    );

    const textareaNoToken = screen.getAllByRole('textbox')[1];
    const submitButtonNoToken = screen.getAllByRole('button', {
      name: 'Modifier',
    })[1];

    await user.clear(textareaNoToken);
    await user.type(textareaNoToken, 'No token test');
    await user.click(submitButtonNoToken);

    expect(mockUpdateComment).not.toHaveBeenCalled();
  });

  it('should handle cancel functionality and props integration', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const customCommentId = 42;

    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentEditForm
          {...defaultProps}
          commentId={customCommentId}
          onCancel={onCancel}
        />
      </TestWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const cancelButton = screen.getByRole('button', { name: 'Annuler' });
    const submitButton = screen.getByRole('button', { name: 'Modifier' });

    // Test annulation normale
    await user.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
    expect(mockUpdateComment).not.toHaveBeenCalled();

    // Test annulation après modification du contenu
    vi.clearAllMocks();
    await user.clear(textarea);
    await user.type(textarea, 'Modified text');
    expect(textarea).toHaveValue('Modified text');
    await user.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();

    // Test avec commentId personnalisé
    vi.clearAllMocks();
    await user.clear(textarea);
    await user.type(textarea, 'Test with custom ID');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateComment).toHaveBeenCalledWith(
        customCommentId,
        { body: 'Test with custom ID' },
        'valid-token',
      );
    });

    // Test sans callback onCommentUpdated
    const propsWithoutCallback = {
      commentId: 1,
      initialBody: 'Test',
      onCancel: vi.fn(),
      onCommentUpdated: vi.fn(),
    };

    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentEditForm {...propsWithoutCallback} />
      </TestWrapper>,
    );

    const textareaNoCallback = screen.getAllByRole('textbox')[1];
    const submitButtonNoCallback = screen.getAllByRole('button', {
      name: 'Modifier',
    })[1];

    await user.clear(textareaNoCallback);
    await user.type(textareaNoCallback, 'No callback test');

    expect(() => user.click(submitButtonNoCallback)).not.toThrow();
  });

  it('should handle edge cases and accessibility requirements', async () => {
    const user = userEvent.setup();

    // Test with various initial body values - test each case separately
    const testCases = [
      { initialBody: '' },
      { initialBody: 'a'.repeat(999) },
      { initialBody: 'Normal text' },
    ];

    for (const { initialBody } of testCases) {
      const { unmount } = render(
        <TestWrapper store={authenticatedStore()}>
          <CommentEditForm {...defaultProps} initialBody={initialBody} />
        </TestWrapper>,
      );

      const textarea = screen.getByDisplayValue(initialBody);
      expect(textarea).toBeInTheDocument();

      // Clean up this render before the next iteration
      unmount();
    }

    // Test soumissions rapides multiples
    const { unmount: unmountRapid } = render(
      <TestWrapper store={authenticatedStore()}>
        <CommentEditForm {...defaultProps} />
      </TestWrapper>,
    );

    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Modifier' });

    await user.clear(textarea);
    await user.type(textarea, 'Rapid submission test');

    // Clics rapides multiples
    await user.click(submitButton);
    await user.click(submitButton);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateComment).toHaveBeenCalled();
    });

    unmountRapid();

    // Test démontage du composant pendant soumission
    mockUpdateComment.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000)),
    );

    const { unmount } = render(
      <TestWrapper store={authenticatedStore()}>
        <CommentEditForm {...defaultProps} />
      </TestWrapper>,
    );

    const textareaUnmount = screen.getByRole('textbox');
    const submitButtonUnmount = screen.getByRole('button', {
      name: 'Modifier',
    });

    await user.clear(textareaUnmount);
    await user.type(textareaUnmount, 'Unmount test');
    await user.click(submitButtonUnmount);

    expect(() => unmount()).not.toThrow();

    // Test message d'erreur avec accessibilité
    render(
      <TestWrapper store={authenticatedStore()}>
        <CommentEditForm {...defaultProps} />
      </TestWrapper>,
    );

    const textareaError = screen.getByRole('textbox');
    const submitButtonError = screen.getByRole('button', { name: 'Modifier' });

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
