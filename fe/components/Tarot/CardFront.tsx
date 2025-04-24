'use client';

import React, { useEffect, useState } from 'react';
import { CardProperties } from '@/types/Tarot';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface CardFrontProp {
  card: CardProperties;
  onClickHandler?: () => void;
  selected?: boolean;
}

const CardFront = ({ card, onClickHandler, selected = false }: CardFrontProp) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [id, setId] = useState<number | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('/tarot_cards/0.png');

  useEffect(() => {
    if (!card) return;
    const { type, image } = card;
    setImageSrc(`/tarot_cards/${currentTheme}/${type}/${image}`);
  }, [card, currentTheme]);

  if (!card) {
    return <div></div>;
  }

  return (
    <>
      <div
        className="rounded-lg cursor-pointer hover:translate-y-[-4px] transition-all duration-300 z-30"
        onClick={onClickHandler}
      >
        {/* 카드 앞면 */}
        {/* w-32 h-48 | w-48 h-72 */}
        <div className="relative w-16 h-24 md:w-24 md:h-32 lg:w-32 lg:h-48 hover:scale-110 rounded-lg shadow-lg bg-white">
          {imageSrc && (
            <Image src={imageSrc} alt={card.name} className="w-full rounded-lg" width={100} height={100} unoptimized />
          )}
        </div>
      </div>
    </>
  );
};

export default CardFront;
