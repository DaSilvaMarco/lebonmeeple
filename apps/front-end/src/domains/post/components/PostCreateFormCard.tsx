'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { useThemeColors } from '@/ui/hooks';
import WelcomePostCreateFormCard from './WelcomePostCreateFormCard';
import PostCreateForm from './PostCreateForm';

const PostCreateFormCard = () => {
  const { cardBg, borderColor } = useThemeColors();

  return (
    <Box
      bg={cardBg}
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
      <WelcomePostCreateFormCard />
      <PostCreateForm />
    </Box>
  );
};

export default PostCreateFormCard;
