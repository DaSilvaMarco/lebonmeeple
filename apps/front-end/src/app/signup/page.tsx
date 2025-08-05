'use client';

import React from 'react';
import SignupFormCard from '@frontend/domains/user/components/SignupFormCard';
import { Box, Flex } from '@chakra-ui/react';

export default function SignupForm() {
  return (
    <Flex justify="center">
      <Box w="full" maxW={{ base: 'md', md: '2xl' }} zIndex={1}>
        <Box>
          <SignupFormCard />
        </Box>
      </Box>
    </Flex>
  );
}
