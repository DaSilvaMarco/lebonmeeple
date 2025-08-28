import React from 'react';
import { Metadata } from 'next';
import TermsPage from '@frontend/domains/legal/pages/TermsPage';

export const metadata: Metadata = {
  title: 'Termes et conditions',
  description:
    'Page des termes et conditions pour Le Bon Meeple. Veuillez lire attentivement ces termes avant d\'utiliser notre service.',
  robots: {
    index: false,
    follow: false,
  },
};

const App = () => {
  return (
    <>
      <TermsPage />
    </>
  );
};

export default App;
