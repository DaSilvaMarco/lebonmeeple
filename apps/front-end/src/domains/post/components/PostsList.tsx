'use client';

import React from 'react';
import { Text, Center, Flex, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PostCard from '@frontend/domains/post/components/PostCard';
import { type Post } from '@frontend/domains/post/type';
import { containerVariants } from '../constants';

type Props = {
  posts: Post[];
};

const PostsList = (props: Props) => {
  const { posts } = props;
  const MotionFlex = motion(Flex);

  return (
    <Flex justify="center" align="flex-start" p={2} w="100%" minH="100vh">
      <Box w="100%" borderRadius="2xl" overflow="hidden">
        <MotionFlex
          as="section"
          role="list"
          aria-labelledby="posts-grid-title"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          wrap="wrap"
          gap={6}
          px={{ base: 4, md: 6, lg: 8 }}
          pb={8}
          w="100%"
          maxW="1200px"
          mx="auto"
          justifyContent="center"
        >
          <h2
            id="posts-grid-title"
            style={{
              position: 'absolute',
              left: '-9999px',
              height: '1px',
              width: '1px',
              overflow: 'hidden',
            }}
          >
            Liste des articles
          </h2>
          {posts.length === 0 ? (
            <Center>
              <Text>Posts non trouvés</Text>
            </Center>
          ) : (
            <>
              {posts.map((post: Post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </>
          )}
        </MotionFlex>
      </Box>
    </Flex>
  );
};

export default PostsList;
