import React from 'react';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import Providers from '@/components/Providers';

import '@/style/globals.css';
import '@/style/icons.css';

const notoSansKr = Noto_Sans_KR({ subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
export const metadata: Metadata = {
  title: 'LuckYou',
  description: 'By Team SJD',
  openGraph: {
    title: 'LuckYou',
    description: 'By Team SJD',
    images: [
      {
        url: `${baseUrl}/images/thumbnail.png`,
        width: 760,
        height: 760,
        alt: 'logo',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.className} antialiased`}>
        <Providers>
          <AuthProvider>
            <div className="relative h-screen flex flex-row justify-between align-top bg-gray-200 dark:bg-gray-800">
              {children}
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
