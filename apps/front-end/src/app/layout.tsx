import React from 'react';
import { Provider } from '@/ui/Provider';
import PageLayout from '@/domains/shared/layout/components/PageLayout';
import { ReduxProvider } from '@frontend/store/ReduxProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <Provider>
            <PageLayout>{children}</PageLayout>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
