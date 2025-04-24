// components/SajuInformation.tsx
import React from 'react';
import { SajuInfo } from '@/types/Saju';
import { Gender } from '@/types/Saju';
import InfoList from '@/components/shared/InfoList';
import InfoItem from '@/components/shared/InfoItem';

interface SajuInformationProps {
  sajuInfo: SajuInfo;
}

const SajuInformation: React.FC<SajuInformationProps> = ({ sajuInfo }) => {
  const getGenderText = (gender: Gender): string => {
    return gender === Gender.MALE ? '남성' : '여성';
  };

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  const formatTime = (timeString: string | null): string => {
    if (!timeString) return '시간 정보 없음';

    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);

    // 오전/오후 표시
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour <= 12 ? hour : hour - 12;

    return `${period} ${displayHour}시 ${minutes}분`;
  };

  return (
    <div>
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">사주 정보</div>
      <h1 className="block mt-1 text-2xl leading-tight font-bold mb-4">{sajuInfo.name}의 사주 정보</h1>

      <InfoList>
        <InfoItem label="이름" value={sajuInfo.name} />
        <InfoItem label="성별" value={getGenderText(sajuInfo.gender)} />
        <InfoItem label="생년월일(양력)" value={formatDate(sajuInfo.birthDate)} />
        <InfoItem label="태어난 시간" value={formatTime(sajuInfo.birthTime)} />
      </InfoList>
    </div>
  );
};

export default SajuInformation;
