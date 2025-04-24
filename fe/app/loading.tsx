'use client';

import React from 'react';
import LoadingComponent from '@/components/shared/Loading/LoadingComponent';

const Loading = ({ text = '정보를 불러오는 중입니다' }: { text?: string }) => {
  return <LoadingComponent text={text} />;
};

export default Loading;
