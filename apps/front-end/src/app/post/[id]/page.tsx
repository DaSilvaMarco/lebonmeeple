import React from 'react';
import PostViewPage from '@frontend/domains/post/pages/PostViewPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liste des jeux',
  description:
    'Page de jeu pour Le Bon Meeple. Ajoutez, modifiez ou supprimez des jeux de manière accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

const App = async () => {
return (
    <>
      <PostViewPage />
    </>
  );
};

export default App;
