'use client';

import React, { useEffect } from 'react';
import {
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PostCard from '@/domains/shared/card/components/PostCard';
import { type Post } from '@frontend/domains/post/type';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import { getPosts } from '../api/getPosts';
import { postsList } from '../slice';

const MotionGridItem = motion(GridItem);
const MotionGrid = motion(Grid);

const PostsGrid = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <MotionGrid
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      templateColumns={{
        base: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={6}
      px={{ base: 4, md: 6, lg: 8 }}
      pb={8}
      w="100%"
      maxW="7xl"
      mx="auto"
    >
      {posts.map((post: Post) => (
        <MotionGridItem
          key={post.id}
          w="100%"
          variants={itemVariants}
          whileHover={{
            y: -8,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
          style={{ originY: 0.5 }}
        >
          <PostCard post={post} />
        </MotionGridItem>
      ))}
    </MotionGrid>
  );
};

export default PostsGrid;
