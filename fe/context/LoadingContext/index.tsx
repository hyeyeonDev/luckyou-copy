'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type LoadingContextType = {
  isLoading: boolean;
  loadingText: string;
  setIsLoading: (isLoading: boolean) => void;
  setLoadingText: (text: string) => void;
  showLoading: (text?: string) => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('잠시만 기다려주세요');

  const showLoading = useCallback((text?: string) => {
    if (text) {
      setLoadingText(text);
    }
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingText,
        setIsLoading,
        setLoadingText,
        showLoading,
        hideLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
