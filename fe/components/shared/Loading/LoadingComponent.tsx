'use client';

import React from 'react';
import { Spinner } from 'flowbite-react';

interface LoadingComponentProps {
  text?: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ text = '사주 정보를 불러오는 중입니다' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex items-center gap-3">
          <Spinner aria-label="로딩 중" size="md" color="purple" />
          <span className="text-gray-700 font-medium">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
