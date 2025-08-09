import { render, screen } from '@testing-library/react';
import LoginDivider from '../components/LoginDivider';
import '@testing-library/jest-dom';

// Mock next/link to render children directly
vi.mock('next/link', () => ({
  default: ({ children }: React.PropsWithChildren<object>) => children,
}));

describe('LoginDivider', () => {
  it('renders divider and signup button', () => {
    render(<LoginDivider />);
    expect(screen.getByText('ou')).toBeInTheDocument();
    expect(
      screen.getByText("Vous n'avez pas encore de compte ?"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: "S'inscrire" }),
    ).toBeInTheDocument();
  });

  it('renders terms and privacy links', () => {
    render(<LoginDivider />);
    expect(screen.getByText("conditions d'utilisation")).toBeInTheDocument();
    expect(
      screen.getByText('politique de confidentialité'),
    ).toBeInTheDocument();
  });
});
