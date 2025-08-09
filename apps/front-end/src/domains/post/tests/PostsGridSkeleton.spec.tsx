import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { describe, it, expect, vi } from 'vitest';

// Mock du composant PostCardSkeleton
vi.mock('@/domains/shared/card/components/PostCardSkeleton', () => {
  return {
    default: () => (
      <div data-testid="post-card-skeleton">Post Card Skeleton</div>
    ),
  };
});

// Import du composant après le mock
import PostsGridSkeleton from '@/domains/post/components/PostsGridSkeleton';

const renderWithProviders = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

describe('PostsGridSkeleton', () => {
  it('should render with default count of 6 skeleton cards', () => {
    renderWithProviders(<PostsGridSkeleton />);

    const skeletonCards = screen.getAllByTestId('post-card-skeleton');
    expect(skeletonCards).toHaveLength(6);
  });

  it('should render with custom count of skeleton cards', () => {
    const customCount = 3;
    renderWithProviders(<PostsGridSkeleton count={customCount} />);

    const skeletonCards = screen.getAllByTestId('post-card-skeleton');
    expect(skeletonCards).toHaveLength(customCount);
  });

  it('should render with count of 0 skeleton cards', () => {
    renderWithProviders(<PostsGridSkeleton count={0} />);

    const skeletonCards = screen.queryAllByTestId('post-card-skeleton');
    expect(skeletonCards).toHaveLength(0);
  });
});
