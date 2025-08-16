import React from 'react';
import Head from 'next/head';

import PostViewPage from '@frontend/domains/post/pages/PostViewPage';
import { getPostById } from '@frontend/domains/post/api/getPostById';

interface PageProps {
  params: { id: string };
}

const App = async ({ params }: PageProps) => {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <>
      <Head>
        <title>Voir le post | LebonMeeple</title>
        <meta
          name="description"
          content="Page de visualisation d'un post sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PostViewPage post={post} />
    </>
  );
};

export default App;
