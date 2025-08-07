'use client';

import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

import { PostCreateFormCard } from '../components';
import NotConnected from '@frontend/domains/shared/warning/NotConnected';
import { useAppSelector } from '@frontend/store/hook';

const PostCreatePage = () => {

  const { user, isAuthenticated } = useAppSelector((state) => state.user);

  if (!user || !isAuthenticated) {
    return <NotConnected />;
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
};

export default PostCreatePage;
