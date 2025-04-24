// components/shared/InfoList.tsx
import React, { ReactNode } from 'react';

interface InfoListProps {
  children: ReactNode;
}

const InfoList: React.FC<InfoListProps> = ({ children }) => {
  return (
    <div className="mt-6 border-t border-gray-200">
      <dl className="divide-y divide-gray-200">{children}</dl>
    </div>
  );
};

export default InfoList;
