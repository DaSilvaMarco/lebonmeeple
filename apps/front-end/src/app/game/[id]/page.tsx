import React from 'react';
import Head from 'next/head';

import { getGame } from '@frontend/domains/games/api/get-game';
import GameViewPage from '@frontend/domains/games/pages/GameViewPage';

interface PageProps {
  params: { id: string };
}

const App = async ({ params }: PageProps) => {
  const { id } = await params;
  const game = await getGame(id);

  return (
    <>
      <Head>
        <title>Voir le jeu | LebonMeeple</title>
        <meta
          name="description"
          content="Page de visualisation d'un jeu sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GameViewPage game={game} />
    </>
  );
};

export default App;
