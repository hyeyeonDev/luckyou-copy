'use client';

import React from 'react';
import { Spinner } from 'flowbite-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  loadingText?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, loadingText = '잠시만 기다려주세요' }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex items-center gap-3">
          <Spinner aria-label="로딩 중" size="md" color="purple" />
          <span className="text-gray-700 font-medium">{loadingText}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
