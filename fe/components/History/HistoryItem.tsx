// components/History/HistoryItem.tsx
import React from 'react';
import classNames from 'classnames';
import { Clock, Trash2 } from 'lucide-react';
import { timeAgo } from '@/utils/timer';

interface HistoryItemProps {
  timestamp: Date;
  question: string;
  handleClick: () => void;
  handleDelete: () => void;
  activeColor: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ timestamp, question, handleClick, handleDelete, activeColor }) => {
  return (
    <>
      <div
        className={classNames(
          `group bg-white dark:bg-gray-800 rounded-lg p-2.5 my-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer`,
          `border-l-4 border-transparent hover:border-l-4 hover:border-${activeColor}-500`
        )}
      >
        <div onClick={handleClick} className="flex flex-row justify-between items-center">
          <div className="font-medium text-gray-800 dark:text-gray-100 mb-1 line-clamp-2">
            {question}

            {/* 생성시간 */}
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock size={12} className="mr-1" />
              {timeAgo(timestamp)}
            </div>
          </div>
          {/* 삭제 버튼 */}
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Trash2 size={14} className="text-red-500 dark:text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryItem;
