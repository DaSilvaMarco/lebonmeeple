'use client';

import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import LoginFormCard from '../components/LoginFormCard';

const SigninPage = () => {
  return (
    <Flex justify="center">
      <Box w="full" zIndex={1}>
        <Box>
          <LoginFormCard />
        </Box>
      </Box>
    </Flex>
  );
};

export default SigninPage;
