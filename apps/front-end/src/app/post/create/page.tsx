import React from 'react';
import Head from 'next/head';

import PostCreatePage from '@frontend/domains/post/pages/PostCreatePage';

const App = () => {
  return (
    <>
      <Head>
        <title>Créer un post | LebonMeeple</title>
        <meta
          name="description"
          content="Page de création d'un post sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PostCreatePage />
    </>
  );
};

export default App;
