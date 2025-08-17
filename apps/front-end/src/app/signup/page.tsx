import React from 'react';
import SignupPage from '@frontend/domains/user/pages/SignupPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Créer un compte',
  description:
    'Page de création de compte pour Le Bon Meeple. Inscrivez-vous de manière accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};
export default function App() {
  return (
    <>
      <SignupPage />
    </>
  );
}
