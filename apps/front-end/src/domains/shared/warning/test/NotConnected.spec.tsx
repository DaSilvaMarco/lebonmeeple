import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotConnected from '../NotConnected';

describe('NotConnected', () => {
  it('should render warning message and login link', () => {
    render(<NotConnected />);

    expect(screen.getByText("Vous n'êtes pas connecté.")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /se connecter/i })).toHaveAttribute(
      'href',
      '/signin',
    );
    expect(
      screen.getByRole('button', { name: /se connecter/i }),
    ).toBeInTheDocument();
  });
});
