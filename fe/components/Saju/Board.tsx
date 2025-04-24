'use client';

import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSaju } from '@/context/SajuContext';
import { useLoading } from '@/context/LoadingContext';
import SajuManseryeok from '@/components/Saju/SajuManseryeok';
import SajuInformation from '@/components/Saju/SajuInformation';
import SajuTopic from '@/components/Saju/SajuTopic';
import SajuInterpretation from '@/components/Saju/SajuInterpretation';

const SajuBoard = () => {
  const { sajuInfo, saju, topic, setTopic, interpretation, isPageLoading, loadingText, sajuResponse } = useSaju();
  const { showLoading, hideLoading, setLoadingText } = useLoading();
  const router = useRouter();

  useEffect(() => {
    if (!sajuInfo.name || !sajuInfo.birthDate || !sajuInfo.birthTime) {
      router.push('/saju/info');
    }
  }, []);

  // 로딩 상태 관리 함수
  const handleLoadingState = useCallback(() => {
    if (isPageLoading) {
      setLoadingText(loadingText);
      showLoading();
    } else {
      hideLoading();
    }
  }, [isPageLoading, loadingText, showLoading, hideLoading, setLoadingText]);

  // isPageLoading이 변경될 때 전역 로딩 상태 업데이트
  useEffect(() => {
    handleLoadingState();
  }, [handleLoadingState]);

  // 컴포넌트 마운트 시 로딩 상태 초기화
  useEffect(() => {
    // 페이지 로드 완료 시 모든 로딩 UI 숨김
    hideLoading();
  }, [hideLoading]);

  return (
    <div className="p-8 my-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-md md:max-w-fit">
      {!interpretation ? (
        <div className="md:flex md:justify-between md:gap-8">
          {/* 사주 결과 없을 경우 화면 */}
          <SajuInformation sajuInfo={sajuInfo} />
          {saju && <SajuManseryeok saju={saju} />}
        </div>
      ) : (
        <>
          <SajuInterpretation data={sajuResponse} handleClose={() => setTopic(null)} />
        </>
      )}

      {saju && (
        <>
          <SajuTopic topic={topic} setTopic={setTopic} />
        </>
      )}

      {/* 참고사항 */}
      <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm">
        <p className="font-medium mb-2">참고 사항:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>위 사주 만세력은 양력 기준으로 계산되었습니다.</li>
          <li>정확한 사주 해석을 위해서는 전문가의 상담을 추천드립니다.</li>
          <li>일주를 중심으로 사주를 해석합니다(강조 표시됨).</li>
        </ul>
      </div>
    </div>
  );
};

export default SajuBoard;
