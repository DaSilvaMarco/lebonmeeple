'use client';

import React, { useEffect } from 'react';
import { Box, Flex, Heading, Text, VStack, Divider } from '@chakra-ui/react';
import GoBackButton from '@frontend/domains/shared/button/components/GoBackButton';
import Image from '@frontend/domains/shared/image/components/Image';
import { useParams } from 'next/navigation';
import { Game } from '../type';
import { getGame } from '../api/get-game';

const GameViewPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [game, setGame] = React.useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const fetchedGame = await getGame(id);
        setGame(fetchedGame);
      } catch (err) {
        console.error('Error fetching game:', err);
      }
    };
    fetchGame();
  }, []);

  return (
    <Flex direction="column" w="100%">
      <Flex
        flex="1"
        direction="column"
        align="center"
        justify="flex-start"
        w="100%"
        p={2}
      >
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
              <Box
                flex="1"
                minW="0"
                maxW={{ base: '100%', md: '400px' }}
                h={{ base: '220px', sm: '300px', md: '400px' }}
                minH={{ base: '180px', sm: '220px', md: '300px' }}
                position="relative"
                bg="gray.100"
                mb={{ base: 4, md: 0 }}
                mr={{ base: 0, md: 6 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                {game?.image && (
                  <Image
                    fill
                    objectFit="cover"
                    alt={`Photo du jeu: ${game?.name}`}
                    src={game?.image || '/boardgame.jpg'}
                    fallbackSrc="/boardgame.jpg"
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '120px',
                      minWidth: '100px',
                      transition: 'transform 0.3s ease',
                      display: 'block',
                    }}
                    className="hover:scale-105"
                    sizes="(max-width: 600px) 100vw, 400px"
                  />
                )}
              </Box>
              {/* Infos */}
              <Box flex="2" p={{ base: 4, md: 8 }} pb={6}>
                <VStack spacing={4} align="stretch">
                  <Heading
                    as="h1"
                    size="xl"
                    color="gray.800"
                    lineHeight="shorter"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    {game?.name}
                  </Heading>
                  <Text
                    color="gray.500"
                    fontSize="md"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Année : <b>{game?.year}</b> &nbsp;|&nbsp; Difficulté :{' '}
                    <b>{game?.difficulty}</b>
                  </Text>
                  <Text
                    color="gray.500"
                    fontSize="md"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Joueurs : <b>{game?.minPlayers}</b> -{' '}
                    <b>{game?.maxPlayers}</b> &nbsp;|&nbsp; Durée :{' '}
                    <b>{game?.duration} min</b>
                  </Text>
                  <Text
                    color="gray.500"
                    fontSize="md"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Note : <b>{game?.rating}/10</b>
                  </Text>
                  <Text
                    color="gray.500"
                    fontSize="md"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Mécaniques : <b>{game?.mechanics?.join(', ')}</b>
                  </Text>
                  <Divider />
                  <Text
                    fontSize="lg"
                    lineHeight="tall"
                    color="gray.700"
                    whiteSpace="pre-wrap"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    {game?.description}
                  </Text>
                </VStack>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default GameViewPage;
