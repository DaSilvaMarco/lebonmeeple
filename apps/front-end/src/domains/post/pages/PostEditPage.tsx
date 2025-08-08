'use client';

import React, { useEffect, useState } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/react';
import NotConnected from '@frontend/domains/shared/warning/NotConnected';
import { useAppSelector } from '@frontend/store/hook';
import { getPostById } from '@frontend/domains/post/api/getPostById';
import { Post } from '@frontend/domains/post/type';
import { toastError } from '@frontend/domains/shared/toat/toast';
import PostEditFormCard from '../components/PostEditFormCard';

type Props = {
  postId: number;
};

const PostEditPage = ({ postId }: Props) => {
  const { user, isAuthenticated, token } = useAppSelector(
    (state) => state.user,
  );
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const fetchedPost = await getPostById(postId.toString());
        setPost(fetchedPost);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erreur lors du chargement du post';
        setError(errorMessage);
        toastError(toast, 'Erreur', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, toast]);

  if (!user || !isAuthenticated) {
    return <NotConnected />;
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Box>Chargement...</Box>
      </Flex>
    );
  }

  if (error || !post) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Box>Erreur lors du chargement du post</Box>
      </Flex>
    );
  }

  // Vérifier que l'utilisateur est propriétaire du post
  if (post.userId !== user.id) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Box>Vous n'êtes pas autorisé à modifier ce post</Box>
      </Flex>
    );
  }

  return (
    <Flex justify="center">
      <Box w="full" maxW={{ base: 'md', md: '2xl' }} zIndex={1}>
        <Box>
          <PostEditFormCard post={post} token={token!} />
        </Box>
      </Box>
    </Flex>
  );
};

export default PostEditPage;
