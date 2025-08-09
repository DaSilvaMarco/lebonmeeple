import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import ProfileEditPageApp from './page';
import { lebonmeepleApi } from '@frontend/store/lebonmeepleApi';
import theme from '@frontend/ui/theme';

// Mock du domaine user
vi.mock('@frontend/domains/user/pages/ProfileEditPage', () => ({
  default: vi.fn(() => (
    <div data-testid="profile-edit-page">Mocked ProfileEditPage</div>
  )),
}));

// Import du composant mocké pour les types
import ProfileEditPage from '@frontend/domains/user/pages/ProfileEditPage';

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

describe('Profile Edit Page App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const MockedProfileEditPage = vi.mocked(ProfileEditPage);
    MockedProfileEditPage.mockImplementation(() => (
      <div data-testid="profile-edit-page">Mocked ProfileEditPage</div>
    ));
  });

  it('should render ProfileEditPage and delegate all functionality to domain layer', () => {
    const MockedProfileEditPage = vi.mocked(ProfileEditPage);

    render(
      <TestWrapper>
        <ProfileEditPageApp />
      </TestWrapper>,
    );

    // Vérifier que le composant rend ProfileEditPage
    expect(screen.getByTestId('profile-edit-page')).toBeInTheDocument();

    // Vérifier la délégation au domaine
    expect(MockedProfileEditPage).toHaveBeenCalledTimes(1);
    expect(MockedProfileEditPage).toHaveBeenCalledWith({}, {});
  });

  it('should be a simple wrapper component without business logic', () => {
    const componentCode = ProfileEditPageApp.toString();

    // Vérifier que c'est un simple wrapper
    expect(typeof ProfileEditPageApp).toBe('function');
    expect(ProfileEditPageApp.name).toBe('App');
    expect(ProfileEditPageApp.length).toBe(0); // Aucun paramètre

    // Pas de logique métier complexe
    expect(componentCode).not.toMatch(
      /useState|useEffect|api|fetch|validation|submit/i,
    );
    expect(componentCode).not.toMatch(/if\s*\(|switch|for\s*\(|while\s*\(/);
  });

  it('should work as a valid React component and handle lifecycle correctly', () => {
    // Test du rendu direct
    const result = ProfileEditPageApp();
    expect(React.isValidElement(result)).toBe(true);

    // Test du cycle de vie complet
    const { unmount, rerender } = render(
      <TestWrapper>
        <ProfileEditPageApp />
      </TestWrapper>,
    );

    expect(screen.getByTestId('profile-edit-page')).toBeInTheDocument();

    // Test du re-render
    rerender(
      <TestWrapper>
        <ProfileEditPageApp />
      </TestWrapper>,
    );
    expect(screen.getByTestId('profile-edit-page')).toBeInTheDocument();

    // Test de l'unmount
    unmount();
    expect(screen.queryByTestId('profile-edit-page')).not.toBeInTheDocument();
  });
});
