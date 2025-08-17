import ProfilePage from '@frontend/domains/user/pages/ProfilePage';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page de profil',
  description:
    'Page du profil utilisateur pour Le Bon Meeple. Vos informations personnelles de manière accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

export function App() {
  return (
    <>
      <ProfilePage />
    </>
  );
}

export default App;
