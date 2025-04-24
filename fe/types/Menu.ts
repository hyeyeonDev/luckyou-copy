import { Diamond, Club, Star } from 'lucide-react';

export const navLinks = [
  {
    href: '/tarot',
    label: '타로카드',
    iconElement: Diamond,
    activeColor: 'amber',
    description: '과거, 현재, 미래를 통찰하는 타로카드 리딩',
  },
  {
    href: '/saju',
    label: '사주풀이',
    iconElement: Star,
    activeColor: 'purple',
    description: '당신의 사주를 바탕으로 한 정확한 운세 분석',
  },
];
