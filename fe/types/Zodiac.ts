export const ZodiacDatas = {
  Mouse: { key: 'zodiac_mouse', displayName: '쥐띠', chineseDisplayName: '자(子)', imageFileName: 'mouse' },
  Cow: { key: 'zodiac_cow', displayName: '소띠', chineseDisplayName: '축(丑)', imageFileName: 'cow' },
  Tiger: { key: 'zodiac_tiger', displayName: '호랑이띠', chineseDisplayName: '인(寅)', imageFileName: 'tiger' },
  Rabbit: { key: 'zodiac_rabbit', displayName: '토끼띠', chineseDisplayName: '묘(卯)', imageFileName: 'rabbit' },
  Dragon: { key: 'zodiac_dragon', displayName: '용띠', chineseDisplayName: '진(辰)', imageFileName: 'dragon' },
  Snake: { key: 'zodiac_snake', displayName: '뱀띠', chineseDisplayName: '사(巳)', imageFileName: 'sanke' }, //오타가 아니라 이미지 파일명과 맞춘것
  Horse: { key: 'zodiac_horse', displayName: '말띠', chineseDisplayName: '오(午)', imageFileName: 'horse' },
  Sheep: { key: 'zodiac_sheep', displayName: '양띠', chineseDisplayName: '미(未)', imageFileName: 'sheep' },
  Monkey: { key: 'zodiac_monkey', displayName: '원숭이띠', chineseDisplayName: '신(申)', imageFileName: 'monkey' },
  Chicken: { key: 'zodiac_chicken', displayName: '닭띠', chineseDisplayName: '유(酉)', imageFileName: 'chicken' },
  Dog: { key: 'zodiac_dog', displayName: '개띠', chineseDisplayName: '술(戌)', imageFileName: 'dog' },
  Pig: { key: 'zodiac_pig', displayName: '돼지띠', chineseDisplayName: '해(亥)', imageFileName: 'pig' },
} as const;
export type ZodiacDatas = (typeof ZodiacDatas)[keyof typeof ZodiacDatas];

export const zodiacCycle: [string, string, string, string][] = [
  [
    ZodiacDatas.Mouse.imageFileName,
    ZodiacDatas.Mouse.chineseDisplayName,
    ZodiacDatas.Mouse.displayName,
    ZodiacDatas.Mouse.key,
  ],
  [ZodiacDatas.Cow.imageFileName, ZodiacDatas.Cow.chineseDisplayName, ZodiacDatas.Cow.displayName, ZodiacDatas.Cow.key],
  [
    ZodiacDatas.Tiger.imageFileName,
    ZodiacDatas.Tiger.chineseDisplayName,
    ZodiacDatas.Tiger.displayName,
    ZodiacDatas.Tiger.key,
  ],
  [
    ZodiacDatas.Rabbit.imageFileName,
    ZodiacDatas.Rabbit.chineseDisplayName,
    ZodiacDatas.Rabbit.displayName,
    ZodiacDatas.Rabbit.key,
  ],
  [
    ZodiacDatas.Dragon.imageFileName,
    ZodiacDatas.Dragon.chineseDisplayName,
    ZodiacDatas.Dragon.displayName,
    ZodiacDatas.Dragon.key,
  ],
  [
    ZodiacDatas.Snake.imageFileName,
    ZodiacDatas.Snake.chineseDisplayName,
    ZodiacDatas.Snake.displayName,
    ZodiacDatas.Snake.key,
  ],
  [
    ZodiacDatas.Horse.imageFileName,
    ZodiacDatas.Horse.chineseDisplayName,
    ZodiacDatas.Horse.displayName,
    ZodiacDatas.Horse.key,
  ],
  [
    ZodiacDatas.Sheep.imageFileName,
    ZodiacDatas.Sheep.chineseDisplayName,
    ZodiacDatas.Sheep.displayName,
    ZodiacDatas.Sheep.key,
  ],
  [
    ZodiacDatas.Monkey.imageFileName,
    ZodiacDatas.Monkey.chineseDisplayName,
    ZodiacDatas.Monkey.displayName,
    ZodiacDatas.Monkey.key,
  ],
  [
    ZodiacDatas.Chicken.imageFileName,
    ZodiacDatas.Chicken.chineseDisplayName,
    ZodiacDatas.Chicken.displayName,
    ZodiacDatas.Chicken.key,
  ],
  [ZodiacDatas.Dog.imageFileName, ZodiacDatas.Dog.chineseDisplayName, ZodiacDatas.Dog.displayName, ZodiacDatas.Dog.key],
  [ZodiacDatas.Pig.imageFileName, ZodiacDatas.Pig.chineseDisplayName, ZodiacDatas.Pig.displayName, ZodiacDatas.Pig.key],
];

export function getChineseZodiac(year: number): [string, string, string, string] {
  const startYear = 1924;
  const cycleIndex = (year - startYear) % 12;
  return zodiacCycle[cycleIndex >= 0 ? cycleIndex : cycleIndex + 12];
}

export function getChineseZodiacImage(title: string) {
  let modifiedTitle = title;
  return `images/common/chinese_zodiac/3.0x/${modifiedTitle}.png`;
}

export function getChineseZodiacImageByIndex(index: number) {
  const target = zodiacCycle[index];
  // let modifiedTitle = title;
  return `images/common/chinese_zodiac/3.0x/${target[0]}.png`;
}
