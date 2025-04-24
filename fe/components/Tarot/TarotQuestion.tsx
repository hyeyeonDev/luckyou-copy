'use client';

import React, { useState } from 'react';
import { useTarot } from '@/context/TarotContext';
import { useLoading } from '@/context/LoadingContext';
import { Search, BookOpen } from 'lucide-react';
import TarotTopic from '@/components/Tarot/TarotTopic';
import CustomTextInput from '@/components/shared/Custom/CustomTextInput';
import LuckYouButton from '../shared/LuckYouButton';

const TarotQuestion: React.FC = () => {
  const { topic, setTopic, setQuestion } = useTarot();
  const { isLoading } = useLoading();
  const [customQuestion, setCustomQuestion] = useState<string>('');

  return (
    <div className="w-full max-w-screen-sm">
      {/* title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent mb-2">
        타로 운세
      </h1>

      {/* description */}
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        궁금한 것을 질문하거나 주제를 선택하여 타로카드로 당신의 운세를 확인하세요
      </p>

      {/* content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          <BookOpen className="mr-2" />
          나만의 질문하기
        </h2>

        <div className="flex flex-col space-y-4">
          <CustomTextInput
            type="text"
            icon={() => <Search size={18} className="text-gray-400" />}
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="궁금한 것을 질문해보세요 (예: 내 앞날에 어떤 기회가 올까요?)"
          />

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              또는 관심있는 주제를 선택하세요
            </h2>

            <TarotTopic topic={topic} setTopic={setTopic} />
          </div>

          {/* 제출 버튼 */}
          <div className="mt-8">
            <LuckYouButton
              disabled={isLoading || (!customQuestion && !topic)}
              onClick={() => setQuestion(customQuestion)}
            >
              {isLoading ? '타로카드 준비 중...' : '타로카드 운세 보기'}
            </LuckYouButton>
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg text-sm">
        <p className="font-medium mb-2">타로카드 운세는 어떻게 진행되나요?</p>
        <ul className="list-decimal pl-5 space-y-1">
          <li>질문을 입력하거나 관심 주제를 선택하세요.</li>
          <li>마음을 가라앉히고 집중해서 타로카드를 선택해 주세요.</li>
          <li>선택된 카드의 의미와 당신의 상황에 맞는 해석을 받아보세요.</li>
          <li>타로카드는 미래를 예언하는 것이 아닌, 현재 상황에서 도움이 될 수 있는 통찰력을 제공합니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default TarotQuestion;
