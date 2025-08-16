import React from 'react';
import Head from 'next/head';
import SigninPage from '@frontend/domains/user/pages/SigninPage';

const App = () => {
  return (
    <>
      <Head>
        <title>Connexion | LebonMeeple</title>
        <meta
          name="description"
          content="Page de connexion à LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Connexion | LebonMeeple" />
        <meta
          property="og:description"
          content="Page de connexion à LebonMeeple. Accessible et conforme RGAA."
        />
        <meta property="og:type" content="website" />
      </Head>
      <SigninPage />
    </>
  );
};

export default App;
