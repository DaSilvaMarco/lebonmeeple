import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import ResponsiveNav from '../components/ResponsiveNav';

const renderWithChakra = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

describe('ResponsiveNav', () => {
  it('should render navigation for non-authenticated user', () => {
    renderWithChakra(<ResponsiveNav />);

    // Vérifie que les éléments pour utilisateur non connecté sont présents
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByText('Inscription')).toBeInTheDocument();

    // Vérifie que les éléments pour utilisateur connecté ne sont pas présents
    expect(screen.queryByText('Blog')).not.toBeInTheDocument();
    expect(screen.queryByText('Profil')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
