import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import PostCreatePage from '../pages/PostCreatePage';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { User } from '@frontend/domains/user/type';

// Mock the child components
vi.mock('@frontend/domains/shared/warning/NotConnected', () => ({
  default: () => <div data-testid="not-connected">Not Connected Component</div>,
}));

vi.mock('../components/PostCreateFormCard', () => ({
  default: () => (
    <div data-testid="post-create-form-card">Post Create Form Card</div>
  ),
}));

// Mock data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  avatar: '/defaultAvatar.jpg',
  roles: ['USER'],
};

const renderComponent = (
  isAuthenticated: boolean,
  user: User | null = null,
) => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    preloadedState: {
      user: {
        user,
        token: isAuthenticated ? 'fake-token' : null,
        isAuthenticated,
        isLoading: false,
      },
    },
  });

  return render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <PostCreatePage />
      </ChakraProvider>
    </Provider>,
  );
};

describe('PostCreatePage', () => {
  it('should render NotConnected component when user is not authenticated', () => {
    renderComponent(false);

    expect(screen.getByTestId('not-connected')).toBeInTheDocument();
    expect(
      screen.queryByTestId('post-create-form-card'),
    ).not.toBeInTheDocument();
  });

  it('should render NotConnected component when user is null', () => {
    renderComponent(true, null);

    expect(screen.getByTestId('not-connected')).toBeInTheDocument();
    expect(
      screen.queryByTestId('post-create-form-card'),
    ).not.toBeInTheDocument();
  });

  it('should render PostCreateFormCard when user is authenticated and exists', () => {
    renderComponent(true, mockUser);

    expect(screen.getByTestId('post-create-form-card')).toBeInTheDocument();
    expect(screen.queryByTestId('not-connected')).not.toBeInTheDocument();
  });
});
