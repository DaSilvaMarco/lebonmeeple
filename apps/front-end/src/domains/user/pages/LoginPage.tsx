'use client';

import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import LoginFormCard from '../components/LoginFormCard';

const LoginPage = () => {
  return (
    <Flex justify="center">
      <Box w="full" maxW="md" zIndex={1}>
        <Box>
          <LoginFormCard />
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
