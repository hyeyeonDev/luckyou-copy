import React from 'react';
import TarotBoard from '@/components/Tarot/Board';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '타로',
  description: '타로카드',
};

const TarotBoardPage = () => {
  return <TarotBoard />;
};

export default TarotBoardPage;
