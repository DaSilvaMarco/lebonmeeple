import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import App from './page';
import { lebonmeepleApi } from '@frontend/store/lebonmeepleApi';
import theme from '@frontend/ui/theme';

// Mock du domaine user
vi.mock('@frontend/domains/user/pages/ProfilePage', () => ({
  default: vi.fn(() => (
    <div data-testid="profile-page">Mocked ProfilePage</div>
  )),
}));

// Import du composant mocké pour les types
import ProfilePage from '@frontend/domains/user/pages/ProfilePage';

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

describe('Profile Page App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render ProfilePage component', () => {
    const MockedProfilePage = vi.mocked(ProfilePage);

    render(
      <TestWrapper>
        <App />
      </TestWrapper>,
    );

    expect(MockedProfilePage).toHaveBeenCalledWith({}, {});
    expect(screen.getByTestId('profile-page')).toBeInTheDocument();
  });

  it('should return valid JSX element', () => {
    const result = App();

    expect(React.isValidElement(result)).toBe(true);
    expect(typeof App).toBe('function');
  });
});
