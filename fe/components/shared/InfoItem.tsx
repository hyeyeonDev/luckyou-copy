// components/shared/InfoItem.tsx
import React from 'react';

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="py-4 grid grid-cols-3 gap-4 text-sm">
      <dt className="font-medium text-gray-500">{label}</dt>
      <dd className="mt-0 col-span-2">{value}</dd>
    </div>
  );
};

export default InfoItem;
