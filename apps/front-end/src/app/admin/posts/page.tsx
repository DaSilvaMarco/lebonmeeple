import React from 'react';
import Head from 'next/head';

import AdminPostsClientPage from '@frontend/domains/admin/pages/AdminPostsClientPage';

export default function App() {
  return (
    <>
      <Head>
        <title>Gestion des posts - Administration | LebonMeeple</title>
        <meta
          name="description"
          content="Page d'administration pour la gestion des posts sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta
          property="og:title"
          content="Gestion des posts - Administration | LebonMeeple"
        />
        <meta
          property="og:description"
          content="Page d'administration pour la gestion des posts sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta property="og:type" content="website" />
      </Head>
      <AdminPostsClientPage />
    </>
  );
}
