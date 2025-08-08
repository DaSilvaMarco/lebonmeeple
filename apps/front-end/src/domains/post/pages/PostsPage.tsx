'use client';

import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import PostsGrid from '../components/PostsGrid';
import PostsHeader from '../components/PostsHeader';
import { useAppSelector } from '@frontend/store/hook';

const PostsPage = () => {
  const { posts } = useAppSelector((state) => state.post);

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
        <PostsHeader />
        <PostsGrid posts={posts} />
      </Box>
    </Flex>
  );
};

export default PostsPage;
