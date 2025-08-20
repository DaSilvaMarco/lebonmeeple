import React from 'react';
import GameViewPage from '@frontend/domains/games/pages/GameViewPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jeu',
  description:
    'Page d’affichage des jeux pour Le Bon Meeple.',
  robots: {
    index: false,
    follow: false,
  },
};

const App = async () => {
return (
    <>
      <GameViewPage />
    </>
  );
};

export default App;
