import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import SignupPageApp from './page';
import { lebonmeepleApi } from '@frontend/store/lebonmeepleApi';
import theme from '@frontend/ui/theme';

// Mock du domaine user
vi.mock('@frontend/domains/user/pages/SignupPage', () => ({
  default: vi.fn(() => <div data-testid="signup-page">Mocked SignupPage</div>),
}));

// Import du composant mocké pour les types
import SignupPage from '@frontend/domains/user/pages/SignupPage';

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

describe('Signup Page App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const MockedSignupPage = vi.mocked(SignupPage);
    MockedSignupPage.mockImplementation(() => (
      <div data-testid="signup-page">Mocked SignupPage</div>
    ));
  });

  it('should render SignupPage and delegate all functionality to domain layer', () => {
    const MockedSignupPage = vi.mocked(SignupPage);

    render(
      <TestWrapper>
        <SignupPageApp />
      </TestWrapper>,
    );

    // Vérifier que le composant rend SignupPage
    expect(screen.getByTestId('signup-page')).toBeInTheDocument();

    // Vérifier la délégation au domaine
    expect(MockedSignupPage).toHaveBeenCalledTimes(1);
    expect(MockedSignupPage).toHaveBeenCalledWith({}, {});
  });

  it('should be a simple wrapper component without business logic', () => {
    const componentCode = SignupPageApp.toString();

    // Vérifier que c'est un simple wrapper
    expect(typeof SignupPageApp).toBe('function');
    expect(SignupPageApp.name).toBe('SignupForm');
    expect(SignupPageApp.length).toBe(0); // Aucun paramètre

    // Pas de logique métier complexe - éviter les mots qui peuvent apparaître dans les imports transpilés
    expect(componentCode).not.toMatch(
      /useState|useEffect|validation|submit|register/i,
    );
    expect(componentCode).not.toMatch(/if\s*\(|switch|for\s*\(|while\s*\(/);
  });

  it('should work as a valid React component and handle lifecycle correctly', () => {
    // Test du rendu direct
    const result = SignupPageApp();
    expect(React.isValidElement(result)).toBe(true);

    // Test du cycle de vie complet
    const { unmount, rerender } = render(
      <TestWrapper>
        <SignupPageApp />
      </TestWrapper>,
    );

    expect(screen.getByTestId('signup-page')).toBeInTheDocument();

    // Test du re-render
    rerender(
      <TestWrapper>
        <SignupPageApp />
      </TestWrapper>,
    );
    expect(screen.getByTestId('signup-page')).toBeInTheDocument();

    // Test de l'unmount
    unmount();
    expect(screen.queryByTestId('signup-page')).not.toBeInTheDocument();
  });
});
