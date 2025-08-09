import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginFormCard from '../components/LoginFormCard';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Chakra UI Box to avoid style issues
vi.mock('@chakra-ui/react', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock child components to focus on composition
vi.mock('../components/WelcomeLoginFormCard', () => ({
  default: () => <div data-testid="welcome-login-form-card" />,
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
    expect(screen.getByTestId('welcome-login-form-card')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('login-divider')).toBeInTheDocument();
  });
});
