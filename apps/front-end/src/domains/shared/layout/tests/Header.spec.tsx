import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../components/Header';
import { userSlice } from '@/domains/user/slice';
import theme from '@/ui/theme';

// Mock Next.js Link et navigation
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock des composants enfants avec test id pour accéder aux boutons
vi.mock('@/domains/shared/navigation/components/ResponsiveNav', () => ({
  default: () => <div data-testid="responsive-nav">ResponsiveNav</div>,
}));

vi.mock('../../navigation/components/Nav', () => ({
  default: () => <div data-testid="nav">Nav</div>,
}));

vi.mock('@/domains/shared/button/components/Button', () => ({
  default: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <button onClick={onClick} data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock localStorage
    const mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  it('should render and cover all paths', () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      roles: ['USER'],
    };

    // Test avec utilisateur authentifié
    const store = configureStore({
      reducer: {
        user: userSlice.reducer,
      },
      preloadedState: {
        user: {
          user: mockUser,
          token: 'fake-token',
          isAuthenticated: true,
          isLoading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Header />
        </ChakraProvider>
      </Provider>,
    );
  });

  it('should work with non-authenticated user', () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer,
      },
      preloadedState: {
        user: {
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Header />
        </ChakraProvider>
      </Provider>,
    );
  });
});
