// context/TarotContext/index.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosServices from '@/utils/axios';
import {
  CardProperties,
  QuestionResponse,
  SelectedCard,
  TAROT_DATA,
  TAROT_KEY,
  tarotCards,
  TarotResponse,
} from '@/types/Tarot';
import { useLoading } from '@/context/LoadingContext';
import { useRouter, usePathname } from 'next/navigation';

type TarotContextType = {
  shuffledCard: CardProperties[];
  deck: CardProperties[];
  setDeck: (cards: CardProperties[]) => void;
  openCard: SelectedCard[];
  setOpenCard: (cards: SelectedCard[]) => void;
  topic: TAROT_KEY | null;
  setTopic: (topic: TAROT_KEY | null) => void;
  question: string;
  setQuestion: (q: string) => void;
  interpretation: string;
  setInterpretation: (i: string) => void;
  tarotResponse: TarotResponse | null;
  handleSubmitQuestion: () => Promise<void>;
};

const TarotContext = createContext<TarotContextType | undefined>(undefined);

export function TarotProvider({ children, initialData }: { children: React.ReactNode; initialData?: TarotResponse }) {
  const [shuffledCard, setShuffledCard] = useState<CardProperties[]>([]);
  const [deck, setDeck] = useState<CardProperties[]>([]);

  const initialOpenCard = initialData?.selectedCards
    ? initialData.selectedCards.split(', ').map((cardName) => {
        const card = tarotCards.find((c) => c.name === cardName);
        return {
          meaning: '',
          card: card || tarotCards[0],
        };
      })
    : [];
  const [openCard, setOpenCard] = useState<SelectedCard[]>(initialOpenCard);

  const [topic, setTopic] = useState<TAROT_KEY | null>(null);
  const [question, setQuestion] = useState<string>(initialData?.q || '');
  const [interpretation, setInterpretation] = useState<string>(initialData?.i || '');
  const [tarotResponse, setTarotResponse] = useState<TarotResponse | null>(initialData || null);
  const { showLoading, hideLoading, setLoadingText } = useLoading();
  const router = useRouter();
  const pathname = usePathname();

  const initializeCards = () => {
    const allCards = tarotCards;
    const shuffledCards = [...allCards].sort(() => Math.random() - 0.5);
    setShuffledCard(shuffledCards);
    setDeck(shuffledCards);
  };

  useEffect(() => {
    // if (initialData) {
    //   return;
    // }
    if (!topic) {
      return;
    }
    handleSubmitQuestion();
  }, [topic]);

  useEffect(() => {
    if (!question) {
      return;
    }
    setTopic(null);
    handleSubmitQuestion();
  }, [question]);

  useEffect(() => {
    if (initialData) {
      return;
    }

    if (pathname.startsWith('/tarot/result')) {
      return;
    }

    if (openCard.length === 0) {
      setQuestion('');
      setTopic(null);
      setInterpretation('');
      setTarotResponse(null);
      router.push('/tarot/question');
      return;
    }
    const selectedAll = openCard.every((e) => e.card);
    if (selectedAll) {
      handleSubmitTopic();
    }
  }, [openCard]);

  const handleSubmitQuestion = async () => {
    if (!question.trim() && !topic) {
      router.replace('/tarot/question');
      return;
    }
    initializeCards();

    const loadingTitle = topic ? TAROT_DATA[topic].topic : '타로';
    setLoadingText(`${loadingTitle} 카드 준비중입니다`);
    showLoading();
    const requestData = topic ? TAROT_DATA[topic] : { question };

    try {
      const response = await axiosServices.post<QuestionResponse>('/tarot/question', requestData);
      const meanings = response.data.cardMeanings;
      const transformedCardMeanings = meanings.map((meaning) => ({
        meaning: meaning,
      })) as SelectedCard[];
      setOpenCard(transformedCardMeanings);
      router.push('/tarot');
    } catch (error) {
      console.error('Question Submit Error:', error);
      throw new Error('Failed to fetch question data.');
    } finally {
      hideLoading();
    }
  };

  const handleSubmitTopic = async () => {
    if (!openCard.length) return;
    setInterpretation('');
    setTarotResponse(null);
    setLoadingText('타로 카드 분석중입니다');
    showLoading();
    const extractedData = openCard.map((card) => ({
      meaning: card.meaning,
      name: card.card.name,
    }));

    const requestData = topic ? { topic, question: TAROT_DATA[topic].question } : { question };
    const tarotRequest = { ...requestData, selectedCards: extractedData };

    try {
      const response = await axiosServices.post<TarotResponse>('/tarot/result', tarotRequest);
      setInterpretation(response.data.interpretation);
      setTarotResponse(response.data);

      // /tarot/result 응답에서 slug를 가져와 리다이렉트
      const slug = response.data.slug;
      if (!slug) {
        throw new Error('Slug not found in response');
      }
      router.push(`/tarot/result/${slug}`);
    } catch (error) {
      console.error('Tarot Topic Submit Error:', error);
      alert('타로 결과를 가져오는 데 실패했습니다. 다시 시도해주세요.');
      router.push('/tarot');
    } finally {
      hideLoading();
    }
  };

  return (
    <TarotContext.Provider
      value={{
        shuffledCard,
        deck,
        setDeck,
        openCard,
        setOpenCard,
        topic,
        setTopic,
        question,
        setQuestion,
        interpretation,
        setInterpretation,
        tarotResponse,
        handleSubmitQuestion,
      }}
    >
      {children}
    </TarotContext.Provider>
  );
}

export function useTarot() {
  const context = useContext(TarotContext);
  if (context === undefined) {
    throw new Error('useTarot must be used within an TarotProvider');
  }
  return context;
}
