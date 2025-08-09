import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import WelcomeSignupFormCard from '../components/WelcomeSignupFormCard';

describe('WelcomeSignupFormCard', () => {
  it('renders the heading and description', () => {
    render(
      <ChakraProvider>
        <WelcomeSignupFormCard />
      </ChakraProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /bienvenue/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/créez votre compte lebonmeeple/i),
    ).toBeInTheDocument();
  });
});
