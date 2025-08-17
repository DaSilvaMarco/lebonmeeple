'use client';

import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import PostCreateForm from './PostCreateForm';

const PostCreateFormCard = () => {
  const cardBg = useColorModeValue('white', 'neutral.800');
  const borderColor = useColorModeValue('neutral.200', 'neutral.600');

  return (
    <Box
      as="section"
      role="region"
      aria-labelledby="post-create-form-card-title"
      bg={cardBg}
      my={8}
      p={{ base: 6, md: 10 }}
      borderRadius="2xl"
      shadow="2xl"
      border="1px"
      borderColor={borderColor}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        right: '-1px',
        bottom: '-1px',
        borderRadius: '2xl',
        background: 'linear-gradient(135deg, brand.400, meeple.400, game.400)',
        zIndex: -1,
        opacity: 0.1,
      }}
    >
      <h1
        id="post-create-form-card-title"
        style={{
          position: 'absolute',
          left: '-9999px',
          height: '1px',
          width: '1px',
          overflow: 'hidden',
        }}
      >
        Création d’un nouvel article
      </h1>
      <PostCreateForm />
    </Box>
  );
};

export default PostCreateFormCard;
