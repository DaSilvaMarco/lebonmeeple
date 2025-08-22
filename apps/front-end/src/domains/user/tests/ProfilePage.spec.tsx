import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
// ...existing code...
import ProfilePage from '../pages/ProfilePage';
import configureStore from 'redux-mock-store';
import React from 'react';

import { vi } from 'vitest';
vi.mock('next/navigation', () => ({ useRouter: vi.fn() }));

const mockStore = configureStore([]);

describe('ProfilePage', () => {
  it('renders NotConnected if not authenticated', () => {
    const store = mockStore({
      user: { user: null, isAuthenticated: false },
      post: { posts: [] },
    });
    render(
      <Provider store={store}>
        <ChakraProvider>
          <ProfilePage />
        </ChakraProvider>
      </Provider>,
    );
    expect(screen.getByText(/vous n'êtes pas connecté/i)).toBeInTheDocument();
  });

  it('renders user info and posts if authenticated', () => {
    const user = {
      id: '1',
      username: 'John',
      email: 'john@mail.com',
      avatar: 'avatar.jpg',
    };
    const posts = [
      { id: 'p1', userId: '1', title: 'Post 1', user },
      {
        id: 'p2',
        userId: '2',
        title: 'Post 2',
        user: {
          id: '2',
          username: 'Other',
          email: 'other@mail.com',
          avatar: 'other.jpg',
        },
      },
    ];
    const store = mockStore({
      user: { user, isAuthenticated: true },
      post: { posts },
    });
    render(
      <Provider store={store}>
        <ChakraProvider>
          <ProfilePage />
        </ChakraProvider>
      </Provider>,
    );
    expect(screen.getAllByText(user.username).length).toBeGreaterThan(0);
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText('Connecté')).toBeInTheDocument();
    expect(screen.getByText('Se déconnecter')).toBeInTheDocument();
    // expect(screen.getByText('Modifier profil')).toBeInTheDocument();
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.queryByText('Post 2')).not.toBeInTheDocument();
  });
});
