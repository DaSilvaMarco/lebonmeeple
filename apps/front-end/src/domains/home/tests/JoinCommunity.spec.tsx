// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import JoinCommunity from '../components/JoinCommunity';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';

// Mock CallToAction component
vi.mock('../components/CallToAction', () => ({
  default: () => (
    <div data-testid="call-to-action">Call To Action Component</div>
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

describe('JoinCommunity Component', () => {
  it('should conditionally render based on authentication status from Redux', () => {
    const { rerender, container } = render(
      <TestWrapper store={createTestStore({ isAuthenticated: false })}>
        <JoinCommunity />
      </TestWrapper>,
    );

    // Test unauthenticated state - should render all content
    expect(
      screen.getByText('Prêt à rejoindre la communauté ?'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Commencez votre aventure gaming professionnelle dès aujourd'hui et connectez-vous avec les meilleurs du secteur.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('call-to-action')).toBeInTheDocument();

    // Test authenticated state - should render empty
    rerender(
      <TestWrapper store={createTestStore({ isAuthenticated: true })}>
        <JoinCommunity />
      </TestWrapper>,
    );

    expect(
      screen.queryByText('Prêt à rejoindre la communauté ?'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Commencez votre aventure gaming professionnelle dès aujourd'hui et connectez-vous avec les meilleurs du secteur.",
      ),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('call-to-action')).not.toBeInTheDocument();
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
