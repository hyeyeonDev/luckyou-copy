import { SajuElement, SajuInfo } from '@/types/Saju';
import { daysBetween } from './timer';

const CHEONGAN_DATA: Record<string, { ohaeng: string; chinese: string; eumyang: string }> = {
  갑: { ohaeng: '목', chinese: '甲', eumyang: '양' },
  을: { ohaeng: '목', chinese: '乙', eumyang: '음' },
  병: { ohaeng: '화', chinese: '丙', eumyang: '양' },
  정: { ohaeng: '화', chinese: '丁', eumyang: '음' },
  무: { ohaeng: '토', chinese: '戊', eumyang: '양' },
  기: { ohaeng: '토', chinese: '己', eumyang: '음' },
  경: { ohaeng: '금', chinese: '庚', eumyang: '양' },
  신: { ohaeng: '금', chinese: '辛', eumyang: '음' },
  임: { ohaeng: '수', chinese: '壬', eumyang: '양' },
  계: { ohaeng: '수', chinese: '癸', eumyang: '음' },
};

// 천간(10개): 갑, 을, 병, 정, 무, 기, 경, 신, 임, 계
const CHEONGAN_KEYS = Object.keys(CHEONGAN_DATA);

const JIJI_DATA: Record<string, { animal: string; ohaeng: string; chinese: string; eumyang: string }> = {
  자: { animal: '쥐', ohaeng: '수', chinese: '子', eumyang: '음' },
  축: { animal: '소', ohaeng: '토', chinese: '丑', eumyang: '음' },
  인: { animal: '호랑이', ohaeng: '목', chinese: '寅', eumyang: '양' },
  묘: { animal: '토끼', ohaeng: '목', chinese: '卯', eumyang: '음' },
  진: { animal: '용', ohaeng: '토', chinese: '辰', eumyang: '양' },
  사: { animal: '뱀', ohaeng: '화', chinese: '巳', eumyang: '양' },
  오: { animal: '말', ohaeng: '화', chinese: '午', eumyang: '음' },
  미: { animal: '양', ohaeng: '토', chinese: '未', eumyang: '음' },
  신: { animal: '원숭이', ohaeng: '금', chinese: '申', eumyang: '양' },
  유: { animal: '닭', ohaeng: '금', chinese: '酉', eumyang: '음' },
  술: { animal: '개', ohaeng: '토', chinese: '戌', eumyang: '양' },
  해: { animal: '돼지', ohaeng: '수', chinese: '亥', eumyang: '양' },
};
// 지지(12개): 자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해
const JIJI_KEYS = Object.keys(JIJI_DATA);

// 월 간지 계산용
const MONTH_BRANCHES = ['인', '묘', '진', '사', '오', '미', '신', '유', '술', '해', '자', '축'];
const MONTH_STEMS_TABLE = [
  ['병', '정', '무', '기', '경', '신', '임', '계', '갑', '을', '병', '정'], // 갑, 기
  ['무', '기', '경', '신', '임', '계', '갑', '을', '병', '정', '무', '기'], // 을, 경
  ['경', '신', '임', '계', '갑', '을', '병', '정', '무', '기', '경', '신'], // 병, 신
  ['임', '계', '갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'], // 정, 임
  ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계', '갑', '을'], // 무, 계
];

// 일주 계산용 기준일: 1900-01-31 (갑자일)
const BASE_DATE = new Date(1900, 0, 31);
// 시주 계산용: 일간에 따른 "23시 천간" 출발 인덱스
const HOUR_STEM_START_23 = [0, 2, 4, 6, 8];

// 연주 계산 (Year Pillar)
function getGanzhiYear(year: number, month: number, day: number): string {
  const beforeIpchun = isBeforeIpchun(year, month, day);
  const adjustedYear = beforeIpchun ? year - 1 : year;

  const baseYear = 1924; // 1924 = 갑자년
  const gap = adjustedYear - baseYear;
  const stemIndex = ((gap % 10) + 10) % 10; // 천간
  const branchIndex = ((gap % 12) + 12) % 12; // 지지

  return CHEONGAN_KEYS[stemIndex] + JIJI_KEYS[branchIndex];
}

function isBeforeIpchun(year: number, month: number, day: number): boolean {
  // TODO: 실제 입춘 날짜는 해마다 다를 수 있음. 향후 정확한 데이터로 대체 가능.
  const ipchunDate = new Date(year, 1, 4); // Feb 4 (입춘 근사치)
  const birthDate = new Date(year, month - 1, day);
  return birthDate < ipchunDate;
}

// 월주 계산 (Month Pillar)
function getGanzhiMonth(year: number, month: number, day: number): string {
  const beforeIpchun = isBeforeIpchun(year, month, day);
  let usedMonth = month - 1;
  let adjustedYear = beforeIpchun ? year - 1 : year;

  if (usedMonth < 1) {
    usedMonth += 12;
    adjustedYear -= 1;
  }

  const gap = adjustedYear - 1984;
  const stemIndex = ((gap % 10) + 10) % 10;
  const yearStem = CHEONGAN_KEYS[stemIndex];

  const stemGroup = (() => {
    switch (yearStem) {
      case '갑':
      case '기':
        return 0;
      case '을':
      case '경':
        return 1;
      case '병':
      case '신':
        return 2;
      case '정':
      case '임':
        return 3;
      case '무':
      case '계':
        return 4;
      default:
        throw new Error(`Invalid yearStem = ${yearStem}`);
    }
  })();

  const monthStem = MONTH_STEMS_TABLE[stemGroup][usedMonth - 1];
  const monthBranch = MONTH_BRANCHES[usedMonth - 1];

  return monthStem + monthBranch;
}
// 일주 계산 (Day Pillar)
function getGanzhiDay(dateTime: Date): string {
  const daysBetweenBase = daysBetween(BASE_DATE, dateTime);
  let dayIndex = (daysBetweenBase + 40) % 60;
  if (dayIndex < 0) {
    dayIndex += 60;
  }

  const stemIndex = dayIndex % 10;
  const branchIndex = dayIndex % 12;

  return CHEONGAN_KEYS[stemIndex] + JIJI_KEYS[branchIndex];
}

// 시주 계산 (Hour Pillar)
function getGanzhiHour(dayStem: string, hour: number): string {
  const hourBranchIndex = hour === 23 ? 0 : Math.floor((hour + 1) / 2) % 12;
  const hourBranch = JIJI_KEYS[hourBranchIndex];

  const dayStemIndex = CHEONGAN_KEYS.indexOf(dayStem);
  if (dayStemIndex === -1) {
    console.error(`일간(천간) 찾기 실패: ${dayStem}, 기본값 '갑' 사용`);
    return CHEONGAN_KEYS[0] + hourBranch; // 기본값으로 '갑' 사용
  }

  const group5 = dayStemIndex % 5;
  const stemAt23 = HOUR_STEM_START_23[group5];
  const hourStemIndex = (stemAt23 + hourBranchIndex) % 10;

  return CHEONGAN_KEYS[hourStemIndex] + hourBranch;
}

/**
 * 사주 계산 함수
 */
export function calculateSaju(info: SajuInfo) {
  const { birthDate, birthTime } = info;
  const [year, month, day] = birthDate.split('-').map(Number);
  const [hour, minute] = birthTime ? birthTime.split(':').map(Number) : [0, 0];

  const birthDateTime = new Date(year, month - 1, day, hour, minute);
  const adjust30Min = false; // 한국 사주에서 시간 보정 필요 시 true로 설정
  if (adjust30Min) {
    birthDateTime.setMinutes(birthDateTime.getMinutes() - 30); // 30분 조정 (선택적)
  }

  const adjustYear = birthDateTime.getFullYear();
  const adjustMonth = birthDateTime.getMonth() + 1;
  const adjustDay = birthDateTime.getDate();
  const adjustHour = birthDateTime.getHours();

  const yearPillar = getGanzhiYear(adjustYear, adjustMonth, adjustDay);
  const monthPillar = getGanzhiMonth(adjustYear, adjustMonth, adjustDay);
  const dayPillar = getGanzhiDay(birthDateTime);
  const timePillar = birthTime ? getGanzhiHour(dayPillar.substring(0, 1), adjustHour) : '-';

  const yearGan = yearPillar[0],
    yearJi = yearPillar[1];
  const monthGan = monthPillar[0],
    monthJi = monthPillar[1];
  const dayGan = dayPillar[0],
    dayJi = dayPillar[1];
  const timeGan = timePillar !== '-' ? timePillar[0] : '-',
    timeJi = timePillar !== '-' ? timePillar[1] : '-';

  return {
    year: createSajuElement(yearGan, yearJi),
    month: createSajuElement(monthGan, monthJi),
    day: createSajuElement(dayGan, dayJi),
    time: createSajuElement(timeGan, timeJi),
  };
}

// SajuElement 생성 헬퍼 함수
function createSajuElement(gan: string, ji: string): SajuElement {
  return {
    gan,
    ji,
    animal: ji !== '-' ? JIJI_DATA[ji].animal : '-',
    ganOhaeng: gan !== '-' ? CHEONGAN_DATA[gan].ohaeng : '-',
    ganChinese: gan !== '-' ? CHEONGAN_DATA[gan].chinese : '-',
    jiOhaeng: ji !== '-' ? JIJI_DATA[ji].ohaeng : '-',
    jiChinese: ji !== '-' ? JIJI_DATA[ji].chinese : '-',
  };
}
