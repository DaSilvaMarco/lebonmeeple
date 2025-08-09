import { render, screen } from '@testing-library/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import WelcomeLoginFormCard from '../components/WelcomeLoginFormCard';

const theme = extendTheme({
  colors: {
    brand: { 600: '#123456' },
    meeple: { 600: '#654321' },
    neutral: { 800: '#222222', 600: '#666666' },
  },
});

describe('WelcomeLoginFormCard', () => {
  it('renders heading and description', () => {
    render(
      <ChakraProvider theme={theme}>
        <WelcomeLoginFormCard />
      </ChakraProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /Bon retour !/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Connectez-vous à votre compte LeBonMeeple/i),
    ).toBeInTheDocument();
  });
});
