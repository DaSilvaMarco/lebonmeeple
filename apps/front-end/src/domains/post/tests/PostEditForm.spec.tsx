import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import PostEditForm from '../components/PostEditForm';
import { convertToBase64 } from '@/utils/convertToBase64';
import { updatePost } from '@/domains/post/api/update-post';
import { Post } from '@/domains/post/type';
import postReducer from '@/domains/post/slice';

// Mock external dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual('@chakra-ui/react');
  return {
    ...actual,
    useToast: vi.fn(),
  };
});

vi.mock('@/utils/convertToBase64', () => ({
  convertToBase64: vi.fn(),
}));

vi.mock('@/domains/post/api/update-post', () => ({
  updatePost: vi.fn(),
}));

vi.mock('@/domains/shared/toat/toast', () => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'Test body content',
  image: 'test-image-base64',
  userId: 1,
  user: {
    id: 1,
    username: 'testuser',
    email: 'test@test.com',
    avatar: '',
  },
};

const mockStore = configureStore({
  reducer: {
    post: postReducer,
  },
  preloadedState: {
    post: {
      posts: [mockPost],
    },
  },
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>
    <ChakraProvider>{children}</ChakraProvider>
  </Provider>
);

describe('PostEditForm', () => {
  const mockPush = vi.fn();
  const mockToast = vi.fn();
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });
    (useToast as Mock).mockReturnValue(mockToast);
  });

  const renderComponent = (post = mockPost, token = 'test-token') => {
    return render(
      <TestWrapper>
        <PostEditForm post={post} token={token} />
      </TestWrapper>,
    );
  };

  it('should render form with initial values', () => {
    renderComponent();

    expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test body content')).toBeInTheDocument();
    expect(
      screen.getByText('Sauvegarder les modifications'),
    ).toBeInTheDocument();
  });

  it('should enable submit button when form is valid', async () => {
    renderComponent();

    const submitButton = screen.getByText('Sauvegarder les modifications');
    expect(submitButton).not.toBeDisabled();
  });

  it('should disable submit button when title is empty', async () => {
    renderComponent();

    const titleInput = screen.getByLabelText("Titre de l'article");
    await user.clear(titleInput);

    await waitFor(() => {
      const submitButton = screen.getByText('Sauvegarder les modifications');
      expect(submitButton).toBeDisabled();
    });
  });

  it('should disable submit button when body is empty', async () => {
    renderComponent();

    const bodyInput = screen.getByLabelText("Contenu de l'article");
    await user.clear(bodyInput);

    await waitFor(() => {
      const submitButton = screen.getByText('Sauvegarder les modifications');
      expect(submitButton).toBeDisabled();
    });
  });

  it('should handle file upload successfully', async () => {
    const mockBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABA';
    (convertToBase64 as Mock).mockResolvedValue(mockBase64);

    renderComponent();

    const fileInput = screen.getByLabelText('Image (optionnelle)');
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    await user.upload(fileInput, file);

    await waitFor(() => {
      expect(convertToBase64).toHaveBeenCalledWith(file);
    });
  });

  it('should handle file upload error', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (convertToBase64 as Mock).mockRejectedValue(new Error('Upload failed'));

    renderComponent();

    const fileInput = screen.getByLabelText('Image (optionnelle)');
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    await user.upload(fileInput, file);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'Erreur lors du téléchargement du fichier:',
        expect.any(Error),
      );
    });

    consoleError.mockRestore();
  });

  it('should submit form successfully', async () => {
    const updatedPost = { ...mockPost, title: 'Updated Title' };
    (updatePost as Mock).mockResolvedValue(updatedPost);

    renderComponent();

    const titleInput = screen.getByLabelText("Titre de l'article");
    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Title');

    const submitButton = screen.getByText('Sauvegarder les modifications');
    await user.click(submitButton);

    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledWith(
        mockPost.id,
        {
          title: 'Updated Title',
          body: 'Test body content',
          image: 'test-image-base64',
        },
        'test-token',
      );
      expect(mockPush).toHaveBeenCalledWith('/posts');
    });
  });

  it('should handle submit error', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (updatePost as Mock).mockRejectedValue(new Error('Update failed'));

    renderComponent();

    const submitButton = screen.getByText('Sauvegarder les modifications');
    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "Erreur lors de la modification de l'article:",
        expect.any(Error),
      );
    });

    consoleError.mockRestore();
  });

  it('should handle submit error with unknown error type', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (updatePost as Mock).mockRejectedValue('Unknown error');

    renderComponent();

    const submitButton = screen.getByText('Sauvegarder les modifications');
    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "Erreur lors de la modification de l'article:",
        'Unknown error',
      );
    });

    consoleError.mockRestore();
  });

  it('should display validation errors for title', async () => {
    renderComponent();

    const titleInput = screen.getByLabelText("Titre de l'article");
    await user.clear(titleInput);
    await user.tab(); // Trigger validation

    await waitFor(() => {
      expect(screen.getByText('Le titre est requis')).toBeInTheDocument();
    });
  });

  it('should display validation errors for body', async () => {
    renderComponent();

    const bodyInput = screen.getByLabelText("Contenu de l'article");
    await user.clear(bodyInput);
    await user.tab(); // Trigger validation

    await waitFor(() => {
      expect(screen.getByText('Le contenu est requis')).toBeInTheDocument();
    });
  });

  it('should handle post without image', () => {
    const postWithoutImage = { ...mockPost, image: '' };
    renderComponent(postWithoutImage);

    expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test body content')).toBeInTheDocument();
  });
});
