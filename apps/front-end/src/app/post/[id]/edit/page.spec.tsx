import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import PostEditPageApp from './page';
import { lebonmeepleApi } from '@frontend/store/lebonmeepleApi';
import theme from '@frontend/ui/theme';

// Mock du domaine post
vi.mock('@frontend/domains/post/pages/PostEditPage', () => ({
  default: vi.fn(({ postId }) => (
    <div data-testid="post-edit-page" data-post-id={postId}>
      Mocked PostEditPage for post {postId}
    </div>
  )),
}));

// Import du composant mocké pour les types
import PostEditPage from '@frontend/domains/post/pages/PostEditPage';

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

describe('Post Edit Page App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render PostEditPage with parsed id', () => {
    const MockedPostEditPage = vi.mocked(PostEditPage);
    const params = { id: '123' };

    render(
      <TestWrapper>
        <PostEditPageApp params={params} />
      </TestWrapper>,
    );

    expect(MockedPostEditPage).toHaveBeenCalledWith({ postId: 123 }, {});
    expect(screen.getByTestId('post-edit-page')).toBeInTheDocument();
    expect(screen.getByTestId('post-edit-page')).toHaveAttribute(
      'data-post-id',
      '123',
    );
  });

  it('should handle different id formats correctly', () => {
    const MockedPostEditPage = vi.mocked(PostEditPage);
    const testCases = [
      { id: '0', expected: 0 },
      { id: '-1', expected: -1 },
      { id: '123.456', expected: 123 },
      { id: 'abc123', expected: NaN },
      { id: '', expected: NaN },
    ];

    testCases.forEach(({ id, expected }) => {
      MockedPostEditPage.mockClear();
      const params = { id };

      render(
        <TestWrapper>
          <PostEditPageApp params={params} />
        </TestWrapper>,
      );

      expect(MockedPostEditPage).toHaveBeenCalledWith({ postId: expected }, {});
    });
  });

  it('should return valid JSX element', () => {
    const params = { id: 'test-id' };
    const result = PostEditPageApp({ params });

    expect(React.isValidElement(result)).toBe(true);
    expect(typeof PostEditPageApp).toBe('function');
  });
});
