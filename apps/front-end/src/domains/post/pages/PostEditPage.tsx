'use client';

import React, { useEffect, useState } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/react';
import { useAppSelector } from '@frontend/store/hook';
import { getPostById } from '@frontend/domains/post/api/get-post';
import { Post } from '@frontend/domains/post/type';
import { toastError } from '@frontend/domains/shared/toat/toast';
import PostEditFormCard from '../components/PostEditFormCard';

type Props = {
  postId: number;
};

const PostEditPage = ({ postId }: Props) => {
  const { user, token, isAuthenticated } = useAppSelector(
    (state) => state.user,
  );
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);

        const fetchedPost = await getPostById(postId.toString());

        setPost(fetchedPost);

        setIsLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erreur lors du chargement du post';
        toastError(toast, 'Erreur', errorMessage);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, toast]);

  return (
    <>
      {post?.userId !== user?.id || !user || !isAuthenticated ? (
        <Flex justify="center" align="center" minH="50vh">
          <Box>Vous n'êtes pas autorisé à modifier ce post</Box>
        </Flex>
      ) : (
        <Flex justify="center">
          <Box w="full" maxW={{ base: 'md', md: '2xl' }} zIndex={1}>
            <Box>
              <PostEditFormCard
                post={post}
                token={token!}
                isLoading={isLoading}
              />
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default PostEditPage;
