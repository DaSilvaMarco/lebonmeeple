// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import TestimonialCard from '../components/TestimonialCard';
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

describe('TestimonialCard Component', () => {
  it('should render and handle all testimonial data scenarios correctly', () => {
    const scenarios = [
      {
        testimonial: {
          content: "LeBonMeeple m'a permis de partager mes créations.",
          avatar: '/defaultAvatar.jpg',
          name: 'Marie Dubois',
          role: 'Game Designer',
        },
        index: 0,
        expectedContent: '"LeBonMeeple m\'a permis de partager mes créations."',
      },
      {
        testimonial: {
          content: 'Une plateforme incontournable pour rester connecté.',
          avatar: '/custom-avatar.jpg',
          name: 'Thomas Martin',
          role: 'Éditeur',
        },
        index: 1,
        expectedContent:
          '"Une plateforme incontournable pour rester connecté."',
      },
      {
        testimonial: {
          content: '',
          avatar: '/defaultAvatar.jpg',
          name: 'Test User',
          role: 'Test Role',
        },
        index: 2,
        expectedContent: '""',
      },
      {
        testimonial: {
          content: 'Test content',
          avatar: '/defaultAvatar.jpg',
          name: '',
          role: 'Test Role',
        },
        index: 3,
        expectedContent: '"Test content"',
      },
      {
        testimonial: {
          content: 'Test content',
          avatar: '/defaultAvatar.jpg',
          name: 'Test User',
          role: '',
        },
        index: 4,
        expectedContent: '"Test content"',
      },
    ];

    scenarios.forEach(({ testimonial, index, expectedContent }) => {
      const { unmount } = render(
        <TestWrapper>
          <TestimonialCard testimonial={testimonial} index={index} />
        </TestWrapper>,
      );

      // Test content with quotes
      expect(screen.getByText(expectedContent)).toBeInTheDocument();

      // Test name rendering (if not empty)
      if (testimonial.name) {
        expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      }

      // Test role rendering (if not empty)
      if (testimonial.role) {
        expect(screen.getByText(testimonial.role)).toBeInTheDocument();
      }

      unmount();
    });
  });
});
