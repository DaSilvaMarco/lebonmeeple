'use client';

import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';
import { useThemeColors } from '@/ui/hooks';

const WelcomePostCreateFormCard = () => {
  const { textColorPrimary, textColor } = useThemeColors();

  return (
    <VStack spacing={4} textAlign="center" mb={8}>
      <Heading
        as="h2"
        size="xl"
        color={textColorPrimary}
        fontWeight="bold"
        letterSpacing="tight"
      >
        Créer un nouvel article
      </Heading>
      <Text fontSize="md" color={textColor} opacity={0.8}>
        Partagez vos découvertes et passions avec la communauté Le Bon Meeple
      </Text>
    </VStack>
  );
};

export default WelcomePostCreateFormCard;
