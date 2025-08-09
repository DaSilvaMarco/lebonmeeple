// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import HomeHeader from '../components/HomeHeader';
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

// Mock StatsCard component
vi.mock('./StatsCard', () => ({
  default: ({
    value,
    title,
    color,
  }: {
    value: string;
    title: string;
    color: string;
  }) => (
    <div data-testid="stats-card" data-color={color}>
      <span data-testid="stats-value">{value}</span>
      <span data-testid="stats-title">{title}</span>
    </div>
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
    reducer: {
      user: userSlice.reducer,
    },
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

describe('HomeHeader Component', () => {
  it('should render all branding elements and stats consistently', () => {
    render(
      <TestWrapper>
        <HomeHeader isAuthenticated={false} />
      </TestWrapper>,
    );

    // Test branding elements
    expect(screen.getByText('Le Blog Gaming de Référence')).toBeInTheDocument();
    expect(screen.getByText('LeBonMeeple')).toBeInTheDocument();
    expect(
      screen.getByText(
        'La plateforme dédiée aux jeux de société. Connectez-vous et partagez !',
      ),
    ).toBeInTheDocument();

    // Test stats cards (always present)
    const statsCards = screen.getAllByTestId('stats-card');
    expect(statsCards).toHaveLength(3);
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('1200+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Membres Actifs')).toBeInTheDocument();
    expect(screen.getByText('Articles publiés')).toBeInTheDocument();
    expect(screen.getByText('Éditeurs partenaires')).toBeInTheDocument();
  });

  it('should render different buttons and links based on authentication status', () => {
    const { rerender } = render(
      <TestWrapper>
        <HomeHeader isAuthenticated={false} />
      </TestWrapper>,
    );

    // Test unauthenticated state
    expect(screen.getByText('Rejoindre la communauté')).toBeInTheDocument();
    expect(screen.getByText('Se connecter')).toBeInTheDocument();
    expect(screen.getByTestId('link-/signup')).toBeInTheDocument();
    expect(screen.getByTestId('link-/login')).toBeInTheDocument();
    expect(screen.getByTestId('button-secondary')).toBeInTheDocument();
    expect(screen.getByTestId('button-primary')).toBeInTheDocument();

    // Test authenticated state
    rerender(
      <TestWrapper>
        <HomeHeader isAuthenticated={true} />
      </TestWrapper>,
    );

    expect(screen.getByText('Explorer les Articles')).toBeInTheDocument();
    expect(screen.getByText('Créer un article')).toBeInTheDocument();
    expect(screen.getByTestId('link-/blog')).toBeInTheDocument();
    expect(screen.getByTestId('link-/blog/create')).toBeInTheDocument();
    expect(
      screen.queryByText('Rejoindre la communauté'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Se connecter')).not.toBeInTheDocument();

    // Verify branding and stats are still present when authenticated
    expect(screen.getByText('Le Blog Gaming de Référence')).toBeInTheDocument();
    expect(screen.getByText('LeBonMeeple')).toBeInTheDocument();
    expect(screen.getAllByTestId('stats-card')).toHaveLength(3);
  });
});
