import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginFormCard from '../components/LoginFormCard';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Chakra UI Box to avoid style issues
vi.mock('@chakra-ui/react', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  VStack: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));

vi.mock('../components/LoginForm', () => ({
  default: () => <form data-testid="login-form" />,
}));
vi.mock('../components/LoginDivider', () => ({
  default: () => <div data-testid="login-divider" />,
}));

describe('LoginFormCard', () => {
  it('renders all child components', () => {
    render(<LoginFormCard />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
