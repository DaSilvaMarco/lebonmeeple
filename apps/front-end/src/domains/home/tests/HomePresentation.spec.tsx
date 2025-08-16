// import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import HomePresentation from '../components/HomePresentation';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';

// Mock Next.js Image component
vi.mock('@frontend/domains/shared/image/components/Image', () => ({
  default: ({
    alt,
    src,
    fill,
    objectFit,
    sizes,
    style,
    className,
  }: {
    alt: string;
    src: string;
    fill?: boolean;
    objectFit?: string;
    sizes?: string;
    style?: React.CSSProperties;
    className?: string;
  }) => (
    <img
      alt={alt}
      src={src}
      data-testid="image"
      data-fill={fill}
      data-object-fit={objectFit}
      data-sizes={sizes}
      style={style}
      className={className}
    />
  ),
}));

// Mock HomeHeader component
vi.mock('./HomeHeader', () => ({
  default: ({ isAuthenticated }: { isAuthenticated: boolean }) => (
    <div data-testid="home-header" data-authenticated={isAuthenticated}>
      Home Header Component
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

describe('HomePresentation Component', () => {
  it('should render all static elements with correct properties', () => {
    render(
      <TestWrapper>
        <HomePresentation />
      </TestWrapper>,
    );

    // Test HomeHeader presence
    expect(screen.getByTestId('home-header')).toBeInTheDocument();

    // Test image and its properties
    const imageElement = screen.getByTestId('image');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '/boardgame3.jpg');
    expect(imageElement).toHaveAttribute('data-fill', 'true');
    expect(imageElement).toHaveAttribute('data-object-fit', 'cover');
    expect(imageElement).toHaveAttribute('data-sizes', 'max-width: 600px');
    expect(imageElement).toHaveClass('hover:scale-105');
    expect(imageElement).toHaveStyle({ transition: 'transform 0.3s ease' });

    // Test rating badge (always present)
    expect(screen.getByText('4.9/5')).toBeInTheDocument();
  });

  it('should pass correct authentication status to HomeHeader based on Redux state', () => {
    const { rerender } = render(
      <TestWrapper store={createTestStore({ isAuthenticated: false })}>
        <HomePresentation />
      </TestWrapper>,
    );

    // Test unauthenticated state
    expect(screen.getByTestId('home-header')).toHaveAttribute(
      'data-authenticated',
      'false',
    );
    expect(screen.getByText('4.9/5')).toBeInTheDocument(); // Rating always present

    // Test authenticated state
    rerender(
      <TestWrapper store={createTestStore({ isAuthenticated: true })}>
        <HomePresentation />
      </TestWrapper>,
    );

    expect(screen.getByTestId('home-header')).toHaveAttribute(
      'data-authenticated',
      'true',
    );
    expect(screen.getByText('4.9/5')).toBeInTheDocument(); // Rating still present
  });
});
