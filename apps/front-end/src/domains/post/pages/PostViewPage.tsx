'use client';

import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';
import GoBackButton from '@frontend/domains/shared/button/components/GoBackButton';
import React from 'react';
import Image from '@frontend/domains/shared/image/components/Image';
import CommentsSection from '@frontend/domains/comment/components/CommentsSection';
import { usePostView } from '../services/usePostView';
import PostViewOptions from '../components/PostViewOptions';
import PostViewGames from '../components/PostViewGames';

const PostViewPage = () => {

  const {
    post,
    user,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    handleCommentsUpdate,
  } = usePostView();

  if (!post) return null;

  return (
    <Flex justify="center" align="flex-start" p={2} w="100%" minH="100vh">
      <Box
        w="100%"
        borderRadius="2xl"
        shadow="none"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: '-1px',
          left: '-1px',
          right: '-1px',
          bottom: '-1px',
          borderRadius: '2xl',
          background:
            'linear-gradient(135deg, brand.400, meeple.400, game.400)',
          zIndex: -1,
          opacity: 0.1,
        }}
        maxW="7xl"
        mx="auto"
        px={{ base: 2, md: 6, lg: 8 }}
      >
        <GoBackButton />

        <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden">
          <Box p={8} pb={6}>
            <VStack spacing={4} align="stretch">
              <Heading as="h1" size="xl" color="gray.800" lineHeight="shorter">
                {post?.title}
              </Heading>
              <HStack spacing={4} py={2}>
                <Avatar
                  size="md"
                  name={post?.user.username}
                  src={post?.user.avatar || '/defaultAvatar.jpg'}
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold" color="gray.700">
                    {post?.user.username}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Auteur de l'annonce
                  </Text>
                </VStack>
              </HStack>
              {user?.id === post?.userId && (
                <PostViewOptions
                  post={post}
                  openDeleteModal={openDeleteModal}
                  isDeleteModalOpen={isDeleteModalOpen}
                  closeDeleteModal={closeDeleteModal}
                  handleDelete={handleDelete}
                />
              )}

              <Divider />
            </VStack>
          </Box>
          {post?.image && (
            <Box position="relative" overflow="hidden" w="100%" h="400px">
              <Image
                fill
                objectFit="cover"
                alt={`Photo de l'article: ${post?.title}`}
                src={post?.image}
                fallbackSrc="/boardgame.jpg"
                style={{
                  transition: 'transform 0.3s ease',
                }}
                className="hover:scale-105"
                sizes="max-width: 600px"
              />
            </Box>
          )}
          <Box p={8} pt={post?.image ? 6 : 0}>
            <Text
              fontSize="lg"
              lineHeight="tall"
              color="gray.700"
              whiteSpace="pre-wrap"
            >
              {post?.body}
            </Text>
          </Box>
          {post?.games && post.games.length > 0 && (
            <PostViewGames games={post.games} />
          )}
          <Box p={0} pt={0} w="100%" maxW="none">
            <CommentsSection
              postId={post?.id}
              comments={post?.comments || []}
              onCommentsUpdate={handleCommentsUpdate}
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default PostViewPage;
