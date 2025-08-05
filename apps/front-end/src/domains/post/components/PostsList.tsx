'use client';

import React from 'react';
import PostsHeader from './PostsHeader';
import PostsGrid from './PostsGrid';
import { Box } from '@chakra-ui/react';

const PostsList = () => {
  return (
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
        background: 'linear-gradient(135deg, brand.400, meeple.400, game.400)',
        zIndex: -1,
        opacity: 0.1,
      }}
    >
      <PostsHeader />
      <PostsGrid  />
    </Box>
  );
};

export default PostsList;
