import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/Footer';

// Wrapper pour Chakra UI
const ChakraWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

describe('Footer', () => {
  it('should render all footer elements', () => {
    render(<Footer />, { wrapper: ChakraWrapper });

    expect(screen.getByText('Mentions légales')).toBeInTheDocument();
    expect(screen.getByText('Plan du site')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
