import React from 'react';
import TarotQuestion from '@/components/Tarot/TarotQuestion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '타로 질문',
  description: '타로카드',
};

const TarotQuestionPage = () => {
  return <TarotQuestion />;
};

export default TarotQuestionPage;
