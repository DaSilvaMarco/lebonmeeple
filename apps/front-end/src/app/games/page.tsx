import React from 'react';
import Head from 'next/head';
import GamesClientPage from '@frontend/domains/games/components/GamesClientPage';

const App = () => {
  return (
    <>
      <Head>
        <title>Liste des jeux de société | LebonMeeple</title>
        <meta
          name="description"
          content="Page listant tous les jeux de société sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GamesClientPage />
    </>
  );
};

export default App;
