import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Provider } from '../ui/Provider';
import PageLayout from '../ui/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Le Bon Meeple',
  description: 'Le blog des pros des jeux de société',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Provider>
          <PageLayout>{children}</PageLayout>
        </Provider>
      </body>
    </html>
  );
}
