import React from 'react';
import SajuInput from '@/components/Saju/SajuInput';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '사주 정보',
  description: '사주풀이',
};

const SajuInfoPage = () => {
  return <SajuInput />;
};

export default SajuInfoPage;
