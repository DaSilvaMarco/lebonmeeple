import React from 'react';
import HomePage from '@frontend/domains/home/pages/HomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Page d\'accueil pour Le Bon Meeple. Découvrez nos services de manière accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

const App = () => {
  return (
    <>
      <HomePage />
    </>
  );
};

export default App;
