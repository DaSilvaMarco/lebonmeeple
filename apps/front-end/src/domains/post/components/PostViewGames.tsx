import { Box, Heading, Flex } from '@chakra-ui/react';
import GameCardPreview from '@frontend/domains/games/components/GameCardPreview';
import { Game } from '@frontend/domains/games/type';
import React from 'react';

type Props = {
  games: Game[];
}

const PostViewGames = (props: Props) => {
  const { games } = props;
  return (
    <Box p={8} pt={0}>
      <Heading as="h2" size="md" mb={4} color="meeple.600">
        Jeux associés à ce post
      </Heading>
      <Flex wrap="wrap" gap={4}>
        {games.map((game) => (
          <Box key={game.id} minW="250px" maxW="300px" flex="1 1 250px">
            <GameCardPreview game={game} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default PostViewGames;
