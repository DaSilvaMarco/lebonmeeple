import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Provider } from '@/ui/Provider';
import PageLayout from '@/domains/shared/layout/components/PageLayout';
import { ReduxProvider } from '@/components/ReduxProvider';

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
        <ReduxProvider>
          <Provider>
            <PageLayout>{children}</PageLayout>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
