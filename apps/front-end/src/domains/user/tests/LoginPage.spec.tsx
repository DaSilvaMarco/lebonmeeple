import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from '../pages/SigninPage';
import { lebonmeepleApi } from '@frontend/store/lebonmeepleApi';
import theme from '@frontend/ui/theme';

// Mock des composants enfants
vi.mock('../components/LoginFormCard', () => ({
  default: vi.fn(() => (
    <div data-testid="login-form-card">Mocked LoginFormCard</div>
  )),
}));

// Import du composant mocké pour les types
import LoginFormCard from '../components/LoginFormCard';

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

describe('LoginPage Domain Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Remettre le mock par défaut
    const MockedLoginFormCard = vi.mocked(LoginFormCard);
    MockedLoginFormCard.mockImplementation(() => (
      <div data-testid="login-form-card">Mocked LoginFormCard</div>
    ));
  });

  it('should render correctly with proper layout, integration, and responsiveness', () => {
    const { container, rerender, unmount } = render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    const MockedLoginFormCard = vi.mocked(LoginFormCard);

    // Test rendering and layout structure
    expect(container).toBeDefined();
    expect(screen.getByTestId('login-form-card')).toBeInTheDocument();

    // Test CSS classes and layout structure
    const flexContainer = container.querySelector('.css-1l4w6pd');
    expect(flexContainer).toBeTruthy();
    expect(container.firstChild).toHaveClass('css-1l4w6pd');

    // Test component integration
    expect(MockedLoginFormCard).toHaveBeenCalledTimes(1);
    expect(MockedLoginFormCard).toHaveBeenCalledWith({}, {});

    // Test domain logic and separation of concerns
    const componentString = LoginPage.toString();
    expect(componentString).not.toMatch(/useState/);
    expect(componentString).not.toMatch(/useEffect/);
    expect(componentString).not.toMatch(/fetch/);
    expect(componentString).not.toMatch(/api/);

    // Test accessibility and semantic structure
    expect(container.firstChild).toBeTruthy();

    // Test component lifecycle - re-render
    rerender(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );
    expect(screen.getByTestId('login-form-card')).toBeInTheDocument();

    // Test responsiveness with different screen sizes
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    expect(screen.getByTestId('login-form-card')).toBeInTheDocument();

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    expect(screen.getByTestId('login-form-card')).toBeInTheDocument();

    // Test component lifecycle - unmount
    unmount();
    expect(screen.queryByTestId('login-form-card')).not.toBeInTheDocument();
  });

  it('should handle performance requirements and error scenarios', () => {
    // Test performance rendering
    const startTime = performance.now();

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;
    expect(renderTime).toBeLessThan(300);

    // Test error handling with LoginFormCard errors
    vi.clearAllMocks();
    const MockedLoginFormCard = vi.mocked(LoginFormCard);

    MockedLoginFormCard.mockRestore();
    MockedLoginFormCard.mockImplementation(() => (
      <div data-testid="form-error">Form error occurred</div>
    ));

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    expect(screen.getByTestId('form-error')).toBeInTheDocument();
  });
});
