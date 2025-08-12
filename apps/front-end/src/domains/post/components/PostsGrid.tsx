'use client';

import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PostCard from '@/domains/shared/card/components/PostCard';
import { type Post } from '@frontend/domains/post/type';
import { containerVariants, itemVariants } from '../constants';

type Props = {
  posts: Post[];
};

const PostsGrid = (props: Props) => {
  const { posts } = props;
  const MotionGridItem = motion(GridItem);
  const MotionGrid = motion(Grid);

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
