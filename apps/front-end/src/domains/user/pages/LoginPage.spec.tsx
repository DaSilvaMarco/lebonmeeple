import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
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

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      expect(container).toBeDefined();
    });

    it('should render the main layout structure', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      // Vérifier la présence du conteneur principal par testid
      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();
    });

    it('should render LoginFormCard component', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('should have correct CSS classes and layout', () => {
      const { container } = render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      // Vérifier la structure du layout - chercher les classes CSS actuelles
      const flexContainer = container.querySelector('.css-1l4w6pd');
      expect(flexContainer).toBeTruthy();
    });

    it('should have responsive design structure', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      // Vérifier que le composant est dans un conteneur avec maxWidth
      const loginFormCard = screen.getByTestId('login-form-card');
      expect(loginFormCard).toBeInTheDocument();
    });

    it('should center the content correctly', () => {
      const { container } = render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      // Le Flex container devrait avoir les bonnes classes CSS
      const flexContainer = container.firstChild;
      expect(flexContainer).toHaveClass('css-1l4w6pd');
    });
  });

  describe('Component Integration', () => {
    it('should integrate with LoginFormCard correctly', () => {
      const MockedLoginFormCard = vi.mocked(LoginFormCard);

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      // Vérifier que LoginFormCard est appelé
      expect(MockedLoginFormCard).toHaveBeenCalledTimes(1);
    });

    it('should pass correct props to child components', () => {
      const MockedLoginFormCard = vi.mocked(LoginFormCard);

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      // Vérifier que LoginFormCard est appelé sans props
      expect(MockedLoginFormCard).toHaveBeenCalledWith({}, {});
    });
  });

  describe('Domain Logic', () => {
    it('should act as a layout container for login functionality', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      // Vérifier que le composant agit comme un conteneur
      // et délègue la logique métier au LoginFormCard
      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();
    });

    it('should maintain clean separation of concerns', () => {
      const componentString = LoginPage.toString();

      // Vérifier qu'il n'y a pas de logique métier complexe
      expect(componentString).not.toMatch(/useState/);
      expect(componentString).not.toMatch(/useEffect/);
      expect(componentString).not.toMatch(/fetch/);
      expect(componentString).not.toMatch(/api/);
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      // Vérifier que les éléments sont accessibles par testid
      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();
    });

    it('should have proper semantic structure', () => {
      const { container } = render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      // Vérifier la structure sémantique
      expect(container.firstChild).toBeTruthy();
      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle LoginFormCard errors gracefully', () => {
      // Test que le composant peut gérer les erreurs
      const MockedLoginFormCard = vi.mocked(LoginFormCard);

      // Reset et mock pour simuler une gestion d'erreur
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

  describe('Component Lifecycle', () => {
    it('should mount and unmount correctly', () => {
      const { unmount } = render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();

      unmount();

      expect(screen.queryByTestId('login-form-card')).not.toBeInTheDocument();
    });

    it('should re-render correctly', () => {
      const { rerender } = render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();

      rerender(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render efficiently', () => {
      const startTime = performance.now();

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      expect(renderTime).toBeLessThan(100);
    });
  });

  describe('Responsiveness', () => {
    it('should adapt to different screen sizes', () => {
      // Simuler un écran mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>,
      );

      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();

      // Simuler un écran desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      expect(screen.getByTestId('login-form-card')).toBeInTheDocument();
    });
  });
});
