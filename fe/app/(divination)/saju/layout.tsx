import React from 'react';
import { SajuProvider } from '@/context/SajuContext';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SajuProvider>{children}</SajuProvider>;
}
