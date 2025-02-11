// filepath: /workspaces/search_app/app/layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '@/lib/msalConfig';

const inter = Inter({ subsets: ['latin'] });

const msalInstance = new PublicClientApplication(msalConfig);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={inter.className}>
        <MsalProvider instance={msalInstance}>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </MsalProvider>
      </body>
    </html>
  );
}