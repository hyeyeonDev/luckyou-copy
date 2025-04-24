export const AstroDatas = {
  WaterBottle: { key: 'astro_water_bottle', displayName: '물병자리', imageFileName: 'water_bottle' },
  Fish: { key: 'astro_fish', displayName: '물고기자리', imageFileName: 'fish' },
  Sheep: { key: 'astro_sheep', displayName: '양자리', imageFileName: 'sheep' },
  Bull: { key: 'astro_bull', displayName: '황소자리', imageFileName: 'bull' },
  Twins: { key: 'astro_twins', displayName: '쌍둥이자리', imageFileName: 'twins' },
  Crab: { key: 'astro_crab', displayName: '게자리', imageFileName: 'crab' },
  Lion: { key: 'astro_lion', displayName: '사자자리', imageFileName: 'lion' },
  Virgin: { key: 'astro_virgin', displayName: '처녀자리', imageFileName: 'virgin' },
  Balance: { key: 'astro_balance', displayName: '천칭자리', imageFileName: 'balance' },
  Scorpion: { key: 'astro_scorpion', displayName: '전갈자리', imageFileName: 'scorpion' },
  Archer: { key: 'astro_archer', displayName: '사수자리', imageFileName: 'archer' },
  Goat: { key: 'astro_goat', displayName: '염소자리', imageFileName: 'goat' },
} as const;
export type AstroDatas = (typeof AstroDatas)[keyof typeof AstroDatas];

export const astroInfo: [string, string, string, string, string][] = (() => {
  const year = new Date().getFullYear();
  return [
    [
      `${year}-01-20`,
      `${year}-02-18`,
      AstroDatas.WaterBottle.displayName,
      AstroDatas.WaterBottle.imageFileName,
      AstroDatas.WaterBottle.key,
    ],
    [`${year}-02-19`, `${year}-03-20`, AstroDatas.Fish.displayName, AstroDatas.Fish.imageFileName, AstroDatas.Fish.key],
    [
      `${year}-03-21`,
      `${year}-04-19`,
      AstroDatas.Sheep.displayName,
      AstroDatas.Sheep.imageFileName,
      AstroDatas.Sheep.key,
    ],
    [`${year}-04-20`, `${year}-05-20`, AstroDatas.Bull.displayName, AstroDatas.Bull.imageFileName, AstroDatas.Bull.key],
    [
      `${year}-05-21`,
      `${year}-06-21`,
      AstroDatas.Twins.displayName,
      AstroDatas.Twins.imageFileName,
      AstroDatas.Twins.key,
    ],
    [`${year}-06-22`, `${year}-07-22`, AstroDatas.Crab.displayName, AstroDatas.Crab.imageFileName, AstroDatas.Crab.key],
    [`${year}-07-23`, `${year}-08-22`, AstroDatas.Lion.displayName, AstroDatas.Lion.imageFileName, AstroDatas.Lion.key],
    [
      `${year}-08-23`,
      `${year}-09-23`,
      AstroDatas.Virgin.displayName,
      AstroDatas.Virgin.imageFileName,
      AstroDatas.Virgin.key,
    ],
    [
      `${year}-09-24`,
      `${year}-10-22`,
      AstroDatas.Balance.displayName,
      AstroDatas.Balance.imageFileName,
      AstroDatas.Balance.key,
    ],
    [
      `${year}-10-23`,
      `${year}-11-22`,
      AstroDatas.Scorpion.displayName,
      AstroDatas.Scorpion.imageFileName,
      AstroDatas.Scorpion.key,
    ],
    [
      `${year}-11-23`,
      `${year}-12-24`,
      AstroDatas.Archer.displayName,
      AstroDatas.Archer.imageFileName,
      AstroDatas.Archer.key,
    ],
    [
      `${year}-12-25`,
      `${year + 1}-01-19`,
      AstroDatas.Goat.displayName,
      AstroDatas.Goat.imageFileName,
      AstroDatas.Goat.key,
    ],
  ];
})();

export const getAstroInfo = (birth: Date) => {
  const today = new Date();
  let queryZodiacDate = new Date(birth);
  queryZodiacDate.setFullYear(today.getFullYear());

  let info = astroInfo
    .filter((each) => {
      const comparison1 = new Date(each[0]).getTime();
      let comparison2Date = new Date(each[1]);

      // comparison2 requires the addition of one more day to cover all days
      // e.g. 물병자리 01-20 ~ 02-18 / 물고기자리 02-19 ~ 03-20
      // -> Covering times between "02-18 ~ 02-19"
      comparison2Date.setDate(comparison2Date.getDate() + 1);
      const comparison2 = comparison2Date.getTime();
      const query = queryZodiacDate.getTime();
      return comparison1 <= query && query < comparison2;
    })
    .pop();

  // To cover the case of 염소자리 (goat)
  if (info === undefined) {
    info = astroInfo[astroInfo.length - 1];
  }

  return info;
};
