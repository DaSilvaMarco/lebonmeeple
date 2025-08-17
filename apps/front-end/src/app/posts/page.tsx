import PostsClientPage from '@frontend/domains/post/pages/PostsClientPage';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liste des jeux',
  description:
    'Page de listing des jeux pour Le Bon Meeple. Ajoutez, modifiez ou supprimez des jeux de manière accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

const App = () => {

  return (
    <>
      <PostsClientPage />
    </>
  );
};

export default App;
