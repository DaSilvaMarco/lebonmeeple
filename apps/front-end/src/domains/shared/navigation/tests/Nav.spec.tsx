import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import Nav from '../components/Nav';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} data-testid={`link-${href}`} {...props}>
      {children}
    </a>
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

describe('Nav Component', () => {
  it('should render navigation for unauthenticated user', () => {
    render(
      <TestWrapper store={createTestStore({ isAuthenticated: false })}>
        <Nav />
      </TestWrapper>,
    );

    // Vérifie que les liens de base sont présents
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('Voir tous les articles')).toBeInTheDocument();

    // Vérifie que le profil n'est pas affiché pour un utilisateur non authentifié
    expect(screen.queryByText('Profil')).not.toBeInTheDocument();
    expect(screen.queryByText('Écrire un article')).not.toBeInTheDocument();
  });

  it('should render navigation for authenticated user', () => {
    render(
      <TestWrapper
        store={createTestStore({
          isAuthenticated: true,
          user: { id: 1, username: 'testuser', email: 'test@example.com' },
        })}
      >
        <Nav />
      </TestWrapper>,
    );

    // Vérifie que tous les liens sont présents pour un utilisateur authentifié
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('Voir tous les articles')).toBeInTheDocument();
    expect(screen.getByText('Écrire un article')).toBeInTheDocument();
    expect(screen.getByText('Profil')).toBeInTheDocument();
  });

  it('should show dropdown menu when Articles button is clicked', () => {
    render(
      <TestWrapper store={createTestStore({ isAuthenticated: true })}>
        <Nav />
      </TestWrapper>,
    );

    const articlesButton = screen.getByText('Articles');
    fireEvent.click(articlesButton);

    // Le menu dropdown devrait être visible
    expect(screen.getByText('Voir tous les articles')).toBeInTheDocument();
    expect(screen.getByText('Écrire un article')).toBeInTheDocument();
  });

  it('should handle authentication state changes', () => {
    const { rerender } = render(
      <TestWrapper store={createTestStore({ isAuthenticated: false })}>
        <Nav />
      </TestWrapper>,
    );

    // État non authentifié
    expect(screen.queryByText('Profil')).not.toBeInTheDocument();
    expect(screen.queryByText('Écrire un article')).not.toBeInTheDocument();

    // Changement vers état authentifié
    rerender(
      <TestWrapper
        store={createTestStore({
          isAuthenticated: true,
          user: { id: 1, username: 'testuser', email: 'test@example.com' },
        })}
      >
        <Nav />
      </TestWrapper>,
    );

    expect(screen.getByText('Profil')).toBeInTheDocument();
    expect(screen.getByText('Écrire un article')).toBeInTheDocument();
  });
});
