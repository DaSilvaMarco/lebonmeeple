'use client';

import React from 'react';
import { Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

const WelcomePostCreateFormCard = () => {
  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const textColor = useColorModeValue('neutral.600', 'white');

  return (
    <VStack spacing={4} textAlign="center" mb={8}>
      <h2
        style={{
          position: 'absolute',
          left: '-9999px',
          height: '1px',
          width: '1px',
          overflow: 'hidden',
        }}
      >
        Bienvenue sur la page de création d’article
      </h2>
      <Heading
        as="h2"
        size="xl"
        color={textColorPrimary}
        fontWeight="bold"
        letterSpacing="tight"
        aria-hidden="true"
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
