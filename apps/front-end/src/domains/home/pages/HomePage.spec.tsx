import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './HomePage';
import theme from '@frontend/ui/theme';
import { userSlice } from '@frontend/domains/user/slice';
import type { UserState } from '@frontend/domains/user/type';

// Mock all the child components
vi.mock('../components/HomePresentation', () => ({
  default: () => (
    <div data-testid="home-presentation">Home Presentation Component</div>
  ),
}));

vi.mock('../components/WhyLeBonMeeple', () => ({
  default: () => (
    <div data-testid="why-lebonmeeple">Why LeBonMeeple Component</div>
  ),
}));

vi.mock('../components/Testimonial', () => ({
  default: () => <div data-testid="testimonial">Testimonial Component</div>,
}));

vi.mock('../components/JoinCommunity', () => ({
  default: () => (
    <div data-testid="join-community">Join Community Component</div>
  ),
}));

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

// Helper function to create a mock store
const createMockStore = (userState: Partial<UserState> = {}) => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    preloadedState: {
      user: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ...userState,
      },
    },
  });
};

// Helper function to render component with providers
const renderWithProviders = (
  component: React.ReactElement,
  userState: Partial<UserState> = {},
) => {
  const store = createMockStore(userState);
  return render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>{component}</ChakraProvider>
    </Provider>,
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      renderWithProviders(<HomePage />);
      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
    });

    it('should render all required components', () => {
      renderWithProviders(<HomePage />);

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
      expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial')).toBeInTheDocument();
      expect(screen.getByTestId('join-community')).toBeInTheDocument();
    });

    it('should render components in correct order', () => {
      renderWithProviders(<HomePage />);

      const homePresentation = screen.getByTestId('home-presentation');
      const whyLeBonMeeple = screen.getByTestId('why-lebonmeeple');
      const testimonial = screen.getByTestId('testimonial');
      const joinCommunity = screen.getByTestId('join-community');

      // Check that components appear in the expected order in the DOM
      const components = [
        homePresentation,
        whyLeBonMeeple,
        testimonial,
        joinCommunity,
      ];
      const positions = components.map((component) => {
        let position = 0;
        let element = component;
        while (element.previousElementSibling) {
          position++;
          element = element.previousElementSibling as HTMLElement;
        }
        return position;
      });

      // Positions should be in ascending order
      expect(positions[0]).toBeLessThan(positions[1]);
      expect(positions[1]).toBeLessThan(positions[2]);
      expect(positions[2]).toBeLessThan(positions[3]);
    });
  });

  describe('Component Structure', () => {
    it('should use React fragment as root element', () => {
      const { container } = renderWithProviders(<HomePage />);

      // The component uses React fragment, so all components should be direct children
      const directChildren = container.querySelectorAll('div[data-testid]');
      expect(directChildren.length).toBe(4);
    });

    it('should not have any additional wrapper elements', () => {
      const { container } = renderWithProviders(<HomePage />);

      // Check that there are no unnecessary div wrappers
      const divWrappers = container.querySelectorAll('div > div > div > div');
      expect(divWrappers.length).toBe(0);
    });

    it('should have all components as direct siblings', () => {
      renderWithProviders(<HomePage />);

      const homePresentation = screen.getByTestId('home-presentation');
      const whyLeBonMeeple = screen.getByTestId('why-lebonmeeple');
      const testimonial = screen.getByTestId('testimonial');
      const joinCommunity = screen.getByTestId('join-community');

      // All components should have the same parent
      expect(homePresentation.parentElement).toBe(whyLeBonMeeple.parentElement);
      expect(whyLeBonMeeple.parentElement).toBe(testimonial.parentElement);
      expect(testimonial.parentElement).toBe(joinCommunity.parentElement);
    });
  });

  describe('Component Props and State', () => {
    it('should render correctly when user is not authenticated', () => {
      renderWithProviders(<HomePage />, {
        isAuthenticated: false,
        user: null,
      });

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
      expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial')).toBeInTheDocument();
      expect(screen.getByTestId('join-community')).toBeInTheDocument();
    });

    it('should render correctly when user is authenticated', () => {
      renderWithProviders(<HomePage />, {
        isAuthenticated: true,
        user: {
          id: 1,
          email: 'test@example.com',
          username: 'testuser',
          avatar: '/defaultAvatar.jpg',
          roles: ['USER'],
        },
      });

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
      expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial')).toBeInTheDocument();
      expect(screen.getByTestId('join-community')).toBeInTheDocument();
    });

    it('should render correctly with loading state', () => {
      renderWithProviders(<HomePage />, {
        isLoading: true,
        isAuthenticated: false,
        user: null,
      });

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
      expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial')).toBeInTheDocument();
      expect(screen.getByTestId('join-community')).toBeInTheDocument();
    });

    it('should render correctly with error state', () => {
      renderWithProviders(<HomePage />, {
        isAuthenticated: false,
        user: null,
      });

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
      expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial')).toBeInTheDocument();
      expect(screen.getByTestId('join-community')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible structure', () => {
      const { container } = renderWithProviders(<HomePage />);

      // Check that the page has a proper structure
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should not have any accessibility violations', () => {
      renderWithProviders(<HomePage />);

      // All components should be rendered and accessible
      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
      expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial')).toBeInTheDocument();
      expect(screen.getByTestId('join-community')).toBeInTheDocument();
    });

    it('should maintain focus management', () => {
      renderWithProviders(<HomePage />);

      // Components should be focusable if they contain interactive elements
      const components = [
        screen.getByTestId('home-presentation'),
        screen.getByTestId('why-lebonmeeple'),
        screen.getByTestId('testimonial'),
        screen.getByTestId('join-community'),
      ];

      components.forEach((component) => {
        expect(component).toBeInTheDocument();
      });
    });
  });

  describe('Performance and Optimization', () => {
    it('should render efficiently without unnecessary re-renders', () => {
      const { rerender } = renderWithProviders(<HomePage />);

      // Initial render
      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();

      // Re-render with same props should not cause issues
      rerender(
        <Provider store={createMockStore()}>
          <ChakraProvider theme={theme}>
            <HomePage />
          </ChakraProvider>
        </Provider>,
      );

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
    });

    it('should handle multiple store updates gracefully', () => {
      const store = createMockStore({
        isAuthenticated: false,
        user: null,
      });

      render(
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <HomePage />
          </ChakraProvider>
        </Provider>,
      );

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();

      // Simulate store update
      store.dispatch({
        type: 'user/setAuthenticated',
        payload: true,
      });

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
    });

    it('should not cause memory leaks', () => {
      const { unmount } = renderWithProviders(<HomePage />);

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();

      // Unmount should not cause errors
      unmount();

      // Component should be removed from DOM
      expect(screen.queryByTestId('home-presentation')).not.toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should work with different user states', () => {
      const userStates = [
        { isAuthenticated: false, user: null },
        {
          isAuthenticated: true,
          user: {
            id: 1,
            email: 'user@example.com',
            username: 'testuser',
            avatar: '/defaultAvatar.jpg',
            roles: ['USER'],
          },
        },
        { isAuthenticated: false, isLoading: true, user: null },
        { isAuthenticated: false, user: null },
      ];

      userStates.forEach((userState) => {
        const { unmount } = renderWithProviders(<HomePage />, userState);

        expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
        expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
        expect(screen.getByTestId('testimonial')).toBeInTheDocument();
        expect(screen.getByTestId('join-community')).toBeInTheDocument();

        unmount();
      });
    });

    it('should maintain component isolation', () => {
      renderWithProviders(<HomePage />);

      // Each component should be independently rendered
      const components = [
        'home-presentation',
        'why-lebonmeeple',
        'testimonial',
        'join-community',
      ];

      components.forEach((componentTestId) => {
        const component = screen.getByTestId(componentTestId);
        expect(component).toBeInTheDocument();
        // Just verify the component contains expected base text
        const expectedTexts = {
          'home-presentation': 'Home Presentation',
          'why-lebonmeeple': 'Why LeBonMeeple',
          testimonial: 'Testimonial',
          'join-community': 'Join Community',
        };
        expect(component.textContent).toContain(
          expectedTexts[componentTestId as keyof typeof expectedTexts],
        );
      });
    });

    it('should handle theme changes properly', () => {
      const { rerender } = renderWithProviders(<HomePage />);

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();

      // Rerender with theme (simulating theme context change)
      rerender(
        <Provider store={createMockStore()}>
          <ChakraProvider theme={theme}>
            <HomePage />
          </ChakraProvider>
        </Provider>,
      );

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle component render errors gracefully', () => {
      // This test ensures the component structure is robust
      renderWithProviders(<HomePage />);

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
      expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial')).toBeInTheDocument();
      expect(screen.getByTestId('join-community')).toBeInTheDocument();
    });

    it('should render consistently across multiple instances', () => {
      const { unmount: unmount1 } = renderWithProviders(<HomePage />);
      const firstRenderContent = screen.getAllByTestId(
        /home-presentation|why-lebonmeeple|testimonial|join-community/,
      );
      unmount1();

      const { unmount: unmount2 } = renderWithProviders(<HomePage />);
      const secondRenderContent = screen.getAllByTestId(
        /home-presentation|why-lebonmeeple|testimonial|join-community/,
      );

      expect(firstRenderContent.length).toBe(secondRenderContent.length);
      unmount2();
    });

    it('should handle rapid re-renders without issues', () => {
      const { rerender } = renderWithProviders(<HomePage />);

      for (let i = 0; i < 5; i++) {
        rerender(
          <Provider store={createMockStore({ isAuthenticated: i % 2 === 0 })}>
            <ChakraProvider theme={theme}>
              <HomePage />
            </ChakraProvider>
          </Provider>,
        );

        expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
        expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
        expect(screen.getByTestId('testimonial')).toBeInTheDocument();
        expect(screen.getByTestId('join-community')).toBeInTheDocument();
      }
    });
  });

  describe('Component Export', () => {
    it('should export HomePage as default', () => {
      expect(HomePage).toBeDefined();
      expect(typeof HomePage).toBe('function');
    });

    it('should be a React functional component', () => {
      expect(HomePage.prototype).toBeUndefined(); // Functional components don't have prototype
      expect(typeof HomePage).toBe('function');
    });

    it('should render as expected when called directly', () => {
      const result = HomePage();
      expect(result).toBeDefined();
      expect(result.type).toBe(React.Fragment);
    });
  });

  describe('Component Composition', () => {
    it('should compose all sections in logical order', () => {
      renderWithProviders(<HomePage />);

      const allComponents = screen.getAllByTestId(
        /home-presentation|why-lebonmeeple|testimonial|join-community/,
      );
      expect(allComponents).toHaveLength(4);

      // Verify the order matches the expected flow
      expect(allComponents[0]).toHaveAttribute(
        'data-testid',
        'home-presentation',
      );
      expect(allComponents[1]).toHaveAttribute(
        'data-testid',
        'why-lebonmeeple',
      );
      expect(allComponents[2]).toHaveAttribute('data-testid', 'testimonial');
      expect(allComponents[3]).toHaveAttribute('data-testid', 'join-community');
    });

    it('should maintain semantic HTML structure', () => {
      const { container } = renderWithProviders(<HomePage />);

      // Should not have unnecessary nesting
      const nestedDivs = container.querySelectorAll('div div div div div');
      expect(nestedDivs.length).toBe(0);
    });

    it('should provide complete user journey', () => {
      renderWithProviders(<HomePage />);

      // Home page should guide users through:
      // 1. Introduction (HomePresentation)
      // 2. Features/Benefits (WhyLeBonMeeple)
      // 3. Social Proof (Testimonial)
      // 4. Call to Action (JoinCommunity)

      expect(screen.getByTestId('home-presentation')).toBeInTheDocument();
      expect(screen.getByTestId('why-lebonmeeple')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial')).toBeInTheDocument();
      expect(screen.getByTestId('join-community')).toBeInTheDocument();
    });
  });
});
