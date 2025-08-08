import { VStack, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const WelcomeSignupFormCard = () => {
  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const textColor = useColorModeValue('neutral.600', 'white');
  return (
    <VStack spacing={6} mb={8} textAlign="center">
      <VStack spacing={2}>
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="bold"
          color={textColorPrimary}
          bgGradient="linear(to-r, brand.600, meeple.600)"
          bgClip="text"
        >
          Bienvenue !
        </Heading>
        <Text color={textColor} fontSize="lg">
          Créez votre compte LeBonMeeple
        </Text>
      </VStack>
    </VStack>
  );
};

export default WelcomeSignupFormCard;
