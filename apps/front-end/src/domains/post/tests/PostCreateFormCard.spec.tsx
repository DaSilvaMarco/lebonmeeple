import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import PostCreateFormCard from '@/domains/post/components/PostCreateFormCard';
import userSlice from '@/domains/user/slice';

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

describe('PostCreateFormCard', () => {
  it('should render complete form card with all elements', () => {
    const { container } = renderWithProviders(<PostCreateFormCard />);

    // Verify welcome section renders
    expect(screen.getByText('Créer un nouvel article')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Partagez vos découvertes et passions avec la communauté Le Bon Meeple',
      ),
    ).toBeInTheDocument();

    // Verify form elements render
    expect(screen.getByLabelText("Titre de l'article")).toBeInTheDocument();
    expect(screen.getByLabelText('Image (optionnelle)')).toBeInTheDocument();
    expect(screen.getByLabelText("Contenu de l'article")).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /créer l'article/i }),
    ).toBeInTheDocument();

    // Verify styling
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveStyle({
      position: 'relative',
    });
  });
});
