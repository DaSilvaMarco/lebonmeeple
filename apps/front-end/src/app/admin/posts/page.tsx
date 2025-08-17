import React from 'react';
import AdminPostsClientPage from '@frontend/domains/admin/pages/AdminPostsClientPage';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin articles',
  description:
    'Page d’administration des articles pour Le Bon Meeple. Gérez les articles des utilisateurs de façon accessible et conforme au RGAA.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function App() {
  return (
    <>
      <AdminPostsClientPage />
    </>
  );
}
