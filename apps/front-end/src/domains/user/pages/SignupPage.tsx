'use client';

import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

import SignupFormCard from '../components/SignupFormCard';

const SignupPage = () => {
  return (
    <Flex justify="center">
      <Box w="full" maxW={{ base: 'md', md: '2xl' }} zIndex={1}>
        <Box>
          <SignupFormCard />
        </Box>
      </Box>
    </Flex>
  );
};

export default SignupPage;