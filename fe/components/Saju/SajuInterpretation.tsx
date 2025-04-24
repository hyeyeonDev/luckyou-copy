// components/SajuInterpretation.tsx
import React from 'react';
import { X } from 'lucide-react';
import { SAJU_DATA, SAJU_KEY, SajuResponse } from '@/types/Saju';
import ShareButton from '../shared/ShareButton';
import { timeAgo } from '@/utils/timer';

interface SajuInterpretationProps {
  data: SajuResponse | null;
  handleClose: () => void;
}

const SajuInterpretation: React.FC<SajuInterpretationProps> = ({ data, handleClose }) => {
  if (!data) return;

  const { question, interpretation, createdAt } = data;

  return (
    <div className="max-w-lg p-5 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="flex justify-between border-b mb-3">
        <h3 className="text-lg font-semibold pb-2">{SAJU_DATA[question].topic}</h3>
        <div onClick={handleClose}>
          <X />
        </div>
      </div>
      <div className="leading-relaxed whitespace-pre-wrap">{interpretation}</div>
      <div className="flex justify-between items-center border-t mt-3 p-2">
        <div className="text-sm text-gray-500 dark:text-gray-400">{timeAgo(createdAt)}</div>
        <ShareButton data={data} />
      </div>
    </div>
  );
};

export default SajuInterpretation;
