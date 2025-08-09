// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import Testimonial from '../components/Testimonial';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';

// Mock the testimonials data
vi.mock('@frontend/domains/home/data/data', () => ({
  testimonials: [
    {
      name: 'Marie Dubois',
      role: 'Game Designer',
      content: "LeBonMeeple m'a permis de partager mes créations.",
      avatar: '/defaultAvatar.jpg',
    },
    {
      name: 'Thomas Martin',
      role: 'Éditeur',
      content:
        'Une plateforme incontournable pour rester connecté avec la communauté.',
      avatar: '/defaultAvatar.jpg',
    },
    {
      name: 'Sophie Laurent',
      role: 'Influenceuse',
      content:
        "L'endroit parfait pour découvrir les nouveautés et partager ses passions.",
      avatar: '/defaultAvatar.jpg',
    },
  ],
}));

// Mock TestimonialCard component
vi.mock('./TestimonialCard', () => ({
  default: ({
    testimonial,
    index,
  }: {
    testimonial: {
      content: string;
      name: string;
      role: string;
      avatar: string;
    };
    index: number;
  }) => (
    <div data-testid={`testimonial-card-${index}`}>
      <div data-testid="testimonial-content">{testimonial.content}</div>
      <div data-testid="testimonial-name">{testimonial.name}</div>
      <div data-testid="testimonial-role">{testimonial.role}</div>
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

describe('Testimonial Component', () => {
  it('should render section headers and all testimonial data correctly', () => {
    render(
      <TestWrapper>
        <Testimonial />
      </TestWrapper>,
    );

    // Test section headers
    expect(screen.getByText('Témoignages')).toBeInTheDocument();
    expect(screen.getByText('Ce que disent nos membres')).toBeInTheDocument();

    // Test testimonial cards count and structure
    const testimonialCards = screen.getAllByTestId(/testimonial-card-/);
    expect(testimonialCards).toHaveLength(3);
    expect(screen.getByTestId('testimonial-card-0')).toBeInTheDocument();
    expect(screen.getByTestId('testimonial-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('testimonial-card-2')).toBeInTheDocument();

    // Test all testimonial contents
    expect(
      screen.getByText('"LeBonMeeple m\'a permis de partager mes créations."'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '"Une plateforme incontournable pour rester connecté avec la communauté."',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '"L\'endroit parfait pour découvrir les nouveautés et partager ses passions."',
      ),
    ).toBeInTheDocument();

    // Test all testimonial names
    expect(screen.getByText('Marie Dubois')).toBeInTheDocument();
    expect(screen.getByText('Thomas Martin')).toBeInTheDocument();
    expect(screen.getByText('Sophie Laurent')).toBeInTheDocument();

    // Test all testimonial roles
    expect(screen.getByText('Game Designer')).toBeInTheDocument();
    expect(screen.getByText('Éditeur')).toBeInTheDocument();
    expect(screen.getByText('Influenceuse')).toBeInTheDocument();

    // Test overall structure
    const allTestimonialContents = screen.getAllByTestId('testimonial-content');
    expect(allTestimonialContents).toHaveLength(3);
  });
});
