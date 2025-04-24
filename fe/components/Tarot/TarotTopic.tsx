// components/TarotTopic.tsx

import React from 'react';
import { TAROT_DATA, TAROT_KEY } from '@/types/Tarot';
import { Button } from 'flowbite-react';

interface TarotTopicProps {
  topic: TAROT_KEY | null;
  setTopic: (topic: TAROT_KEY | null) => void;
}

const TarotTopic: React.FC<TarotTopicProps> = ({ topic, setTopic }) => {
  return (
    <div className="md:text-sm text-xs my-3">
      <div className="grid grid-cols-9 md:grid-cols-12 gap-2">
        {Object.keys(TAROT_DATA).map((key, i) => {
          const isActive = topic === key;

          return (
            <div key={`tarot-${key}`} className="col-span-3">
              <Button
                color="white"
                className={`w-full rounded-lg border-2 transition-all shadow-md ${
                  isActive
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
                onClick={() => {
                  setTopic(key);
                }}
              >
                {TAROT_DATA[key].topic}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TarotTopic;
