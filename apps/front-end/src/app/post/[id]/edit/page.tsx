import PostEditPage from '@frontend/domains/post/pages/PostEditPage';
import React from 'react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edition de l\'article',
  description:
    'Page d’édition de l’article pour Le Bon Meeple. Modifiez le contenu de l’article de façon accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  params: {
    id: string;
  };
};

const App = ({ params }: Props) => {
  return (
    <>
      <PostEditPage postId={parseInt(params.id)} />
    </>
  );
};

export default App;
