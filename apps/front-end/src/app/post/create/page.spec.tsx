import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import PostCreatePageApp from './page';
import { lebonmeepleApi } from '@frontend/store/lebonmeepleApi';
import theme from '@frontend/ui/theme';

// Mock du domaine post
vi.mock('@frontend/domains/post/pages/PostCreatePage', () => ({
  default: vi.fn(() => (
    <div data-testid="post-create-page">Mocked PostCreatePage</div>
  )),
}));

// Import du composant mocké pour les types
import PostCreatePage from '@frontend/domains/post/pages/PostCreatePage';

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

describe('Post Create Page App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render PostCreatePage component', () => {
    const MockedPostCreatePage = vi.mocked(PostCreatePage);

    render(
      <TestWrapper>
        <PostCreatePageApp />
      </TestWrapper>,
    );

    expect(MockedPostCreatePage).toHaveBeenCalledWith({}, {});
    expect(screen.getByTestId('post-create-page')).toBeInTheDocument();
  });

  it('should return valid JSX element', () => {
    const result = PostCreatePageApp();

    expect(React.isValidElement(result)).toBe(true);
    expect(typeof PostCreatePageApp).toBe('function');
  });
});
