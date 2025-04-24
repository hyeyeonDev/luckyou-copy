// components/TarotInterpretation.tsx
import React from 'react';
import { TAROT_DATA, TAROT_KEY } from '@/types/Tarot';
import { Textarea } from 'flowbite-react';

interface TarotInterpretationProps {
  topic: TAROT_KEY | null;
  question: string;
  interpretation: string;
}

const TarotInterpretation: React.FC<TarotInterpretationProps> = ({ topic, question, interpretation }) => {
  if (!interpretation) return;

  return (
    <Textarea
      className="p-2 border-none"
      readOnly
      rows={15}
      value={`💫${topic ? TAROT_DATA[topic].topic : question}🔮\n\n${interpretation}`}
    />
  );
};

export default TarotInterpretation;
