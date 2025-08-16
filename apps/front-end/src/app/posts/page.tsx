import PostsClientPage from '@frontend/domains/post/pages/PostsClientPage';
import React from 'react';
import Head from 'next/head';

const App = () => {
  return (
    <>
      <Head>
        <title>Liste des posts | LebonMeeple</title>
        <meta
          name="description"
          content="Page listant tous les posts sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PostsClientPage />
    </>
  );
};

export default App;
