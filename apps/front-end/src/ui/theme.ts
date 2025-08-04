import { type ThemeConfig, extendTheme } from '@chakra-ui/react';

// Configuration du thème (mode sombre/clair)
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Couleurs personnalisées
const colors = {
  brand: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Couleur principale
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  // Couleurs pour Le Bon Meeple (thème jeu de société)
  meeple: {
    50: '#fff3e0',
    100: '#ffe0b3',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800', // Orange principal
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
  },
  game: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0', // Violet pour le gaming
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
  },
};

// Polices personnalisées
const fonts = {
  heading:
    '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

// Styles des composants
const components = {
  // Button: {
  //   baseStyle: {
  //     fontWeight: 'semibold',
  //     borderRadius: 'lg',
  //   },
  //   variants: {
  //     solid: {
  //       bg: 'brand.500',
  //       color: 'white',
  //       _hover: {
  //         bg: 'brand.600',
  //         transform: 'translateY(-2px)',
  //         boxShadow: 'lg',
  //       },
  //       _active: {
  //         bg: 'brand.700',
  //         transform: 'translateY(0)',
  //       },
  //     },
  //     meeple: {
  //       bg: 'meeple.500',
  //       color: 'white',
  //       _hover: {
  //         bg: 'meeple.600',
  //         transform: 'translateY(-2px)',
  //         boxShadow: 'lg',
  //       },
  //       _active: {
  //         bg: 'meeple.700',
  //         transform: 'translateY(0)',
  //       },
  //     },
  //     game: {
  //       bg: 'game.500',
  //       color: 'white',
  //       _hover: {
  //         bg: 'game.600',
  //         transform: 'translateY(-2px)',
  //         boxShadow: 'lg',
  //       },
  //       _active: {
  //         bg: 'game.700',
  //         transform: 'translateY(0)',
  //       },
  //     },
  //   },
  //   defaultProps: {
  //     variant: 'solid',
  //   },
  // },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        boxShadow: 'sm',
        _hover: {
          boxShadow: 'md',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s',
      },
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: 'gray.50',
          borderRadius: 'lg',
          _hover: {
            bg: 'gray.100',
          },
          _focus: {
            bg: 'white',
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
    },
    variants: {
      page: {
        fontSize: { base: '2xl', md: '3xl' },
        color: 'gray.800',
        marginBottom: 6,
      },
      section: {
        fontSize: { base: 'xl', md: '2xl' },
        color: 'gray.700',
        marginBottom: 4,
      },
    },
  },
};

// Styles globaux
const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.800',
    },
    '*::placeholder': {
      color: 'gray.400',
    },
    '*, *::before, &::after': {
      borderColor: 'gray.200',
    },
  },
};

// Breakpoints personnalisés
const breakpoints = {
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

// Création du thème final
const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles,
  breakpoints,
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
});

export default theme;
