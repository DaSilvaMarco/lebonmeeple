import { render, screen } from '@testing-library/react';
import SignupDivider from '../components/SignupDivider';
import '@testing-library/jest-dom';

// Minimal test suite for 100% coverage

describe('SignupDivider', () => {
  it('renders divider, login link, and terms/privacy links', () => {
    render(<SignupDivider />);
    // Divider text
    expect(screen.getByText('ou')).toBeInTheDocument();
    // Login prompt and button
    expect(screen.getByText('Vous avez déjà un compte ?')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Se connecter/i }),
    ).toBeInTheDocument();
    // Terms and privacy links
    expect(screen.getByText(/conditions d'utilisation/i)).toBeInTheDocument();
    expect(
      screen.getByText(/politique de confidentialité/i),
    ).toBeInTheDocument();
  });
});
