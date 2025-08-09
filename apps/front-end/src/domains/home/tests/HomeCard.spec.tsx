// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import HomeCard from '../components/HomeCard';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';

// Mock Next.js Image component
vi.mock('@frontend/domains/shared/image/components/Image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} data-testid="image" />
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

describe('HomeCard Component', () => {
  it('should render and handle all text and image scenarios correctly', () => {
    const scenarios = [
      {
        text: 'Rejoignez la plus grosse communauté professionnelle de jeux de société',
        image: '/boardgame.jpg',
      },
      {
        text: 'Un autre texte pour tester',
        image: '/different-image.jpg',
      },
      {
        text: '',
        image: '/boardgame.jpg',
      },
      {
        text: 'Ceci est un très long texte qui devrait être affiché correctement dans la carte même si il contient beaucoup de mots et de caractères.',
        image: '/boardgame.jpg',
      },
    ];

    scenarios.forEach((props) => {
      const { unmount } = render(
        <TestWrapper>
          <HomeCard {...props} />
        </TestWrapper>,
      );

      // Test image rendering and attributes
      const imageElement = screen.getByTestId('image');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('alt', 'image jeux de société');
      expect(imageElement).toHaveAttribute('src', props.image);

      // Test text rendering and styling
      if (props.text) {
        const textElement = screen.getByText(props.text);
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveStyle({ fontSize: 'xl' });
      }

      unmount();
    });
  });
});
