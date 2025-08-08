'use client';

import React from 'react';
import { Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';

const WelcomePostEditFormCard = () => {
  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const textColor = useColorModeValue('neutral.600', 'white');

  return (
    <VStack spacing={4} textAlign="center" mb={8}>
      <Heading
        as="h2"
        size="xl"
        color={textColorPrimary}
        fontWeight="bold"
        letterSpacing="tight"
      >
        Modifier votre article
      </Heading>
      <Text fontSize="md" color={textColor} opacity={0.8}>
        Mettez à jour votre article pour la communauté Le Bon Meeple
      </Text>
    </VStack>
  );
};

export default WelcomePostEditFormCard;
