'use client';

import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import SigninFormCard from '../components/SigninFormCard';

const SigninPage = () => {
  return (
    <Flex justify="center">
      <Box w="full" zIndex={1}>
        <Box>
          <SigninFormCard />
        </Box>
      </Box>
    </Flex>
  );
};

export default SigninPage;
