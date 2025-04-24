'use client';

import React, { useEffect, useState } from 'react';
import { CardProperties } from '@/types/Tarot';
import CardBack from '@/components/Tarot/CardBack';

const MAX_WIDTH = 350;

interface DeckCardsProp {
  deck: CardProperties[];
  onClickHandler: (index: number) => void;
}

const DeckCards = ({ deck, onClickHandler }: DeckCardsProp) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(MAX_WIDTH);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  useEffect(() => {
    const updateRadius = () => {
      const screenWidth = window.innerWidth / 3;
      setRadius(screenWidth > MAX_WIDTH ? MAX_WIDTH : screenWidth); // 화면 크기에 비례해 반지름 조정
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // 2초 후 애니메이션 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 1000 * 1); // 2초 뒤에 애니메이션 시작

    return () => clearTimeout(timer);
  }, []);

  const getCardStyle = (index: number) => {
    const totalCards = deck.length; // 카드 개수
    const angleSpread = 180; // 반원의 각도
    const baseAngle = 0; // 시작 각도를 0도로 해서 오른쪽 시작
    const angleIncrement = totalCards > 1 ? angleSpread / (totalCards - 1) : 0;
    const angle = baseAngle + angleIncrement * index; // 오른쪽에서 왼쪽쪽으로 각도를 증가

    // x, y 좌표 계산
    const x = radius * Math.cos((angle * Math.PI) / angleSpread);
    const y = radius * Math.sin((angle * Math.PI) / angleSpread);

    return {
      x: x * 1 - 50,
      y: y * 1 - 150,
      rotation: angle + 90, // 카드가 항상 세로로 유지되도록 조정
    };
  };

  // absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
  return (
    <div className="relative">
      {deck.map((card, index) => {
        const { x, y, rotation } = getCardStyle(index);
        const isHovered = hoveredCard === card.id;

        return (
          <div
            key={card.id}
            className="absolute origin-bottom transition-transform duration-300 ease-out z-10"
            style={{
              transform: isAnimated
                ? `translate(${isHovered ? x / 0.9 : x}px, 
                                 ${isHovered ? y / 0.9 : y}px) 
                        rotate(${rotation}deg)`
                : `translate(${getCardStyle(0).x}px, 0px) rotate(90deg)`,
              transitionDelay: '5ms',
            }}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onClickHandler(index)}
          >
            <div
              className={`rounded-lg cursor-pointer transition-transform duration-100
                              ${isHovered ? 'shadow-2xl shadow-violet-500/80' : 'scale-100'}`}
            >
              <CardBack />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeckCards;
