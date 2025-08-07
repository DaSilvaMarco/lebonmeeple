'use client';

import { ColorModeScript } from '@chakra-ui/react';

// Configuration statique du color mode pour éviter l'import du thème côté serveur
const colorModeConfig = {
  initialColorMode: 'light' as const,
  useSystemColorMode: false,
};

export function ClientColorModeScript() {
  return (
    <ColorModeScript initialColorMode={colorModeConfig.initialColorMode} />
  );
}
