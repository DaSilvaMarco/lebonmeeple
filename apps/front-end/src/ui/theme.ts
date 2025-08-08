import { extendTheme } from '@chakra-ui/react';

// Configuration simple
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Couleurs essentielles
const colors = {
  primary: {
    100: '#fce7f0',
    500: '#bd3a6a',
    700: '#8d2a4d',
  },
  neutral: {
    200: '#e4e4e7',
    600: '#52525b',
    800: '#27272a',
  },
  peach: {
    200: '#faedeaff',
    500: '#f48c49',
    600: '#e56b2d',
  },
};

// Polices
const fonts = {
  heading: 'Poppins, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
};

// Styles simplifiés des composants
const components = {
  Button: {
    baseStyle: {
      fontWeight: '500',
      borderRadius: 'lg',
    },
    variants: {
      solid: {
        bg: 'primary.500',
        color: 'white',
        _hover: { bg: 'primary.700' },
      },
      peach: {
        bg: 'peach.500',
        color: 'white',
        _hover: { bg: 'peach.600' },
      },
      ghost: {
        color: 'primary.500',
        _hover: { bg: 'primary.100' },
      },
      outline: {
        borderColor: 'primary.500',
        color: 'primary.500',
        _hover: { bg: 'primary.500', color: 'white' },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        bg: 'white',
        shadow: 'md',
        border: '1px solid',
        borderColor: 'neutral.200',
      },
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: 'white',
          border: '2px solid',
          borderColor: 'neutral.200',
          borderRadius: 'lg',
          _focus: {
            borderColor: 'primary.500',
          },
        },
      },
    },
    defaultProps: { variant: 'filled' },
  },
};

// Styles globaux simplifiés
const styles = {
  global: {
    body: {
      bg: 'white',
      color: 'neutral.600',
      fontFamily: 'body',
    },
  },
};

// Thème final
const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles,
});

export default theme;
