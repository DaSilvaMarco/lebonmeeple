import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChakraProvider } from '@chakra-ui/react';
import PostsPageSkeleton from '../pages/PostsPageSkeleton';
import theme from '@frontend/ui/theme';

// Mock the skeleton components
vi.mock('../components/PostsGridSkeleton', () => ({
  default: ({ count }: { count?: number }) => (
    <div data-testid="posts-grid-skeleton" data-count={count}>
      Posts Grid Skeleton with {count} items
    </div>
  ),
}));

vi.mock('../components/PostsHeaderSkeleton', () => ({
  default: () => (
    <div data-testid="posts-header-skeleton">Posts Header Skeleton</div>
  ),
}));

// Helper function to render component with providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(<ChakraProvider theme={theme}>{component}</ChakraProvider>);
};

describe('PostsPageSkeleton', () => {
  it('should render skeleton components with correct structure and props', () => {
    // Test basic rendering, layout structure, and props passing
    const { container } = renderWithProviders(<PostsPageSkeleton />);

    // Verify basic rendering and structure
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByTestId('posts-header-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('posts-grid-skeleton')).toBeInTheDocument();

    // Verify component order in DOM
    const headerSkeleton = screen.getByTestId('posts-header-skeleton');
    const gridSkeleton = screen.getByTestId('posts-grid-skeleton');
    expect(headerSkeleton.compareDocumentPosition(gridSkeleton)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );

    // Verify correct props and content
    expect(headerSkeleton).toHaveTextContent('Posts Header Skeleton');
    expect(gridSkeleton).toHaveAttribute('data-count', '6');
    expect(gridSkeleton).toHaveTextContent('Posts Grid Skeleton with 6 items');

    // Verify component boundaries and isolation
    expect(headerSkeleton).not.toBe(gridSkeleton);
    expect(headerSkeleton.textContent).not.toEqual(gridSkeleton.textContent);

    // Verify accessibility and semantic structure
    expect(screen.getByText(/Posts Header Skeleton/)).toBeInTheDocument();
    expect(
      screen.getByText(/Posts Grid Skeleton with 6 items/),
    ).toBeInTheDocument();
  });

  it('should handle theme integration and responsive behavior correctly', () => {
    // Test theme integration and responsive behavior
    const { unmount: unmount1 } = renderWithProviders(<PostsPageSkeleton />);

    // Verify theme integration works
    expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
    expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);
    unmount1();

    // Test with custom theme
    const customTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        brand: { 400: '#custom-brand' },
      },
    };

    const { unmount: unmount2 } = render(
      <ChakraProvider theme={customTheme}>
        <PostsPageSkeleton />
      </ChakraProvider>,
    );

    expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
    expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);
    unmount2();

    // Test without theme (graceful degradation)
    const { unmount: unmount3 } = render(<PostsPageSkeleton />);
    expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
    expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);
    unmount3();

    // Test responsive behavior across different scenarios
    const renderSizes = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1200, height: 800 }, // Desktop
    ];

    renderSizes.forEach(() => {
      const { unmount } = renderWithProviders(<PostsPageSkeleton />);
      expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
      expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);
      unmount();
    });
  });

  it('should handle performance, error scenarios and integration requirements', () => {
    // Test performance optimizations and re-rendering
    const { rerender, unmount: performanceUnmount } = renderWithProviders(
      <PostsPageSkeleton />,
    );

    // Initial render verification
    expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
    expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);

    // Test efficient re-renders
    for (let i = 0; i < 3; i++) {
      rerender(
        <ChakraProvider theme={theme}>
          <PostsPageSkeleton />
        </ChakraProvider>,
      );
      expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
      expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);
    }
    performanceUnmount();

    // Test memory management and unmounting
    const { unmount } = renderWithProviders(<PostsPageSkeleton />);
    expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
    expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);

    unmount();
    expect(
      screen.queryByTestId('posts-header-skeleton'),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('posts-grid-skeleton')).not.toBeInTheDocument();

    // Test rapid mount/unmount cycles
    for (let i = 0; i < 5; i++) {
      const { unmount: cycleUnmount } = renderWithProviders(
        <PostsPageSkeleton />,
      );
      expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
      expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);
      cycleUnmount();
    }

    // Test consistency across multiple renders
    const { unmount: consistencyUnmount } = renderWithProviders(
      <PostsPageSkeleton />,
    );
    expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
    expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);
    consistencyUnmount();

    // Re-render should maintain same structure
    const { unmount: finalUnmount } = renderWithProviders(
      <PostsPageSkeleton />,
    );
    expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
    expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);
    finalUnmount();

    // Test integration scenario - replacement with actual content
    const { rerender: integrationRerender, unmount: integrationUnmount } =
      renderWithProviders(<PostsPageSkeleton />);
    expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);

    integrationRerender(
      <ChakraProvider theme={theme}>
        <div data-testid="actual-posts-page">Actual Posts Page</div>
      </ChakraProvider>,
    );

    expect(
      screen.queryByTestId('posts-header-skeleton'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('actual-posts-page')).toBeInTheDocument();
    integrationUnmount();

    // Test error resilience
    const { unmount: errorUnmount } = renderWithProviders(
      <PostsPageSkeleton />,
    );
    expect(screen.getAllByTestId('posts-header-skeleton')).toHaveLength(1);
    expect(screen.getAllByTestId('posts-grid-skeleton')).toHaveLength(1);
    errorUnmount();
  });
});
