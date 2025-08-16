import React from 'react';
import Head from 'next/head';
import SignupPage from '@frontend/domains/user/pages/SignupPage';

export default function App() {
  return (
    <>
      <Head>
        <title>Inscription | LebonMeeple</title>
        <meta
          name="description"
          content="Page d'inscription à LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Inscription | LebonMeeple" />
        <meta
          property="og:description"
          content="Page d'inscription à LebonMeeple. Accessible et conforme RGAA."
        />
        <meta property="og:type" content="website" />
      </Head>
      <SignupPage />
    </>
  );
}
