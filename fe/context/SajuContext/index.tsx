'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Gender, Saju, SAJU_DATA, SAJU_KEY, SajuInfo, SajuResponse } from '@/types/Saju';
import axiosServices from '@/utils/axios';
import { useRouter, usePathname } from 'next/navigation';

type SajuContextType = {
  sajuInfo: SajuInfo;
  setSajuInfo: React.Dispatch<React.SetStateAction<SajuInfo>>;
  saju: Saju | null;
  topic: SAJU_KEY | null;
  setTopic: (topic: SAJU_KEY | null) => void;
  question: string;
  setQuestion: (q: string) => void;
  interpretation: string;
  saveSajuInfo: (newSajuInfo: SajuInfo) => void;
  isPageLoading: boolean;
  loadingText: string;
  setIsPageLoading: (isLoading: boolean) => void;
  setLoadingText: (text: string) => void;
  sajuResponse: SajuResponse | null;
};

const SajuContext = createContext<SajuContextType | undefined>(undefined);

const initSajuInfo: SajuInfo = {
  name: '',
  gender: Gender.MALE,
  birthDate: '',
  birthTime: null,
};

export function SajuProvider({ children, initialData }: { children: React.ReactNode; initialData?: SajuResponse }) {
  const [sajuInfo, setSajuInfo] = useState<SajuInfo>(initSajuInfo);
  const [saju, setSaju] = useState<Saju | null>(null);
  const [topic, setTopic] = useState<SAJU_KEY | null>(null);
  const [question, setQuestion] = useState<string>(initialData?.question || '');
  const [interpretation, setInterpretation] = useState<string>(initialData?.interpretation || '');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('잠시만 기다려주세요');
  const [sajuResponse, setSajuResponse] = useState<SajuResponse | null>(initialData || null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (initialData) {
      return;
    }
    fetchSajuInfo();
  }, [initialData]);

  useEffect(() => {
    if (initialData) {
      return;
    }

    if (pathname.startsWith('/saju/result')) {
      return;
    }

    if (sajuInfo.name && sajuInfo.birthDate && sajuInfo.gender) {
      // 사용자 정보 저장 후 페이지 전환 시 로딩 UI가 추가로 나타나지 않도록 설정
      // router.push 전에 isPageLoading을 false로 설정하여 Next.js의 내장 로딩을 비활성화
      setIsPageLoading(false);

      // 짧은 지연 후 라우팅 실행
      const timer = setTimeout(() => {
        // 라우팅 처리 (현재 로딩 UI 유지)
        router.push('/saju');

        if (sajuInfo.birthTime) {
          fetchSaju();
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      router.push('/saju/info');
    }
  }, [sajuInfo, initialData, pathname, router]);

  // topic 변경 시 자동으로 결과 불러오기
  useEffect(() => {
    if (initialData) {
      return;
    }
    if (!topic?.trim()) {
      setInterpretation('');
      setSajuResponse(null);
      return;
    }
    handleSubmitTopic();
  }, [topic, initialData]);

  const saveSajuInfo = async (newSajuInfo: SajuInfo) => {
    try {
      const response = await axiosServices.post<SajuInfo>('/saju/info', newSajuInfo);
      setSajuInfo(response.data);
    } catch (error) {
      // setError(error);
      console.error('Error Save Saju:', error);
      throw error; // 오류를 컴포넌트로 전파합니다.
    }
  };

  const fetchSajuInfo = async () => {
    try {
      const response = await axiosServices.get<SajuInfo>('/saju/info');
      const { name, gender, birthDate } = response.data;
      if (name && gender && birthDate) {
        setSajuInfo(response.data);
      } else {
        router.push('/saju/info');
      }
    } catch (error) {
      console.error('Error Fetch SajuInfo:', error);
    }
  };

  const fetchSaju = async () => {
    try {
      const response = await axiosServices.get<Saju>('/saju/natal');
      setSaju(response.data);
    } catch (error) {
      console.error('Error Fetch Saju:', error);
    }
  };

  // 해석
  const handleSubmitTopic = async () => {
    if (!topic) return;
    setInterpretation('');
    setSajuResponse(null);
    setIsPageLoading(true);
    setLoadingText(`${SAJU_DATA[topic!].topic} 결과를 불러오는 중입니다`);
    const sajuRequest = { topic, question: SAJU_DATA[topic].question };

    try {
      const response = await axiosServices.post<SajuResponse>('/saju/result', sajuRequest);
      setInterpretation(response.data.interpretation);
      setSajuResponse(response.data);
    } catch (error) {
      console.error('Saju Topic Submit Error:', error);
      throw new Error('Failed to fetch topic data.');
    } finally {
      setIsPageLoading(false);
    }
  };

  return (
    <SajuContext.Provider
      value={{
        sajuInfo,
        setSajuInfo,
        saju,
        topic,
        setTopic,
        question,
        setQuestion,
        interpretation,
        saveSajuInfo,
        isPageLoading,
        loadingText,
        setIsPageLoading,
        setLoadingText,
        sajuResponse,
      }}
    >
      {children}
    </SajuContext.Provider>
  );
}

export function useSaju() {
  const context = useContext(SajuContext);
  if (context === undefined) {
    throw new Error('useSaju must be used within an SajuProvider');
  }
  return context;
}
