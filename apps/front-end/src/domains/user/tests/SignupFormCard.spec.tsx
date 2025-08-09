import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../../ui/theme';
import SignupFormCard from '../components/SignupFormCard';

describe('SignupFormCard', () => {
  it('renders without crashing', () => {
    render(
      <ChakraProvider theme={theme}>
        <SignupFormCard />
      </ChakraProvider>,
    );
    // Vérifie que le texte d'accueil est bien affiché
    expect(screen.getByText('Bienvenue !')).toBeInTheDocument();
  });
});
