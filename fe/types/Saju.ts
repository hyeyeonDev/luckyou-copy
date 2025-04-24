export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

// SajuInfoRequest에 대응하는 인터페이스
export interface SajuInfo {
  name: string;
  gender: Gender; // enum 타입 사용
  birthDate: string; // "YYYY-MM-DD" 형식으로 예상
  birthTime: string | null; // "HH:MM" 형식으로 예상
  // isBirthTimeUnknown: boolean;
}

export interface SajuElement {
  gan: string;
  ji: string;
  animal: string;
  ganOhaeng: string;
  ganChinese: string;
  jiOhaeng: string;
  jiChinese: string;
}

export interface Saju {
  id: number;
  year: SajuElement;
  month: SajuElement;
  day: SajuElement;
  time: SajuElement;
}

export const getOhaengColor = (ohaeng: string) => {
  switch (ohaeng) {
    case "목":
      return { bg: "bg-green-100", color: "text-green-800" };
    case "화":
      return { bg: "bg-red-100", color: "text-red-800" };
    case "토":
      return { bg: "bg-yellow-100", color: "text-yellow-800" };
    case "금":
      return { bg: "bg-gray-100", color: "text-gray-800" };
    case "수":
      return { bg: "bg-blue-100", color: "text-blue-800" };
    default:
      return { bg: "bg-gray-50", color: "text-gray-500" };
  }
};

export const SAJU_DATA: Record<string, { topic: string; question: string }> = {
  today: {
    topic: "오늘의 운세",
    question:
      "내 사주를 기반으로 오늘의 운세를 알려줘. 운이 좋은지 나쁜지, 주의할 점이 있으면 함께 알려줘.",
  },
  tomorrow: {
    topic: "내일의 운세",
    question:
      "내 사주를 바탕으로 내일의 운세를 분석해줘. 좋은 일이 있을 가능성이 있는지, 주의할 점이 있다면 알려줘.",
  },
  yearly: {
    topic: "신년 운세",
    question:
      "내 사주를 기반으로 올해의 전반적인 운세를 분석해줘. 재물운, 건강운, 직업운 등 주요 운세 흐름을 알려줘.",
  },
  tojeong: {
    topic: "토정 비결",
    question:
      "내 사주를 바탕으로 토정비결을 해석해줘. 올해 어떤 흐름이 예상되는지 알려줘.",
  },
  love: {
    topic: "연애운",
    question: `내 사주를 기준으로 연애운을 분석해줘.연애가 잘 풀리는 시기가 언제인지, 어떤 성향의 사람이 나와 잘 맞는지 알려줘.
  또한, 연애운이 약해지는 시기나 이별수가 있는지도 함께 분석해줘.
  그리고 나와 잘 맞는 사람이 연상인지, 동갑인지, 연하인지도 알려줘.`,
  },
  wealth: {
    topic: "재물운",
    question:
      "내 사주를 바탕으로 재물운을 분석해줘. 돈을 벌기에 좋은 시기나 재물 관리를 할 때 주의할 점을 알려줘.",
  },
  health: {
    topic: "건강운",
    question:
      "내 사주를 기준으로 건강운을 분석해줘. 건강에 유의해야 할 시기나 주의할 질병이 있다면 함께 알려줘.",
  },
  compatibility: {
    topic: "궁합",
    question:
      "내 사주를 분석해서 나와 궁합이 잘 맞는 사주를 가진 사람의 특징을 알려줘.",
  },
};

export type SAJU_KEY = keyof typeof SAJU_DATA;

export const SAJU_KEYS = Object.keys(SAJU_DATA);

export interface TopicResponse {
  topic: string;
  question: string;
}

export interface SajuResponse {
  id: number;
  question: string;
  interpretation: string;
  createdAt: Date;
  slug: string;
}
