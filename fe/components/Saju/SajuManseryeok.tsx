// components/SajuManseryeok.tsx
import React from 'react';
import { getOhaengColor, Saju } from '@/types/Saju';

interface SajuPillarProps {
  title: string;
  gan: string;
  ji: string;
  ganOhaeng: string;
  ganChinese: string;
  jiOhaeng: string;
  jiChinese: string;
  animal?: string;
  highlight?: boolean;
}

const SajuPillar: React.FC<SajuPillarProps> = ({
  title,
  gan,
  ji,
  ganOhaeng,
  ganChinese,
  jiOhaeng,
  jiChinese,
  animal,
  highlight = false,
}) => {
  const ganColor = getOhaengColor(ganOhaeng);
  const jiColor = getOhaengColor(jiOhaeng);

  return (
    <div className={`flex flex-col items-center ${highlight ? 'bg-indigo-50 dark:bg-indigo-400 rounded-lg' : ''}`}>
      <div className="text-xs font-bold mb-1">{title}</div>
      <div
        className={`w-14 h-14 flex flex-col items-center justify-center rounded-t-lg font-bold text-lg ${ganColor.bg} ${ganColor.color}`}
      >
        <div className="text-xs font-medium">{ganChinese}</div>
        {gan}
      </div>
      <div
        className={`w-14 h-14 flex flex-col items-center justify-center rounded-b-lg font-bold text-lg ${jiColor.bg} ${jiColor.color}`}
      >
        {ji}
        <div className="text-xs font-medium">{jiChinese}</div>
      </div>
      {animal && <div className="text-xs mt-1">{animal}</div>}
    </div>
  );
};

interface OhaengProps {
  ohaeng: string;
  percentage: number;
}

const Ohaeng: React.FC<OhaengProps> = ({ ohaeng, percentage }) => {
  const ohaengColor = getOhaengColor(ohaeng);
  const chinese = { 목: '木', 화: '火', 토: '土', 금: '金', 수: '水' }[ohaeng];
  return (
    <div className="flex items-center gap-2 font-semibold text-xs text-gray-500 dark:text-gray-200">
      <div className={`w-4 h-4 rounded text-center ${ohaengColor.bg} ${ohaengColor.color}`}>{chinese}</div>
      <div className="text-sm">
        {ohaeng}
        <span className="text-xs">({percentage}%)</span>
      </div>
    </div>
  );
};

interface SajuManseryeokProps {
  saju: Saju;
}

const SajuManseryeok: React.FC<SajuManseryeokProps> = ({ saju }) => {
  const ohaengs = Object.values(saju)
    .filter((item) => typeof item === 'object')
    .flatMap((item) => [item.ganOhaeng, item.jiOhaeng]);

  const ohaengCount = (ohaeng: string): number => ohaengs.filter((e) => e === ohaeng).length;
  const ohaengCounts = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  Object.keys(ohaengCounts).forEach((k) => {
    ohaengCounts[k as keyof typeof ohaengCounts] = ohaengCount(k);
  });

  // 오행의 개수 기준으로 정렬
  const sortedOhaengs = Object.entries(ohaengCounts)
    .map(([ohaeng, count]) => ({ ohaeng, count }))
    .sort((a, b) => b.count - a.count); // 내림차순 정렬

  return (
    <div>
      <h2 className="text-lg leading-tight font-bold mt-3 mb-4">만세력</h2>

      <div>
        <div className="flex justify-around space-x-2">
          <SajuPillar
            title="시주"
            gan={saju.time.gan}
            ji={saju.time.ji}
            animal={saju.time.animal}
            ganOhaeng={saju.time.ganOhaeng}
            ganChinese={saju.time.ganChinese}
            jiOhaeng={saju.time.jiOhaeng}
            jiChinese={saju.time.jiChinese}
          />
          <SajuPillar
            title="일주"
            gan={saju.day.gan}
            ji={saju.day.ji}
            animal={saju.day.animal}
            ganOhaeng={saju.day.ganOhaeng}
            ganChinese={saju.day.ganChinese}
            jiOhaeng={saju.day.jiOhaeng}
            jiChinese={saju.day.jiChinese}
            highlight={true}
          />
          <SajuPillar
            title="월주"
            gan={saju.month.gan}
            ji={saju.month.ji}
            animal={saju.month.animal}
            ganOhaeng={saju.month.ganOhaeng}
            ganChinese={saju.month.ganChinese}
            jiOhaeng={saju.month.jiOhaeng}
            jiChinese={saju.month.jiChinese}
          />
          <SajuPillar
            title="년주"
            gan={saju.year.gan}
            ji={saju.year.ji}
            animal={saju.year.animal}
            ganOhaeng={saju.year.ganOhaeng}
            ganChinese={saju.year.ganChinese}
            jiOhaeng={saju.year.jiOhaeng}
            jiChinese={saju.year.jiChinese}
          />
        </div>

        <div className="my-6 grid grid-cols-2 gap-4 text-sm">
          {sortedOhaengs.map(({ ohaeng, count }, i) => (
            <Ohaeng key={`ohaeng-${i}`} ohaeng={ohaeng} percentage={(count / ohaengs.length) * 100} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SajuManseryeok;
