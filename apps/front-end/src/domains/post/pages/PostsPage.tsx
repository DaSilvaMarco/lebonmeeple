'use client';

import React, { useEffect } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { Post } from '../type';
import { useAppDispatch } from '@frontend/store/hook';
import { postsList } from '../slice';
import PostsGrid from '../components/PostsGrid';
import PostsHeader from '../components/PostsHeader';

type Props = {
  posts: Post[];
};

const PostsPage = (props: Props) => {
  const { posts } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postsList(posts));
  }, [dispatch, posts]);

  return (
    <Flex justify="center" p={2} w="100%">
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
        <PostsGrid />
      </Box>
    </Flex>
  );
};

export default PostsPage;
