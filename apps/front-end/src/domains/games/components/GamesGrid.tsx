'use client';

import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../constants';
import { Game } from '../type';
import GameCardPreview from '@frontend/domains/shared/card/components/GameCardPreview';

type Props = {
  games: Game[];
};

const GamesGrid = (props: Props) => {
  const { games } = props;
  const MotionGridItem = motion(GridItem);
  const MotionGrid = motion(Grid);

  return (
    <MotionGrid
      as="section"
      role="list"
      aria-labelledby="posts-grid-title"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      templateColumns={{
        base: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={6}
      px={{ base: 4, md: 6, lg: 8 }}
      pb={8}
      w="100%"
      maxW="full"
      mx="auto"
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
      {games.map((game: Game) => (
        <MotionGridItem
          as="div"
          role="listitem"
          aria-label={`Jeux : ${game.name}`}
          key={game.id}
          w="100%"
          variants={itemVariants}
          whileHover={{
            y: -8,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
          }}
          style={{ originY: 0.5 }}
        >
          <GameCardPreview game={game} />
        </MotionGridItem>
      ))}
    </MotionGrid>
  );
};

export default GamesGrid;
