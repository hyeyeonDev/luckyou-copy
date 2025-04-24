'use client';

import React, { useState } from 'react';
import { useSaju } from '@/context/SajuContext';
import { Calendar, Info } from 'lucide-react';
import { Gender } from '@/types/Saju';
import { Label } from 'flowbite-react';
import CustomTextInput from '@/components/shared/Custom/CustomTextInput';
import CustomRadio from '@/components/shared/Custom/CustomRadio';
import CustomCheckbox from '@/components/shared/Custom/CustomCheckbox';
import LuckYouButton from '@/components/shared/LuckYouButton';
import { useLoading } from '@/context/LoadingContext';

const SajuInputPage: React.FC = () => {
  const { sajuInfo, saveSajuInfo, setIsPageLoading } = useSaju();
  const { isLoading, showLoading, hideLoading, setLoadingText } = useLoading();
  const [name, setName] = useState(sajuInfo.name);
  const [gender, setGender] = useState<Gender>(sajuInfo.gender);
  const [birthDate, setBirthDate] = useState(sajuInfo.birthDate);
  const [birthTime, setBirthTime] = useState(sajuInfo.birthTime);
  const [isBirthTimeUnknown, setIsBirthTimeUnknown] = useState(false);

  const handlerChangeBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^0-9]/g, '');
    if (newValue.length > 10) return;

    if (newValue.length >= 4) {
      const year = parseInt(newValue.slice(0, 4), 10);
      const currentYear = new Date().getFullYear(); // 현재 연도 (2025)

      // 연도 범위 제한: 1900 ~ 현재 연도
      if (year < 1900 || year > currentYear) {
        alert(`연도는 1900년부터 ${currentYear}년까지 입력 가능합니다.`);
        setBirthDate('');
        return;
      }

      // 4자리(연도) 입력 시 자동으로 '-' 추가
      newValue = newValue.replace(/(\d{4})(\d{0,2})(\d{0,2})/, (_, year, month, day) => {
        let result = year;
        if (month) result += `-${month}`;
        if (day) result += `-${day}`;
        return result;
      });
    }

    if (newValue.length === 10) {
      // YYYY-MM-DD 완성 시
      const [year, month, day] = newValue.split('-').map(Number);
      const date = new Date(year, month - 1, day); // 월은 0부터 시작하므로 -1
      const isValid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

      if (!isValid) {
        alert('유효한 날짜를 입력해주세요 (예: 1991-02-25).');
        setBirthDate(''); // 유효하지 않으면 초기화
        return;
      }
    }
    setBirthDate(newValue);
  };

  const handleChangeBirthTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    if (newValue.length > 4) return;

    if (newValue.length >= 2) {
      newValue = newValue.replace(/(\d{2})(\d{0,2})/, (_, hours, minutes) => {
        let result = hours;
        if (minutes) result += `:${minutes}`;
        return result;
      });

      const [hours, minutes] = newValue.split(':');
      if (+hours > 23 || (minutes && +minutes > 59)) {
        setBirthTime('');
        return alert('유효한 시간을 입력해주세요 (00:00 ~ 23:59).');
      }
    }
    setBirthTime(newValue);
  };

  const submitSajuInfo = async () => {
    if (!name.trim() || !birthDate || (!isBirthTimeUnknown && !birthTime)) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    // 로딩 상태 설정 및 로딩 UI 표시
    setLoadingText(`${name}님의 사주를 분석중입니다`);
    showLoading();

    // Next.js 기본 로딩 UI 비활성화
    setIsPageLoading(false);

    // 로딩 시작 시간 기록
    const loadingStartTime = Date.now();

    const newSajuInfo = {
      name,
      gender,
      birthDate,
      birthTime: isBirthTimeUnknown ? null : birthTime,
    };

    try {
      await saveSajuInfo(newSajuInfo);

      // 현재 시간과 로딩 시작 시간의 차이 계산
      const elapsedTime = Date.now() - loadingStartTime;

      // 2초(2000ms)가 안 지났으면 남은 시간만큼 대기
      if (elapsedTime < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsedTime));
      }

      // 주의: 여기서 로딩을 끄지 않음 - 라우팅 중에도 로딩 UI 유지
      // hideLoading은 호출하지 않습니다
    } catch (error) {
      console.error('정보 저장 중 오류가 발생했습니다:', error);
      alert('정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
      // 오류 발생 시에만 로딩 UI 제거
      hideLoading();
    }
  };

  return (
    <div className="w-full max-w-screen-sm">
      {/* title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent mb-2">
        사주 풀이
      </h1>

      {/* description */}
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        생년월일과 태어난 시간을 입력하면 사주팔자를 분석해 드립니다
      </p>

      {/* content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          <Calendar className="mr-2" size={20} />
          생년월일 정보
        </h2>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between gap-4">
            <div className="basis-1/2">
              <Label htmlFor="name" value="이름" />
              <CustomTextInput
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="이름을 입력하세요"
              />
            </div>
            {/* 성별 선택 */}
            <div className="basis-1/2">
              <Label htmlFor="gender" value="성별" />
              <div className="flex gap-2">
                <CustomRadio
                  id="male"
                  name="gender"
                  value={Gender.MALE}
                  isChecked={gender === Gender.MALE}
                  onChange={() => setGender(Gender.MALE)}
                >
                  남성
                </CustomRadio>
                <CustomRadio
                  id="female"
                  name="gender"
                  value={Gender.FEMALE}
                  isChecked={gender === Gender.FEMALE}
                  onChange={() => setGender(Gender.FEMALE)}
                >
                  여성
                </CustomRadio>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between gap-4 items-center">
            {/* 년월일 선택 */}
            <div className="basis-1/3">
              <Label htmlFor="birthDate" value="생년월일(양력)" />
              <CustomTextInput
                id="birthDate"
                name="birthDate"
                value={birthDate}
                onChange={handlerChangeBirthDate}
                placeholder="1991-02-25"
                maxLength={10}
                required
              />
            </div>
            {/* 시간 선택 */}
            <div className="basis-1/3">
              <Label htmlFor="birthTime" value="태어난 시간" />
              <CustomTextInput
                id="birthTime"
                value={birthTime || ''}
                onChange={handleChangeBirthTime}
                placeholder="00:00"
                maxLength={5}
                disabled={isBirthTimeUnknown}
                required={!isBirthTimeUnknown}
              />
            </div>
            {/* 시간 모름 */}
            <div className="basis-1/3">
              <Label htmlFor="birthTime" value=" " />
              <div className="flex items-center gap-2">
                <CustomCheckbox
                  id="isBirthTimeUnknown"
                  checked={isBirthTimeUnknown}
                  onChange={() => setIsBirthTimeUnknown(!isBirthTimeUnknown)}
                />
                <Label htmlFor="isBirthTimeUnknown" value="태어난 시간 모름" />
              </div>
            </div>
          </div>

          {/* 정보 표시 섹션 */}
          <div className="mt-6 bg-amber-100 dark:bg-amber-900/20 p-4 rounded-lg flex items-start space-x-3">
            <Info size={20} className="text-amber-500 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p>
                사주 풀이는 사주명리학을 기반으로 분석됩니다. 가장 정확한 결과를 위해 정확한 출생 시간을 입력해주세요.
              </p>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="mt-8">
            <LuckYouButton
              disabled={!birthDate || (!birthTime && !isBirthTimeUnknown) || !name.trim()}
              onClick={submitSajuInfo}
            >
              정보 저장하기
            </LuckYouButton>
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded-lg text-sm">
        <p className="font-medium mb-2">사주 풀이란?</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            사주팔자(四柱八字)는 태어난 연, 월, 일, 시를 나타내는 네 개의 기둥(四柱)과 각 기둥을 천간(天干)과
            지지(地支)로 표현하는 여덟 글자(八字)를 말합니다.
          </li>
          <li>
            LuckYou의 사주 풀이는 전통적인 사주명리학을 기반으로 현대적인 분석을 더해 여러분의 인생 여정에 도움이 될 수
            있는 통찰력을 제공합니다.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SajuInputPage;
