import React from 'react';
import Head from 'next/head';

import AdminCommentsClientPage from '@frontend/domains/admin/pages/AdminCommentsClientPage';

export default function App() {
  return (
    <>
      <Head>
        <title>Gestion des commentaires - Administration | LebonMeeple</title>
        <meta
          name="description"
          content="Page d'administration pour la gestion des commentaires sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminCommentsClientPage />
    </>
  );
}
