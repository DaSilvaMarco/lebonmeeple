import React from 'react';
import Head from 'next/head';
import HomePage from '@frontend/domains/home/pages/HomePage';

const App = () => {
  return (
    <>
      <Head>
        <title>Accueil | LebonMeeple</title>
        <meta
          name="description"
          content="Page d'accueil de LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Accueil | LebonMeeple" />
        <meta
          property="og:description"
          content="Page d'accueil de LebonMeeple. Accessible et conforme RGAA."
        />
        <meta property="og:type" content="website" />
      </Head>
      <HomePage />
    </>
  );
};

export default App;
