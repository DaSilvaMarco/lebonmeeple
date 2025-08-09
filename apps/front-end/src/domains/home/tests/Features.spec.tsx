// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import Features from '../components/Features';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';
import { FaGamepad } from 'react-icons/fa';

// Store configuration
const createTestStore = (initialUserState: Partial<UserState> = {}) => {
  return configureStore({
    reducer: { user: userSlice.reducer },
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

describe('Features Component', () => {
  const defaultFeature = {
    icon: FaGamepad,
    title: 'Expertise',
    description:
      'Suivez vos éditeurs préférés à travers des articles et des interviews',
  };

  it('should render feature content and handle different props scenarios', () => {
    // Test rendu de base avec toutes les props
    render(
      <TestWrapper>
        <Features feature={defaultFeature} />
      </TestWrapper>,
    );

    expect(screen.getByText('Expertise')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Suivez vos éditeurs préférés à travers des articles et des interviews',
      ),
    ).toBeInTheDocument();

    // Test avec des données de feature différentes
    const customFeature = {
      icon: FaGamepad,
      title: 'Communauté',
      description: 'Rejoignez une communauté de passionnés',
    };

    render(
      <TestWrapper>
        <Features feature={customFeature} />
      </TestWrapper>,
    );

    expect(screen.getByText('Communauté')).toBeInTheDocument();
    expect(
      screen.getByText('Rejoignez une communauté de passionnés'),
    ).toBeInTheDocument();

    // Test avec titre vide
    const featureWithEmptyTitle = {
      icon: FaGamepad,
      title: '',
      description: 'Description test',
    };

    render(
      <TestWrapper>
        <Features feature={featureWithEmptyTitle} />
      </TestWrapper>,
    );

    expect(screen.getByText('Description test')).toBeInTheDocument();

    // Test avec description vide
    const featureWithEmptyDescription = {
      icon: FaGamepad,
      title: 'Titre test',
      description: '',
    };

    render(
      <TestWrapper>
        <Features feature={featureWithEmptyDescription} />
      </TestWrapper>,
    );

    expect(screen.getByText('Titre test')).toBeInTheDocument();
  });
});
