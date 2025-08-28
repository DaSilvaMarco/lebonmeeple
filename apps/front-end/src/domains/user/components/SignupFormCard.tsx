'use client';

import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import SignupForm from './SignupForm';

const SignupFormCard = () => {
  const cardBg = useColorModeValue('white', 'neutral.800');
  const borderColor = useColorModeValue('neutral.200', 'neutral.600');

  return (
    <Box
      bg={cardBg}
      p={{ base: 6, md: 10 }}
      borderRadius="2xl"
      shadow="2xl"
      border="1px"
      borderColor={borderColor}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        right: '-1px',
        bottom: '-1px',
        borderRadius: '2xl',
        background: 'linear-gradient(135deg, brand.400, meeple.400, game.400)',
        zIndex: -1,
        opacity: 0.1,
      }}
    >
      <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
        Créer un compte
      </Text>
      <SignupForm />
    </Box>
  );
};

export default SignupFormCard;
