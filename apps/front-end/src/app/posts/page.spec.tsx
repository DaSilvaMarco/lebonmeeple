import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import PostsPageApp from './page';
import { lebonmeepleApi } from '@frontend/store/lebonmeepleApi';
import theme from '@frontend/ui/theme';

// Mock du domaine post
vi.mock('@frontend/domains/post/pages/PostsClientPage', () => ({
  default: vi.fn(() => (
    <div data-testid="posts-client-page">Mocked PostsClientPage</div>
  )),
}));

// Import du composant mocké pour les types
import PostsClientPage from '@frontend/domains/post/pages/PostsClientPage';

// Configuration du store de test
const createTestStore = () => {
  return configureStore({
    reducer: {
      [lebonmeepleApi.reducerPath]: lebonmeepleApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(lebonmeepleApi.middleware),
  });
};

// Composant wrapper pour les tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createTestStore();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
};

describe('Posts Page App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the PostsClientPage component successfully', () => {
    const MockedPostsClientPage = vi.mocked(PostsClientPage);

    render(
      <TestWrapper>
        <PostsPageApp />
      </TestWrapper>,
    );

    // Vérifie que le composant PostsClientPage est bien appelé
    expect(MockedPostsClientPage).toHaveBeenCalledTimes(1);
    // Vérifie que le composant est rendu dans le DOM
    expect(screen.getByTestId('posts-client-page')).toBeInTheDocument();
  });

  it('should be a functional component that returns JSX', () => {
    const result = PostsPageApp();

    // Vérifie que c'est une fonction qui retourne un élément JSX valide
    expect(typeof PostsPageApp).toBe('function');
    expect(React.isValidElement(result)).toBe(true);
  });
});
