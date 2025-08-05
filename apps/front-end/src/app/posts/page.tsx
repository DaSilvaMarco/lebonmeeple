'use client';

import React from 'react';
import { Flex } from '@chakra-ui/react';
import PostsList from '@frontend/domains/post/components/PostsList';

const PostsPage = () => {
  return (
    <Flex justify="center" p={2} w="100%">
        <PostsList />
    </Flex>
  );
};

export default PostsPage;
