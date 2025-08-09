import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import PageLayout from '../components/PageLayout';
import { userSlice } from '@/domains/user/slice';
import theme from '@/ui/theme';

// Mock des composants Header et Footer
vi.mock('../components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('../components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    preloadedState: {
      user: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      },
    },
  });

  return render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>{component}</ChakraProvider>
    </Provider>,
  );
};

describe('PageLayout', () => {
  it('should render header, footer and children correctly', () => {
    const testContent = 'Test Content';

    renderWithProviders(
      <PageLayout>
        <div data-testid="content">{testContent}</div>
      </PageLayout>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});
