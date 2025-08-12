import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import PostEditFormCard from '@/domains/post/components/PostEditFormCard';
import userSlice from '@/domains/user/slice';
import { Post } from '@/domains/post/type';

// Mock des hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('@/utils/api-config', () => ({
  getApiBaseUrl: () => 'http://localhost:3001',
}));

vi.mock('@/utils/convertToBase64', () => ({
  convertToBase64: vi.fn().mockResolvedValue('data:image/jpeg;base64,mock'),
}));

// Store de test
const createTestStore = () =>
  configureStore({
    reducer: {
      user: userSlice,
    },
    preloadedState: {
      user: {
        token: 'mock-token' as string,
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: 1,
          email: 'test@test.com',
          username: 'testuser',
          avatar: undefined,
          roles: ['USER'],
        },
      },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <ChakraProvider>{component}</ChakraProvider>
    </Provider>,
  );
};

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'Test body content',
  image: 'test-image.jpg',
  userId: 1,
  user: {
    id: 1,
    username: 'testuser',
    email: 'test@test.com',
    avatar: 'avatar.jpg',
    roles: ['USER'],
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PostEditFormCard', () => {
  it('should render complete edit form card with all elements', () => {
    const { container } = renderWithProviders(
      <PostEditFormCard post={mockPost} token="test-token" />,
    );

    // Verify welcome section renders
    expect(screen.getByText('Modifier votre article')).toBeInTheDocument();

    // Verify form elements render (from PostEditForm component)
    expect(screen.getByLabelText("Titre de l'article")).toBeInTheDocument();
    expect(screen.getByLabelText('Image (optionnelle)')).toBeInTheDocument();
    expect(screen.getByLabelText("Contenu de l'article")).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sauvegarder/i }),
    ).toBeInTheDocument();

    // Verify styling
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveStyle({
      position: 'relative',
    });
  });
});
