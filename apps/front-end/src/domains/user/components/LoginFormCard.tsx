'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import WelcomeLoginFormCard from './WelcomeLoginFormCard';
import LoginForm from './LoginForm';
import LoginDivider from './LoginDivider';

const LoginFormCard = () => {
  return (
    <Box
      bg="white"
      p={{ base: 6, md: 10 }}
      borderRadius="xl"
      shadow="lg"
      border="1px"
      borderColor="neutral.200"
    >
      <WelcomeLoginFormCard />
      <LoginForm />
      <LoginDivider />
    </Box>
  );
};

export default LoginFormCard;
