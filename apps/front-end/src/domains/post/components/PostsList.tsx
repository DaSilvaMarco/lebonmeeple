'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import { postsList } from '@frontend/domains/post/slice';
import { getPosts } from '@frontend/domains/post/api/getPosts';
import PostsHeader from './PostsHeader';
import PostsGrid from './PostsGrid';
import { Box } from '@chakra-ui/react';

const PostsList = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        dispatch(postsList(fetchedPosts));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [dispatch]);

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
      <PostsGrid posts={posts} />
    </Box>
  );
};

export default PostsList;
