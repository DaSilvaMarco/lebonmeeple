import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect } from 'vitest';

// Import du composant
import PostsHeaderSkeleton from '@/domains/post/components/PostsHeaderSkeleton';

const renderWithProviders = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

describe('PostsHeaderSkeleton', () => {
  it('should render the skeleton header component', () => {
    const { container } = renderWithProviders(<PostsHeaderSkeleton />);

    // Vérifie que le composant est rendu
    expect(container.firstChild).toBeInTheDocument();

    // Vérifie que les éléments Skeleton sont présents
    const skeletons = container.querySelectorAll('[class*="chakra-skeleton"]');
    expect(skeletons).toHaveLength(2);
  });
});
