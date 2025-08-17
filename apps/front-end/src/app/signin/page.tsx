import React from 'react';
import SigninPage from '@frontend/domains/user/pages/SigninPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Se connecter',
  description:
    'Page de connexion pour Le Bon Meeple. Accédez à votre compte de manière accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

const App = () => {
  return (
    <>
      <SigninPage />
    </>
  );
};

export default App;
