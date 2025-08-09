import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect } from 'vitest';
import PostCardSkeleton from '../components/PostCardSkeleton';
import theme from '../../../../ui/theme';

const renderWithChakra = (ui: React.ReactElement) => {
  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  );

  return render(ui, { wrapper: TestWrapper });
};

describe('PostCardSkeleton', () => {
  it('should render skeleton component correctly', () => {
    const { container } = renderWithChakra(<PostCardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
