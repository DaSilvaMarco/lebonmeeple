import { useColorModeValue } from '@chakra-ui/react';

export const useThemeColors = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, brand.50, meeple.50, game.50)',
    'linear(to-br, gray.900, brand.900, meeple.900)',
  );

  const heroBgGradient = useColorModeValue(
    'linear(to-r, brand.50, meeple.50)',
    'linear(to-r, gray.900, brand.900)',
  );
  const featuresBg = useColorModeValue('white', 'gray.800');
  const testimonialsBg = useColorModeValue(
    'linear(to-r, brand.50, meeple.50)',
    'linear(to-r, gray.800, brand.900)',
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBgSecondary = useColorModeValue('gray.50', 'gray.700');

  const textColor = useColorModeValue('gray.600', 'gray.300');
  const textColorPrimary = useColorModeValue('gray.800', 'white');
  const textColorSecondary = useColorModeValue('gray.500', 'gray.400');
  const textColorBrand = useColorModeValue('brand.600', 'brand.600');
  const textColorGame = useColorModeValue('game.600', 'game.600');
  const textColorMeeple = useColorModeValue('meeple.600', 'meeple.600');

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const borderColorLight = useColorModeValue('gray.100', 'gray.700');

  const shadowColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)');

  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const activeBg = useColorModeValue('gray.100', 'gray.600');

  return {
    bgGradient,
    heroBgGradient,
    cardBg,
    cardBgSecondary,
    hoverBg,
    activeBg,
    textColor,
    textColorPrimary,
    textColorSecondary,
    textColorBrand,
    textColorGame,
    textColorMeeple,
    borderColor,
    borderColorLight,
    shadowColor,
    featuresBg,
    testimonialsBg,
  };
};
