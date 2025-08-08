'use client';

import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import PostCardSkeleton from '@/domains/shared/card/components/PostCardSkeleton';

type Props = {
  count?: number;
};

const PostsGridSkeleton = ({ count = 6 }: Props) => {
  return (
    <Grid
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
      {Array.from({ length: count }, (_, index) => (
        <GridItem key={index} w="100%">
          <PostCardSkeleton />
        </GridItem>
      ))}
    </Grid>
  );
};

export default PostsGridSkeleton;
