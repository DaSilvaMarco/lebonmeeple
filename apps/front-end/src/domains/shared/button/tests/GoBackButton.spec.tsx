import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import GoBackButton from '../components/GoBackButton';

// Mock du hook useRouter
const mockBack = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

// Wrapper pour ChakraUI
const ChakraWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

const renderWithChakra = (component: React.ReactElement) => {
  return render(component, { wrapper: ChakraWrapper });
};

describe('GoBackButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the go back button with correct text and icon', () => {
    renderWithChakra(<GoBackButton />);

    const button = screen.getByRole('button', { name: /retour/i });
    expect(button).toBeInTheDocument();
  });

  it('should call router.back() when clicked', () => {
    renderWithChakra(<GoBackButton />);

    const button = screen.getByRole('button', { name: /retour/i });
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
