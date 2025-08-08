'use client';

import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';

const PostsHeaderSkeleton = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={6}
      px={4}
      pt={4}
      w="100%"
    >
      <Skeleton
        height="8"
        width="120px"
        startColor="gray.100"
        endColor="gray.300"
      />
      <Skeleton
        height="10"
        width="140px"
        borderRadius="md"
        startColor="gray.100"
        endColor="gray.300"
      />
    </Flex>
  );
};

export default PostsHeaderSkeleton;
