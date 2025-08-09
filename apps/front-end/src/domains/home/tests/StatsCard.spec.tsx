// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import StatsCard from '../components/StatsCard';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';

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

describe('StatsCard Component', () => {
  it('should render with valid props correctly', () => {
    const props = {
      value: '1000+',
      title: 'Membres Actifs',
      color: 'primary.500',
    };

    render(
      <TestWrapper>
        <StatsCard {...props} />
      </TestWrapper>,
    );

    // Test value rendering
    expect(screen.getByText('1000+')).toBeInTheDocument();

    // Test title rendering
    expect(screen.getByText('Membres Actifs')).toBeInTheDocument();

    // Test that the component structure exists
    expect(screen.getByTestId('stats-card')).toBeInTheDocument();
  });

  it('should render with different values', () => {
    const props = {
      value: '50',
      title: 'Articles',
      color: 'secondary.500',
    };

    render(
      <TestWrapper>
        <StatsCard {...props} />
      </TestWrapper>,
    );

    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Articles')).toBeInTheDocument();
  });

  it('should render with empty values', () => {
    const props = {
      value: '',
      title: '',
      color: 'primary.500',
    };

    render(
      <TestWrapper>
        <StatsCard {...props} />
      </TestWrapper>,
    );

    // Test that the component structure exists even with empty values
    expect(screen.getByTestId('stats-card')).toBeInTheDocument();
  });
});
