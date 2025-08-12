import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import LoginPageApp from './page';
import { lebonmeepleApi } from '@frontend/store/lebonmeepleApi';
import theme from '@frontend/ui/theme';

// Mock du domaine user
vi.mock('@frontend/domains/user/pages/SigninPage', () => ({
  default: vi.fn(() => <div data-testid="login-page">Mocked SigninPage</div>),
}));

// Import du composant mocké pour les types
import SigninPage from '@frontend/domains/user/pages/SigninPage';

// Configuration du store de test
// Mock user reducer to provide isLoading property
const mockUserReducer = (state = { isLoading: false }) => state;

const createTestStore = () => {
  return configureStore({
    reducer: {
      [lebonmeepleApi.reducerPath]: lebonmeepleApi.reducer,
      user: mockUserReducer,
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

describe('Login Page App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the SigninPage component successfully', () => {
    const MockedSigninPage = vi.mocked(SigninPage);

    render(
      <TestWrapper>
        <LoginPageApp />
      </TestWrapper>,
    );

    // Vérifie que le composant SigninPage est bien appelé
    expect(MockedSigninPage).toHaveBeenCalled();
    // Vérifie que le composant est rendu dans le DOM
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should be a functional component that returns JSX', () => {
    const result = LoginPageApp();

    // Vérifie que c'est une fonction qui retourne un élément JSX valide
    expect(typeof LoginPageApp).toBe('function');
    expect(React.isValidElement(result)).toBe(true);
  });
});
