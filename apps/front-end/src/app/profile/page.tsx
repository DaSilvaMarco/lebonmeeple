import ProfilePage from '@frontend/domains/user/pages/ProfilePage';
import React from 'react';
import Head from 'next/head';

export function App() {
  return (
    <>
      <Head>
        <title>Profil utilisateur | LebonMeeple</title>
        <meta
          name="description"
          content="Page de profil utilisateur sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Profil utilisateur | LebonMeeple" />
        <meta
          property="og:description"
          content="Page de profil utilisateur sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta property="og:type" content="website" />
      </Head>
      <ProfilePage />
    </>
  );
}

export default App;
