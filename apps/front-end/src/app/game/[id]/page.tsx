import React from 'react';
import { getGame } from '@frontend/domains/games/api/get-game';
import GameViewPage from '@frontend/domains/games/pages/GameViewPage';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const game = await getGame(id);
  return {
    title: game.name,
    description: game.description,
  };
}

interface PageProps {
  params: { id: string };
}

const App = async ({ params }: PageProps) => {
  const { id } = await params;
  const game = await getGame(id);

  return (
    <>
      <GameViewPage game={game} />
    </>
  );
};

export default App;
