'use client';

import React from 'react';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { useHistory } from '@/context/HistoryContext';

const HistoryButton = () => {
  const { isOpen, setIsOpen } = useHistory();

  return (
    <button
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
    </button>
  );
};

export default HistoryButton;
