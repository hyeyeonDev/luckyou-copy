export const OhangType = {
  tree: 0,
  fire: 1,
  soil: 2,
  gold: 3,
  water: 4,
} as const;

type OhangType = (typeof OhangType)[keyof typeof OhangType];

export type OhangTypeText = {
  text1: string;
  text2: string;
};

export const OhangText: OhangTypeText[] = [
  { text1: '木 , 나무', text2: '목' },
  { text1: '火 , 불', text2: '화' },
  { text1: '土 , 흙', text2: '토' },
  { text1: '金 , 쇠', text2: '금' },
  { text1: '水 , 물', text2: '수' },
];

export type OhangTypeColor = {
  type: OhangType;
  bgColor: string;
  textColor: string;
  text: string;
};

export const OhangTypeColors: OhangTypeColor[] = [
  { type: OhangType.tree, bgColor: '#4370CE', textColor: '#FFFFFF', text: OhangText[OhangType.tree].text1 },
  { type: OhangType.fire, bgColor: '#EF5C5C', textColor: '#FFFFFF', text: OhangText[OhangType.fire].text1 },
  { type: OhangType.soil, bgColor: '#FFDE00', textColor: '#000000', text: OhangText[OhangType.soil].text1 },
  { type: OhangType.gold, bgColor: '#CECECE', textColor: '#000000', text: OhangText[OhangType.gold].text1 },
  { type: OhangType.water, bgColor: '#565656', textColor: '#FFFFFF', text: OhangText[OhangType.water].text1 },
];

export type OhangCompatibility = {
  good_idx: number;
  good_text: string;
  bad_idx: number;
  bad_text: string;
};

export const OhangCompatibility: OhangCompatibility[] = [
  {
    good_idx: OhangType.fire,
    good_text: OhangText[OhangType.fire].text2,
    bad_idx: OhangType.soil,
    bad_text: OhangText[OhangType.soil].text2,
  },
  {
    good_idx: OhangType.soil,
    good_text: OhangText[OhangType.soil].text2,
    bad_idx: OhangType.gold,
    bad_text: OhangText[OhangType.gold].text2,
  },
  {
    good_idx: OhangType.gold,
    good_text: OhangText[OhangType.gold].text2,
    bad_idx: OhangType.water,
    bad_text: OhangText[OhangType.water].text2,
  },
  {
    good_idx: OhangType.water,
    good_text: OhangText[OhangType.water].text2,
    bad_idx: OhangType.tree,
    bad_text: OhangText[OhangType.tree].text2,
  },
  {
    good_idx: OhangType.tree,
    good_text: OhangText[OhangType.tree].text2,
    bad_idx: OhangType.fire,
    bad_text: OhangText[OhangType.fire].text2,
  },
];
