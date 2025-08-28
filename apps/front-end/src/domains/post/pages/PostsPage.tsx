'use client';

import React from 'react';
import { Box, Stack, Flex } from '@chakra-ui/react';
import Pagination from '@frontend/domains/shared/pagination/Pagination';
import PostsPageSkeleton from './PostsPageSkeleton';
import PostsList from '../components/PostsList';
import { usePosts } from '../services/usePosts';

const PostsPage = () => {
  const {
    posts,
    page,
    setPage,
    totalPages,
    isLoading,
    handlePrevPage,
    handleNextPage,
  } = usePosts();

  return (
    <Box w="100%" py={{ base: 4, md: 8 }} px={{ base: 0, md: 4 }}>
      <Stack
        spacing={{ base: 4, md: 8 }}
        align="center"
        maxW="1200px"
        mx="auto"
      >
        <Flex justifyContent="center" alignItems="center">
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </Flex>
        <Box w="100%" maxW="1200px" minH="400px" px={{ base: 2, md: 0 }}>

          {isLoading ? <PostsPageSkeleton /> : <PostsList posts={posts} />}
          
        </Box>
        <Box w="fit-content" maxW="100%" mx="auto">
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default PostsPage;
