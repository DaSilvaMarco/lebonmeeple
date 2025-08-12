// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import PostsHeader from '../components/PostsHeader';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  ),
}));

// Mock Button component
vi.mock('@/domains/shared/button/components/Button', () => ({
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <button data-testid="create-button" {...props}>
      {children}
    </button>
  ),
}));

// Helper function to create a mock store
const createMockStore = (userState: Partial<UserState> = {}) => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    preloadedState: {
      user: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ...userState,
      },
    },
  });
};

// Helper function to render component with providers
const renderWithProviders = (userState: Partial<UserState> = {}) => {
  const store = createMockStore(userState);
  return render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PostsHeader />
      </ChakraProvider>
    </Provider>,
  );
};

describe('PostsHeader', () => {
  it('should render correctly when user is not authenticated', () => {
    renderWithProviders({
      isAuthenticated: false,
      user: null,
    });

    // Verify basic rendering and layout
    const heading = screen.getByRole('heading', { name: 'Articles' });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent('Articles');

    // Verify no create button when not authenticated
    expect(screen.queryByTestId('create-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('next-link')).not.toBeInTheDocument();

    // Verify accessible structure
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('should render correctly when user is authenticated', () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      avatar: '/avatar.jpg',
      roles: ['USER'],
    };

    renderWithProviders({
      isAuthenticated: true,
      user: mockUser,
    });

    // Verify basic rendering
    expect(screen.getByText('Articles')).toBeInTheDocument();

    // Verify create button presence and properties
    const createButton = screen.getByTestId('create-button');
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveTextContent('Créer un article');
    expect(createButton).toHaveAttribute('color', 'primary');
    expect(createButton).toHaveAttribute('type', 'button');
    expect(createButton.tagName).toBe('BUTTON');

    // Verify link properties
    const link = screen.getByTestId('next-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/posts/create');

    // Verify accessibility
    expect(
      screen.getByRole('button', { name: 'Créer un article' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeVisible();

    // Verify layout with both elements present
    const heading = screen.getByText('Articles');
    const button = screen.getByTestId('create-button');
    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should handle authentication state changes and edge cases', () => {
    // Test with loading state
    const { unmount: unmount1 } = renderWithProviders({
      isAuthenticated: false,
      isLoading: true,
      user: null,
    });
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.queryByTestId('create-button')).not.toBeInTheDocument();

    // Clean up before next render
    unmount1();

    // Test state changes with rerender
    const { rerender, unmount: unmount2 } = renderWithProviders({
      isAuthenticated: false,
    });
    expect(screen.queryByTestId('create-button')).not.toBeInTheDocument();

    // Simulate authentication
    rerender(
      <Provider
        store={createMockStore({
          isAuthenticated: true,
          user: {
            id: 1,
            email: 'test@example.com',
            username: 'testuser',
            avatar: '/avatar.jpg',
            roles: ['USER'],
          },
        })}
      >
        <ChakraProvider theme={theme}>
          <PostsHeader />
        </ChakraProvider>
      </Provider>,
    );
    expect(screen.getByTestId('create-button')).toBeInTheDocument();

    // Clean up before next render
    unmount2();

    // Test with user but no authentication
    const { unmount } = renderWithProviders({
      isAuthenticated: false,
      user: {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        avatar: '/avatar.jpg',
        roles: ['USER'],
      },
    });
    expect(screen.queryByTestId('create-button')).not.toBeInTheDocument();

    // Test graceful unmounting
    expect(() => unmount()).not.toThrow();

    // Test with real Redux store
    const store = configureStore({
      reducer: {
        user: userSlice.reducer,
      },
    });
    const unmount3 = render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <PostsHeader />
        </ChakraProvider>
      </Provider>,
    ).unmount;
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.queryByTestId('create-button')).not.toBeInTheDocument();

    // Cleanup before next render
    unmount3();

    // Test with minimal theme
    const minimalTheme = {};
    const unmount4 = render(
      <Provider store={createMockStore()}>
        <ChakraProvider theme={minimalTheme}>
          <PostsHeader />
        </ChakraProvider>
      </Provider>,
    ).unmount;
    expect(screen.getByText('Articles')).toBeInTheDocument();

    // Cleanup before next render
    unmount4();

    // Test error handling with incomplete store
    const incompleteStore = configureStore({
      reducer: {
        user: (state = {}) => state,
      },
    });
    expect(() => {
      render(
        <Provider store={incompleteStore}>
          <ChakraProvider theme={theme}>
            <PostsHeader />
          </ChakraProvider>
        </Provider>,
      );
    }).not.toThrow();

    // Test error handling with missing user slice
    const emptyStore = configureStore({
      reducer: {
        other: (state = {}) => state,
      },
    });
    expect(() => {
      render(
        <Provider store={emptyStore}>
          <ChakraProvider theme={theme}>
            <PostsHeader />
          </ChakraProvider>
        </Provider>,
      );
    }).toThrow();
  });
});
