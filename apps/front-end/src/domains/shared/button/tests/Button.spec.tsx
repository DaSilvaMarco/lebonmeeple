import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../components/Button';

// Wrapper pour ChakraUI
const ChakraWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

const renderWithChakra = (component: React.ReactElement) => {
  return render(component, { wrapper: ChakraWrapper });
};

describe('Button', () => {
  it('should render with children', () => {
    renderWithChakra(<Button color="primary">Test Button</Button>);
    expect(
      screen.getByRole('button', { name: 'Test Button' }),
    ).toBeInTheDocument();
  });

  it('should render with different color variants', () => {
    // Test que les différentes couleurs n'empêchent pas le rendu
    const { rerender } = renderWithChakra(
      <Button color="primary">Primary</Button>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <ChakraWrapper>
        <Button color="secondary">Secondary</Button>
      </ChakraWrapper>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <ChakraWrapper>
        <Button color="peach">Peach</Button>
      </ChakraWrapper>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should set correct type attribute', () => {
    renderWithChakra(
      <Button color="primary" type="submit">
        Submit
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should default to button type when not specified', () => {
    renderWithChakra(<Button color="primary">Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should call handleClick when clicked', () => {
    const handleClick = vi.fn();
    renderWithChakra(
      <Button color="primary" handleClick={handleClick}>
        Clickable
      </Button>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when isDisabled is true', () => {
    renderWithChakra(
      <Button color="primary" isDisabled>
        Disabled
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should show loading state when isLoading is true', () => {
    renderWithChakra(
      <Button color="primary" isLoading>
        Loading
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-loading', '');
  });

  it('should render with icon when provided', () => {
    const TestIcon = <span data-testid="test-icon">🚀</span>;
    renderWithChakra(
      <Button color="primary" icon={TestIcon}>
        With Icon
      </Button>,
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});
