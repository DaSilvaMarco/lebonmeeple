import React from 'react';
import ProfileEditPage from '@frontend/domains/user/pages/ProfileEditPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modifier le profil',
  description:
    'Page de modification du profil utilisateur pour Le Bon Meeple. Mettez à jour vos informations personnelles de manière accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

const App = () => {
  return (
    <>
      <ProfileEditPage />
    </>
  );
};

export default App;
