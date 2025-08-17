'use client';

import React from 'react';
import { type Game } from '../type';
import { Box, Flex, Heading, Text, VStack, Divider } from '@chakra-ui/react';
import GoBackButton from '@frontend/domains/shared/button/components/GoBackButton';
import Image from '@frontend/domains/shared/image/components/Image';

type Props = {
  game: Game;
};

const GameViewPage = (props: Props) => {
  const { game } = props;

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
        maxW="5xl"
        mx="auto"
        px={{ base: 2, md: 6, lg: 8 }}
      >
        <GoBackButton />
        <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden">
          <Flex direction={{ base: 'column', md: 'row' }}>
            {/* Image */}
            <Box
              flex="1"
              minW="300px"
              maxW="400px"
              h={{ base: '250px', md: '400px' }}
              position="relative"
              bg="gray.100"
            >
              {game?.image && (
                <Image
                  fill
                  objectFit="cover"
                  alt={`Photo du jeu: ${game?.name}`}
                  src={'/boardgame.jpg'}
                  fallbackSrc="/boardgame.jpg"
                  style={{ transition: 'transform 0.3s ease' }}
                  className="hover:scale-105"
                  sizes="max-width: 400px"
                />
              )}
            </Box>
            {/* Infos */}
            <Box flex="2" p={8} pb={6}>
              <VStack spacing={4} align="stretch">
                <Heading
                  as="h1"
                  size="xl"
                  color="gray.800"
                  lineHeight="shorter"
                >
                  {game?.name}
                </Heading>
                <Text color="gray.500" fontSize="md">
                  Année : <b>{game?.year}</b> &nbsp;|&nbsp; Difficulté :{' '}
                  <b>{game?.difficulty}</b>
                </Text>
                <Text color="gray.500" fontSize="md">
                  Joueurs : <b>{game?.minPlayers}</b> -{' '}
                  <b>{game?.maxPlayers}</b> &nbsp;|&nbsp; Durée :{' '}
                  <b>{game?.duration} min</b>
                </Text>
                <Text color="gray.500" fontSize="md">
                  Note : <b>{game?.rating}/10</b>
                </Text>
                <Text color="gray.500" fontSize="md">
                  Mécaniques : <b>{game?.mechanics?.join(', ')}</b>
                </Text>
                <Divider />
                <Text
                  fontSize="lg"
                  lineHeight="tall"
                  color="gray.700"
                  whiteSpace="pre-wrap"
                >
                  {game?.description}
                </Text>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default GameViewPage;
