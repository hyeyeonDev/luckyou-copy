import React from 'react';
import SajuBoard from '@/components/Saju/Board';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '사주',
  description: '사주풀이',
};

const SajuBoardPage = () => {
  return <SajuBoard />;
};

export default SajuBoardPage;
