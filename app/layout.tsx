import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '@/lib/msalConfig';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'חיפוש מומחים',
  description: 'מערכת לחיפוש מומחים לפי יום ועיר',
};

const msalInstance = new PublicClientApplication(msalConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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