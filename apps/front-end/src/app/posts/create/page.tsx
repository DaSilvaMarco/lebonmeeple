'use client';

import React from 'react';
import PostCreateFormCard from '@frontend/domains/post/components/PostCreateFormCard';
import { Box, Flex } from '@chakra-ui/react';
import { useAppSelector } from '@frontend/store/hook';
import NotConnected from '@frontend/domains/shared/warning/NotConnected';

export default function PostCreatePage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);

  if (!user || !isAuthenticated) {
    return (
      <NotConnected />
    );
  }

  return (
    <Flex justify="center">
      <Box w="full" maxW={{ base: 'md', md: '2xl' }} zIndex={1}>
        <Box>
          <PostCreateFormCard />
        </Box>
      </Box>
    </Flex>
  );
}
