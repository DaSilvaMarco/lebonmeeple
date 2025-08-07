'use client';

import React from 'react';

import PostsList from '../components/PostsList';
import { Flex } from '@chakra-ui/react';

const PostsPage = () => {
    return (
    <Flex justify="center" p={2} w="100%">
        <PostsList />
    </Flex>
  );
};

export default PostsPage;