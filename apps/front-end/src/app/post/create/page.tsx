import React from 'react';
import PostCreatePage from '@frontend/domains/post/pages/PostCreatePage';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: "Création de l'article",
  description:
    'Page de création de l’article pour Le Bon Meeple. Créez un nouvel article de façon accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

const App = () => {
  return (
    <>
      <PostCreatePage />
    </>
  );
};

export default App;
