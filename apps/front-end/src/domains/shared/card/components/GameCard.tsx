import React from 'react';
import {
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from '@frontend/domains/shared/image/components/Image';
import { Game } from '@frontend/domains/games/type';

type Props = {
  game: Game;
};

const GameCard = (props: Props) => {
  const { game } = props;
  const {
    id,
    name,
    year,
    rating,
    mechanics,
    image,
    description,
    minPlayers,
    maxPlayers,
    duration,
    difficulty,
  } = game;
  const cardBg = useColorModeValue('white', 'neutral.800');
  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const textColorSecondary = useColorModeValue('neutral.600', 'white');
  const borderColor = useColorModeValue('neutral.200', 'neutral.600');

  console.log('image : ', image);

  return (
    <Link href={`/post/${id}`}>
      <Card
        bg={cardBg}
        border="1px"
        borderColor={borderColor}
        borderRadius="xl"
        overflow="hidden"
        height="100%"
        display="flex"
        flexDirection="column"
        transition="all 0.3s ease"
        cursor="pointer"
        _hover={{
          transform: 'translateY(-4px)',
          borderColor: 'brand.200',
        }}
      >
        <Box position="relative" overflow="hidden" w="100%" h="200px">
          <Image
            fill
            objectFit="cover"
            alt={`Photo du jeu ${name}`}
            src={'/boardgame.jpg'}
            fallbackSrc="/boardgame.jpg"
            style={{
              transition: 'transform 0.3s ease',
            }}
            className="hover:scale-105"
            sizes="max-width: 600px"
          />
        </Box>

        <CardBody p={5} flex="1" display="flex" flexDirection="column">
          <VStack align="stretch" spacing={3} flex="1">
            <Heading
              size="md"
              color={textColorPrimary}
              fontWeight="bold"
              lineHeight="shorter"
              noOfLines={2}
              minH="48px"
            >
              {name}
            </Heading>
            <Text color={textColorSecondary} fontSize="sm">
              <b>Année :</b> {year}
            </Text>
            <Text color={textColorSecondary} fontSize="sm">
              <b>Note :</b> {rating}/10
            </Text>
            <Text color={textColorSecondary} fontSize="sm">
              <b>Mécaniques :</b>{' '}
              {mechanics && mechanics.length > 0
                ? mechanics.join(', ')
                : 'Aucune'}
            </Text>
            <Text color={textColorSecondary} fontSize="sm">
              <b>Joueurs :</b> {minPlayers} - {maxPlayers}
            </Text>
            <Text color={textColorSecondary} fontSize="sm">
              <b>Durée :</b> {duration} min
            </Text>
            <Text color={textColorSecondary} fontSize="sm">
              <b>Difficulté :</b> {difficulty}
            </Text>
            <Text
              color={textColorSecondary}
              fontSize="sm"
              lineHeight="relaxed"
              noOfLines={3}
              flex="1"
            >
              {description}
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default GameCard;
