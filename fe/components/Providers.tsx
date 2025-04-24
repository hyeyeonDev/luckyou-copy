'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { LoadingProvider } from '@/context/LoadingContext';
import LoadingOverlay from '@/components/shared/Loading/LoadingOverlay';
import { useLoading } from '@/context/LoadingContext';
import LoadingComponent from '@/components/shared/Loading/LoadingComponent';

function GlobalLoadingOverlay() {
  const { isLoading, loadingText } = useLoading();
  return <LoadingOverlay isLoading={isLoading} loadingText={loadingText} />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingComponent text="페이지를 준비하는 중입니다" />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LoadingProvider>
        <GlobalLoadingOverlay />
        {children}
      </LoadingProvider>
    </ThemeProvider>
  );
}
