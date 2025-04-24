'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTarot } from '@/context/TarotContext';
import DeckCards from '@/components/Tarot/DeckCards';
import CardFront from '@/components/Tarot/CardFront';
import { CardProperties } from '@/types/Tarot';

const TarotBoard = () => {
  const { deck, setDeck, openCard, setOpenCard, interpretation, tarotResponse } = useTarot();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 로딩 후 질문이 있을 경우 초기화(결과창 닫은 후 question페이지로 이동하기 위함.)
    if (tarotResponse?.question) {
      setOpenCard([]);
    }
    if (openCard.length === 0) {
      router.push('/tarot/question');
    }
  }, []);

  const selectCardHandler = (index: number) => {
    if (interpretation) return;

    const isExist = selectedCards.find((i) => i === index);
    if (isExist) {
      setSelectedCards(selectedCards.filter((i) => i !== index));
    } else {
      setSelectedCards((prev) => [...prev, index]);
    }
  };

  // 선택한 카드 뽑아서 뒤집기
  const drawCard = (index: number) => {
    if (deck.length > 0) {
      const drawnCard: CardProperties = deck.splice(index, 1)[0];
      if (drawnCard) {
        drawnCard.isFlipped = true; // 카드 뒤집기
      }

      const openIndex = openCard.findIndex((e) => !e.card); // null인 인덱스를 찾음
      if (openIndex !== -1) {
        const newCards = openCard.map((preCard, i) => (i === openIndex ? { ...preCard, card: drawnCard } : preCard));
        setOpenCard(newCards);

        const newDeck = deck.filter(({ isFlipped }) => !isFlipped);
        setDeck(newDeck);
      }
    }
  };

  return (
    <>
      <div className="min-h-72 flex flex-col items-center justify-start gap-6">
        {/* Deck */}
        <DeckCards deck={deck} onClickHandler={drawCard} />

        {/* Field */}
        <div className="flex flex-row gap-4 h-24 md:h-32 lg:h-48">
          {openCard.map(
            (e, i) =>
              e.card && (
                <CardFront
                  key={i}
                  card={e.card}
                  onClickHandler={() => selectCardHandler(i)}
                  selected={selectedCards.includes(i)}
                />
              )
          )}
        </div>
        <div className="p-4 shadow-lg text-center rounded-md bg-white dark:bg-gray-900 z-30">
          {openCard.length}장의 카드를 선택해 주세요.
        </div>
      </div>
    </>
  );
};

export default TarotBoard;
