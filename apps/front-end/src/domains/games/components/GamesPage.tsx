'use client';

import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { useAppSelector } from '@frontend/store/hook';
import GamesGrid from './GamesGrid';

const GamesPage = () => {
  const { games } = useAppSelector((state) => state.games);

  return (
    <Flex justify="center" align="flex-start" p={2} w="100%">
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
      >
        <GamesGrid games={games} />
      </Box>
    </Flex>
  );
};

export default GamesPage;
