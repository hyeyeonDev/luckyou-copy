// components/History/HistoryList.tsx
import React, { ReactNode } from 'react';

interface HistoryListProps {
  children: ReactNode;
}

const HistoryList: React.FC<HistoryListProps> = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

export default HistoryList;
