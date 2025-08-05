'use client';

import React from 'react';
import LoginFormCard from '@frontend/domains/user/components/LoginFormCard';
import { Box, Flex } from '@chakra-ui/react';

export default function LoginForm() {

  return (
    <Flex justify="center">
      <Box w="full" maxW="md" zIndex={1}>
        <Box>
            <LoginFormCard /> 
        </Box>
      </Box>
    </Flex>
  );
}
