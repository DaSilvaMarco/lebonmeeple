'use client';

import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import SignupForm from './SignupForm';
import SignupDivider from './SignupDivider';

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
      <SignupForm />

      <SignupDivider />
    </Box>
  );
};

export default SignupFormCard;
