import React from 'react';
import Head from 'next/head';
import ProfileEditPage from '@frontend/domains/user/pages/ProfileEditPage';

const App = () => {
  return (
    <>
      <Head>
        <title>Édition du profil | LebonMeeple</title>
        <meta
          name="description"
          content="Page d'édition du profil utilisateur sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Édition du profil | LebonMeeple" />
        <meta
          property="og:description"
          content="Page d'édition du profil utilisateur sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta property="og:type" content="website" />
      </Head>
      <ProfileEditPage />
    </>
  );
};

export default App;
