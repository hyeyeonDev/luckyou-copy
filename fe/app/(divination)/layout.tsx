'use client';

import React from 'react';
import HistoryDrawer from '@/components/History/HistoryDrawer';
import Footer from '@/components/Layout/Footer';
import { HistoryProvider } from '@/context/HistoryContext';
import Header from '@/components/Layout/Header';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <HistoryProvider>
      <HistoryDrawer />
      <div className="w-screen flex flex-col justify-between">
        {/* top nav */}
        <Header />

        {/* main */}
        <main className="flex-1 w-full overflow-y-auto scroll-custom">
          <div className="flex flex-col items-center justify-center min-h-full px-6">{children}</div>
        </main>

        {/* footer */}
        <Footer />
      </div>
    </HistoryProvider>
  );
}
