'use client';

import { Avatar, Badge, Box, Button, Divider, Flex, Heading, HStack, Link, VStack, Text, Image } from "@chakra-ui/react";
import GoBackButton from "@frontend/domains/shared/button/components/GoBackButton";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getPostById } from "../api/getPostById";
import { Post } from "../type";

const PostViewPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [post, setData] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setData(post);
      } catch (error) {
        console.log(`${error}`);
      }
    };
    fetchPost();
  }, [id]);

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
            <Box px={8}>
              <Image
                src={post?.image || '/boardgame.jpg'}
                alt={`Image de l'article: ${post?.title}`}
                w="full"
                maxH="400px"
                objectFit="cover"
                borderRadius="lg"
                shadow="sm"
                fallbackSrc="/boardgame.jpg"
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
        </Box>
      </Box>
    </Flex>
  );
};

export default PostViewPage;