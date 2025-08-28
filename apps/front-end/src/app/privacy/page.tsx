import React from 'react';
import { Metadata } from 'next';
import PrivacyPage from '@frontend/domains/legal/pages/PrivacyPage';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Page de la politique de confidentialité pour Le Bon Meeple. Veuillez lire attentivement cette politique avant d\'utiliser notre service.',
  robots: {
    index: false,
    follow: false,
  },
};

const App = () => {
  return (
    <>
      <PrivacyPage />
    </>
  );
};

export default App;
