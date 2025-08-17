'use client';

import React, { useEffect, useState } from 'react';
import { Box, Stack, Center, Text, Flex } from '@chakra-ui/react';
import { getPosts } from '@frontend/domains/post/api/getPosts';
import PostsPage from '@frontend/domains/post/pages/PostsPage';
import { useDispatch } from 'react-redux';
import { postsList, clearPosts } from '../slice';
import Pagination from '@frontend/domains/shared/pagination/Pagination';
import PostsPageSkeleton from './PostsPageSkeleton';

const PostsClientPage = () => {
  const [totalPages, setTotalPages] = useState(1);
  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchPosts = async (newPage = page) => {
    try {
      dispatch(clearPosts());
      setIsLoading(true);
      const fetchedPosts = await getPosts({ limit: 9, page: newPage });
      dispatch(postsList(fetchedPosts.posts));
      if (fetchedPosts.totalPages) {
        setTotalPages(fetchedPosts.totalPages);
      }
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (error) {
    return (
      <Center minH="40vh" px={4}>
        <Text
          color="red.500"
          fontWeight="bold"
          fontSize={{ base: 'md', md: 'lg' }}
        >
          {error}
        </Text>
      </Center>
    );
  }

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
          {isLoading ? <PostsPageSkeleton /> : <PostsPage />}
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

export default PostsClientPage;
