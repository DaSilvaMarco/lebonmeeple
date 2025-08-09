import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import Avatar from '../components/Avatar';
import { User } from '../types';
import theme from '@frontend/ui/theme';

// Composant wrapper pour les tests
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

describe('Avatar Component', () => {
  it('should render avatar with user avatar image when avatar is provided', () => {
    const userWithAvatar: User = {
      userId: 1,
      username: 'testuser',
      email: 'test@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };

    render(
      <TestWrapper>
        <Avatar user={userWithAvatar} />
      </TestWrapper>,
    );

    const avatarImage = screen.getByRole('img', { name: 'Avatar' });
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      'src',
      'https://example.com/avatar.jpg',
    );
  });

  it('should render default avatar when user avatar is empty string', () => {
    const userWithoutAvatar: User = {
      userId: 1,
      username: 'testuser',
      email: 'test@example.com',
      avatar: '',
    };

    render(
      <TestWrapper>
        <Avatar user={userWithoutAvatar} />
      </TestWrapper>,
    );

    const avatarImage = screen.getByRole('img', { name: 'Avatar' });
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', './public/defaultAvatar.jpg');
  });
});
