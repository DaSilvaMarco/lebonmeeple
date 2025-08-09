import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import CallToAction from '../components/CallToAction';
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
    <a href={href} data-testid={`link-${href}`}>
      {children}
    </a>
  ),
}));

// Mock Button component
vi.mock('@frontend/domains/shared/button/components/Button', () => ({
  default: ({
    children,
    color,
    type,
    icon,
  }: {
    children: React.ReactNode;
    color: string;
    type: string;
    icon: React.ReactNode;
  }) => (
    <button
      data-testid={`button-${color}`}
      type={type as 'submit' | 'reset' | 'button'}
    >
      {icon}
      {children}
    </button>
  ),
}));

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

describe('CallToAction Component', () => {
  it('should render complete call-to-action structure with correct elements and attributes', () => {
    render(
      <TestWrapper>
        <CallToAction />
      </TestWrapper>,
    );

    // Vérification des textes des boutons
    expect(screen.getByText("S'inscrire")).toBeInTheDocument();
    expect(screen.getByText('Se connecter')).toBeInTheDocument();

    // Vérification des boutons avec leurs propriétés
    const signupButton = screen.getByTestId('button-secondary');
    const loginButton = screen.getByTestId('button-primary');

    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toHaveAttribute('type', 'button');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('type', 'button');

    // Vérification des liens avec leurs attributs href
    const signupLink = screen.getByTestId('link-/signup');
    const loginLink = screen.getByTestId('link-/login');

    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/signup');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');

    // Vérification de la structure complète (tous les éléments sont cliquables)
    expect(signupButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
