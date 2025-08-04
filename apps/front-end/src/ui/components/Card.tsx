import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { useThemeColors } from '@/ui/hooks';

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

/**
 * Composant Card réutilisable qui utilise les couleurs centralisées
 * Exemple d'utilisation du hook useThemeColors
 */
export const Card: React.FC<CardProps> = ({ title, description, children }) => {
  const { cardBg, textColor, textColorPrimary, borderColor } = useThemeColors();

  return (
    <Box
      p={6}
      bg={cardBg}
      borderRadius="xl"
      shadow="lg"
      border="1px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'xl',
        borderColor: 'brand.300',
      }}
      transition="all 0.3s"
    >
      <VStack spacing={4} align="start">
        <Text fontSize="xl" fontWeight="bold" color={textColorPrimary}>
          {title}
        </Text>
        <Text color={textColor}>{description}</Text>
        {children}
      </VStack>
    </Box>
  );
};

export default Card;
