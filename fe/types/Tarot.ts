// export const _COLOR = ["rose-400", "lime-600", "sky-500", "indigo-400"];

type CardType = "major" | "wand" | "cup" | "sword" | "pentacle";

export interface Card {
  id: number;
  type: CardType;
  name: string;
}

export interface CardProperties extends Card {
  isFlipped: boolean;
  image: string;
}

export const tarotCards: CardProperties[] = [
  // Major Arcana (0-21)
  {
    id: 0,
    type: "major",
    name: "The Fool",
    isFlipped: false,
    image: "major_01.png",
  },
  {
    id: 1,
    type: "major",
    name: "The Magician",
    isFlipped: false,
    image: "major_02.png",
  },
  {
    id: 2,
    type: "major",
    name: "The High Priestess",
    isFlipped: false,
    image: "major_03.png",
  },
  {
    id: 3,
    type: "major",
    name: "The Empress",
    isFlipped: false,
    image: "major_04.png",
  },
  {
    id: 4,
    type: "major",
    name: "The Emperor",
    isFlipped: false,
    image: "major_05.png",
  },
  {
    id: 5,
    type: "major",
    name: "The Hierophant",
    isFlipped: false,
    image: "major_06.png",
  },
  {
    id: 6,
    type: "major",
    name: "The Lovers",
    isFlipped: false,
    image: "major_07.png",
  },
  {
    id: 7,
    type: "major",
    name: "The Chariot",
    isFlipped: false,
    image: "major_08.png",
  },
  {
    id: 8,
    type: "major",
    name: "Strength",
    isFlipped: false,
    image: "major_09.png",
  },
  {
    id: 9,
    type: "major",
    name: "The Hermit",
    isFlipped: false,
    image: "major_10.png",
  },
  {
    id: 10,
    type: "major",
    name: "Wheel of Fortune",
    isFlipped: false,
    image: "major_11.png",
  },
  {
    id: 11,
    type: "major",
    name: "Justice",
    isFlipped: false,
    image: "major_12.png",
  },
  {
    id: 12,
    type: "major",
    name: "The Hanged Man",
    isFlipped: false,
    image: "major_13.png",
  },
  {
    id: 13,
    type: "major",
    name: "Death",
    isFlipped: false,
    image: "major_14.png",
  },
  {
    id: 14,
    type: "major",
    name: "Temperance",
    isFlipped: false,
    image: "major_15.png",
  },
  {
    id: 15,
    type: "major",
    name: "The Devil",
    isFlipped: false,
    image: "major_16.png",
  },
  {
    id: 16,
    type: "major",
    name: "The Tower",
    isFlipped: false,
    image: "major_17.png",
  },
  {
    id: 17,
    type: "major",
    name: "The Star",
    isFlipped: false,
    image: "major_18.png",
  },
  {
    id: 18,
    type: "major",
    name: "The Moon",
    isFlipped: false,
    image: "major_19.png",
  },
  {
    id: 19,
    type: "major",
    name: "The Sun",
    isFlipped: false,
    image: "major_20.png",
  },
  {
    id: 20,
    type: "major",
    name: "Judgement",
    isFlipped: false,
    image: "major_21.png",
  },
  {
    id: 21,
    type: "major",
    name: "The World",
    isFlipped: false,
    image: "major_22.png",
  },

  // Minor Arcana - Wands (22-35)
  {
    id: 22,
    type: "wand",
    name: "Ace of Wands",
    isFlipped: false,
    image: "wands_01.png",
  },
  {
    id: 23,
    type: "wand",
    name: "Two of Wands",
    isFlipped: false,
    image: "wands_02.png",
  },
  {
    id: 24,
    type: "wand",
    name: "Three of Wands",
    isFlipped: false,
    image: "wands_03.png",
  },
  {
    id: 25,
    type: "wand",
    name: "Four of Wands",
    isFlipped: false,
    image: "wands_04.png",
  },
  {
    id: 26,
    type: "wand",
    name: "Five of Wands",
    isFlipped: false,
    image: "wands_05.png",
  },
  {
    id: 27,
    type: "wand",
    name: "Six of Wands",
    isFlipped: false,
    image: "wands_06.png",
  },
  {
    id: 28,
    type: "wand",
    name: "Seven of Wands",
    isFlipped: false,
    image: "wands_07.png",
  },
  {
    id: 29,
    type: "wand",
    name: "Eight of Wands",
    isFlipped: false,
    image: "wands_08.png",
  },
  {
    id: 30,
    type: "wand",
    name: "Nine of Wands",
    isFlipped: false,
    image: "wands_09.png",
  },
  {
    id: 31,
    type: "wand",
    name: "Ten of Wands",
    isFlipped: false,
    image: "wands_10.png",
  },
  {
    id: 32,
    type: "wand",
    name: "Page of Wands",
    isFlipped: false,
    image: "wands_11.png",
  },
  {
    id: 33,
    type: "wand",
    name: "Knight of Wands",
    isFlipped: false,
    image: "wands_12.png",
  },
  {
    id: 34,
    type: "wand",
    name: "Queen of Wands",
    isFlipped: false,
    image: "wands_13.png",
  },
  {
    id: 35,
    type: "wand",
    name: "King of Wands",
    isFlipped: false,
    image: "wands_14.png",
  },

  // Minor Arcana - Cups (36-49)
  {
    id: 36,
    type: "cup",
    name: "Ace of Cups",
    isFlipped: false,
    image: "cups_01.png",
  },
  {
    id: 37,
    type: "cup",
    name: "Two of Cups",
    isFlipped: false,
    image: "cups_02.png",
  },
  {
    id: 38,
    type: "cup",
    name: "Three of Cups",
    isFlipped: false,
    image: "cups_03.png",
  },
  {
    id: 39,
    type: "cup",
    name: "Four of Cups",
    isFlipped: false,
    image: "cups_04.png",
  },
  {
    id: 40,
    type: "cup",
    name: "Five of Cups",
    isFlipped: false,
    image: "cups_05.png",
  },
  {
    id: 41,
    type: "cup",
    name: "Six of Cups",
    isFlipped: false,
    image: "cups_06.png",
  },
  {
    id: 42,
    type: "cup",
    name: "Seven of Cups",
    isFlipped: false,
    image: "cups_07.png",
  },
  {
    id: 43,
    type: "cup",
    name: "Eight of Cups",
    isFlipped: false,
    image: "cups_08.png",
  },
  {
    id: 44,
    type: "cup",
    name: "Nine of Cups",
    isFlipped: false,
    image: "cups_09.png",
  },
  {
    id: 45,
    type: "cup",
    name: "Ten of Cups",
    isFlipped: false,
    image: "cups_10.png",
  },
  {
    id: 46,
    type: "cup",
    name: "Page of Cups",
    isFlipped: false,
    image: "cups_11.png",
  },
  {
    id: 47,
    type: "cup",
    name: "Knight of Cups",
    isFlipped: false,
    image: "cups_12.png",
  },
  {
    id: 48,
    type: "cup",
    name: "Queen of Cups",
    isFlipped: false,
    image: "cups_13.png",
  },
  {
    id: 49,
    type: "cup",
    name: "King of Cups",
    isFlipped: false,
    image: "cups_14.png",
  },

  // Minor Arcana - Swords (50-63)
  {
    id: 50,
    type: "sword",
    name: "Ace of Swords",
    isFlipped: false,
    image: "swords_01.png",
  },
  {
    id: 51,
    type: "sword",
    name: "Two of Swords",
    isFlipped: false,
    image: "swords_02.png",
  },
  {
    id: 52,
    type: "sword",
    name: "Three of Swords",
    isFlipped: false,
    image: "swords_03.png",
  },
  {
    id: 53,
    type: "sword",
    name: "Four of Swords",
    isFlipped: false,
    image: "swords_04.png",
  },
  {
    id: 54,
    type: "sword",
    name: "Five of Swords",
    isFlipped: false,
    image: "swords_05.png",
  },
  {
    id: 55,
    type: "sword",
    name: "Six of Swords",
    isFlipped: false,
    image: "swords_06.png",
  },
  {
    id: 56,
    type: "sword",
    name: "Seven of Swords",
    isFlipped: false,
    image: "swords_07.png",
  },
  {
    id: 57,
    type: "sword",
    name: "Eight of Swords",
    isFlipped: false,
    image: "swords_08.png",
  },
  {
    id: 58,
    type: "sword",
    name: "Nine of Swords",
    isFlipped: false,
    image: "swords_09.png",
  },
  {
    id: 59,
    type: "sword",
    name: "Ten of Swords",
    isFlipped: false,
    image: "swords_10.png",
  },
  {
    id: 60,
    type: "sword",
    name: "Page of Swords",
    isFlipped: false,
    image: "swords_11.png",
  },
  {
    id: 61,
    type: "sword",
    name: "Knight of Swords",
    isFlipped: false,
    image: "swords_12.png",
  },
  {
    id: 62,
    type: "sword",
    name: "Queen of Swords",
    isFlipped: false,
    image: "swords_13.png",
  },
  {
    id: 63,
    type: "sword",
    name: "King of Swords",
    isFlipped: false,
    image: "swords_14.png",
  },

  // Minor Arcana - Pentacles (64-77)
  {
    id: 64,
    type: "pentacle",
    name: "Ace of Pentacles",
    isFlipped: false,
    image: "pentacles_01.png",
  },
  {
    id: 65,
    type: "pentacle",
    name: "Two of Pentacles",
    isFlipped: false,
    image: "pentacles_02.png",
  },
  {
    id: 66,
    type: "pentacle",
    name: "Three of Pentacles",
    isFlipped: false,
    image: "pentacles_03.png",
  },
  {
    id: 67,
    type: "pentacle",
    name: "Four of Pentacles",
    isFlipped: false,
    image: "pentacles_04.png",
  },
  {
    id: 68,
    type: "pentacle",
    name: "Five of Pentacles",
    isFlipped: false,
    image: "pentacles_05.png",
  },
  {
    id: 69,
    type: "pentacle",
    name: "Six of Pentacles",
    isFlipped: false,
    image: "pentacles_06.png",
  },
  {
    id: 70,
    type: "pentacle",
    name: "Seven of Pentacles",
    isFlipped: false,
    image: "pentacles_07.png",
  },
  {
    id: 71,
    type: "pentacle",
    name: "Eight of Pentacles",
    isFlipped: false,
    image: "pentacles_08.png",
  },
  {
    id: 72,
    type: "pentacle",
    name: "Nine of Pentacles",
    isFlipped: false,
    image: "pentacles_09.png",
  },
  {
    id: 73,
    type: "pentacle",
    name: "Ten of Pentacles",
    isFlipped: false,
    image: "pentacles_10.png",
  },
  {
    id: 74,
    type: "pentacle",
    name: "Page of Pentacles",
    isFlipped: false,
    image: "pentacles_11.png",
  },
  {
    id: 75,
    type: "pentacle",
    name: "Knight of Pentacles",
    isFlipped: false,
    image: "pentacles_12.png",
  },
  {
    id: 76,
    type: "pentacle",
    name: "Queen of Pentacles",
    isFlipped: false,
    image: "pentacles_13.png",
  },
  {
    id: 77,
    type: "pentacle",
    name: "King of Pentacles",
    isFlipped: false,
    image: "pentacles_14.png",
  },
];

export const TAROT_DATA: Record<string, { topic: string; question: string }> = {
  today: {
    topic: "오늘의 운세",
    question:
      "오늘 하루 어떤 일이 일어날 가능성이 있는지, 주의할 점이 있다면 함께 알려줘.",
  },
  tomorrow: {
    topic: "내일의 운세",
    question: "좋은 일이 있을 가능성이 있는지, 주의할 점이 있다면 알려줘.",
  },
  yearly: {
    topic: "연간 운세",
    question:
      "올해의 전반적인 운세를 분석해줘. 중요한 변화나 운의 흐름을 알려줘.",
  },
  love: {
    topic: "연애운",
    question:
      "연애가 잘 풀리는 시기가 언제인지, 어떤 성향의 사람이 나와 잘 맞는지 알려줘.",
  },
  wealth: {
    topic: "재물운",
    question:
      "재물운을 분석해줘. 돈을 벌기에 좋은 시기나 재물 관리를 할 때 주의할 점을 알려줘.",
  },
  health: {
    topic: "건강운",
    question:
      "건강운을 분석해줘. 건강에 유의해야 할 시기나 주의할 질병이 있다면 함께 알려줘.",
  },
  future: {
    topic: "미래 예측",
    question:
      "미래에 어떤 변화가 있을지 알려줘. 어떤 방향으로 나아가야 할지 조언을 해줘.",
  },
  career: {
    topic: "직업운",
    question:
      "직업운을 분석해줘. 직장에서의 변화나 중요한 기회가 있을지 알려줘.",
  },
  personal_growth: {
    topic: "개인 발전",
    question:
      "개인적인 성장을 위한 조언을 해줘. 어떤 부분을 강화하면 좋을지 알려줘.",
  },
  spiritual: {
    topic: "영적 조언",
    question:
      "영적인 조언을 해줘. 나의 영적인 성장이나 내면의 평화를 찾을 수 있는 방법을 알려줘.",
  },
};

export type TAROT_KEY = keyof typeof TAROT_DATA;

export const TAROT_KEYS = Object.keys(TAROT_DATA);

export interface SelectedCard {
  meaning: string;
  card: CardProperties;
}

export interface QuestionResponse {
  topic: string;
  question: string;
  cardMeanings: string[];
}

export interface TarotResponse {
  id: number;
  question: string;
  selectedCards: string;
  interpretation: string;
  createdAt: Date;
  slug: string;
  q?: string;
  i?: string;
}
