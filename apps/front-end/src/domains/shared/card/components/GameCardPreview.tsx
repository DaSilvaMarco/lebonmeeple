import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import Image from '@frontend/domains/shared/image/components/Image';
import { Game } from '@frontend/domains/games/type';

type Props = {
  game: Game;
};

const GameCardPreview = (props: Props) => {
  const { game } = props;
  const {
    id,
    name,
    rating,
    image,
  } = game;

  const overlayBg = useColorModeValue(
    'rgba(255,255,255,0.75)',
    'rgba(30,30,30,0.7)',
  );
  const overlayText = useColorModeValue('neutral.900', 'white');

  return (
    <Link href={`/game/${id}`}>
      <Box
        position="relative"
        overflow="hidden"
        w="100%"
        h="200px"
        borderRadius="xl"
        boxShadow="md"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{ transform: 'scale(1.025)' }}
      >
        <Image
          fill
          objectFit="cover"
          alt={`Photo du jeu ${name}`}
          src={image || '/boardgame.jpg'}
          fallbackSrc="/boardgame.jpg"
          style={{ transition: 'transform 0.3s ease' }}
          className="hover:scale-105"
          sizes="max-width: 600px"
        />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          w="100%"
          px={4}
          py={3}
          bg={overlayBg}
          color={overlayText}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomRadius="xl"
          backdropFilter="blur(4px)"
        >
          <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
            {name}
          </Text>
          <Text fontWeight="semibold" fontSize="md" ml={3}>
            ⭐ {rating}/10
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default GameCardPreview;
