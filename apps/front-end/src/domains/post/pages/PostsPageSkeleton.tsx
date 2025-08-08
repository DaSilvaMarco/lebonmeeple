'use client';

import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import PostsGridSkeleton from '../components/PostsGridSkeleton';
import PostsHeaderSkeleton from '../components/PostsHeaderSkeleton';

const PostsPageSkeleton = () => {
  return (
    <Flex justify="center" align="flex-start" p={2} w="100%" minH="100vh">
      <Box
        w="100%"
        borderRadius="2xl"
        shadow="lg"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: '-1px',
          left: '-1px',
          right: '-1px',
          bottom: '-1px',
          borderRadius: '2xl',
          background:
            'linear-gradient(135deg, brand.400, meeple.400, game.400)',
          zIndex: -1,
          opacity: 0.1,
        }}
      >
        <PostsHeaderSkeleton />
        <PostsGridSkeleton count={6} />
      </Box>
    </Flex>
  );
};

export default PostsPageSkeleton;
