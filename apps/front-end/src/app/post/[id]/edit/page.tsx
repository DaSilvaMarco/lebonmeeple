import PostEditPage from '@frontend/domains/post/pages/PostEditPage';
import React from 'react';
import Head from 'next/head';

type Props = {
  params: {
    id: string;
  };
};

const App = ({ params }: Props) => {
  return (
    <>
      <Head>
        <title>Édition du post | LebonMeeple</title>
        <meta
          name="description"
          content="Page d'édition d'un post sur LebonMeeple. Accessible et conforme RGAA."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PostEditPage postId={parseInt(params.id)} />
    </>
  );
};

export default App;
