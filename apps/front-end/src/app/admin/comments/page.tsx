import React from 'react';
import AdminCommentsClientPage from '@frontend/domains/admin/pages/AdminCommentsClientPage';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin commentaires',
  description:
    'Page d’administration des commentaires pour Le Bon Meeple. Gérez les commentaires des utilisateurs de façon accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function App() {
  return (
    <>
      <AdminCommentsClientPage />
    </>
  );
}
