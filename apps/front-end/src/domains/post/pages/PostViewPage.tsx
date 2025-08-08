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
    <Flex py={8}>
      <Box maxW="4xl" mx="auto" w="full" px={4}>
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

          <Box p={8} pt={0}>
            <CommentsSection
              postId={post.id}
              comments={post.comments || []}
              onCommentsUpdate={handleCommentsUpdate}
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default PostViewPage;
