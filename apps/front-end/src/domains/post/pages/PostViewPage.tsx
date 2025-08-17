'use client';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  VStack,
  Text,
} from '@chakra-ui/react';
import GoBackButton from '@frontend/domains/shared/button/components/GoBackButton';
import React, { useState } from 'react';
import { Post } from '../type';
import GameCard from '@frontend/domains/shared/card/components/GameCard';
import Image from '@frontend/domains/shared/image/components/Image';
import CommentsSection from '@frontend/domains/comment/components/CommentsSection';
import { getPostById } from '../api/getPostById';

type Props = {
  post: Post;
};

const PostViewPage = (props: Props) => {
  const { post: initialPost } = props;
  const [post, setPost] = useState<Post>(initialPost);

  const handleCommentsUpdate = async () => {
    try {
      const updatedPost = await getPostById(initialPost.id.toString());
      setPost(updatedPost);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des commentaires:', error);
    }
  };

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
            <Box p={8} pt={0}>
              <Heading as="h2" size="md" mb={4} color="meeple.600">
                Jeux associés à ce post
              </Heading>
              <Flex wrap="wrap" gap={4}>
                {post.games.map((game) => (
                  <Box key={game.id} minW="250px" maxW="300px" flex="1 1 250px">
                    <GameCard game={game} />
                  </Box>
                ))}
              </Flex>
            </Box>
          )}
          <Box p={8} pt={0}>
            <Divider mb={4} />
            <HStack justify="space-between">
              <Badge colorScheme="brand" variant="subtle">
                Article de blog
              </Badge>
              <HStack spacing={2}>
                <Link href="/posts">
                  <Button variant="outline" size="sm">
                    Voir tous les articles
                  </Button>
                </Link>
              </HStack>
            </HStack>
          </Box>

          <Box p={0} pt={0} w="100%" maxW="none">
            <CommentsSection
              postId={post.id}
              comments={post.comments || []}
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
