// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import WhyLeBonMeeple from '../components/WhyLeBonMeeple';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';

// Mock the features data
vi.mock('@frontend/domains/home/data/data', () => ({
  features: [
    {
      icon: vi.fn(),
      title: 'Communauté de Passionnés',
      description: 'Rejoignez LA communauté de jeux de société',
    },
    {
      icon: vi.fn(),
      title: 'Expertise',
      description:
        'Suivez vos éditeurs préférés à travers des articles et des interviews',
    },
    {
      icon: vi.fn(),
      title: 'Contenu Premium',
      description: 'Créez et partagez des articles de qualité',
    },
    {
      icon: vi.fn(),
      title: 'Suivez les tendances',
      description: 'Suivez les dernières sorties du jeu de société',
    },
  ],
}));

// Mock Features component
vi.mock('@frontend/domains/home/components/Features', () => ({
  default: ({
    feature,
  }: {
    feature: { title: string; description: string; icon: React.ElementType };
  }) => (
    <div
      data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div data-testid="feature-title">{feature.title}</div>
      <div data-testid="feature-description">{feature.description}</div>
    </div>
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

describe('WhyLeBonMeeple Component', () => {
  it('should render section headers and all feature data correctly', () => {
    render(
      <TestWrapper>
        <WhyLeBonMeeple />
      </TestWrapper>,
    );

    // Test section headers
    expect(
      screen.getByText('Pourquoi Choisir LeBonMeeple'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Une Plateforme pensée pour les passionnés'),
    ).toBeInTheDocument();

    // Test feature components and structure
    expect(
      screen.getByTestId('feature-communauté-de-passionnés'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('feature-expertise')).toBeInTheDocument();
    expect(screen.getByTestId('feature-contenu-premium')).toBeInTheDocument();
    expect(
      screen.getByTestId('feature-suivez-les-tendances'),
    ).toBeInTheDocument();

    // Test all feature titles
    expect(screen.getByText('Communauté de Passionnés')).toBeInTheDocument();
    expect(screen.getByText('Expertise')).toBeInTheDocument();
    expect(screen.getByText('Contenu Premium')).toBeInTheDocument();
    expect(screen.getByText('Suivez les tendances')).toBeInTheDocument();

    // Test all feature descriptions
    expect(
      screen.getByText('Rejoignez LA communauté de jeux de société'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Suivez vos éditeurs préférés à travers des articles et des interviews',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Créez et partagez des articles de qualité'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Suivez les dernières sorties du jeu de société'),
    ).toBeInTheDocument();

    // Test overall structure and count
    const featureTitles = screen.getAllByTestId('feature-title');
    expect(featureTitles).toHaveLength(4);
    const featureDescriptions = screen.getAllByTestId('feature-description');
    expect(featureDescriptions).toHaveLength(4);
  });
});
