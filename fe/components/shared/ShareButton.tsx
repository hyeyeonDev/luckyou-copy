'use client';

import { Share } from 'lucide-react';
import { SAJU_DATA, SajuResponse } from '@/types/Saju';
import { TAROT_DATA, TarotResponse } from '@/types/Tarot';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface ShareButtonProps {
  data: TarotResponse | SajuResponse;
}

const ShareButton: React.FC<ShareButtonProps> = ({ data }) => {
  const pathname = usePathname();
  const { question } = data;
  const isTarot = 'selectedCards' in data;
  const _DATA = isTarot ? TAROT_DATA : SAJU_DATA;
  // 공유하기 버튼 클릭 시 실행되는 함수
  const handleShare = async () => {
    const slug = (data as TarotResponse).slug;
    if (!slug) {
      alert('공유 링크를 생성할 수 없습니다. 결과 식별자가 없습니다.');
      return;
    }

    // 실제 URL 경로에 맞게 수정
    const shareUrl = `${window.location.origin}/tarot/result/${slug}`;
    const shareTitle = _DATA[question]?.topic || question;
    const shareText = 'LuckYou에서 나의 타로 결과를 확인해보세요!';
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;

    try {
      // if (navigator.share) {
      //   await navigator.share({
      //     title: shareTitle,
      //     text: shareText,
      //     url: shareUrl,
      //   });
      // } else {
      //   window.open(twitterShareUrl, "_blank");
      //   await navigator.clipboard.writeText(shareUrl);
      //   alert("공유 링크가 클립보드에 복사되었습니다!");
      // }
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('공유 링크가 복사되었습니다!');
      } catch (error) {
        console.error('클립보드 복사 중 오류 발생:', error);
        alert('공유 링크 복사에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('공유 중 오류 발생:', error);
      alert('공유에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // http 작동 확인 -> url 직접 보여주고 복사하는 방법도 있음.
  const handleCopyLink = useCallback(() => {
    const slug = (data as TarotResponse).slug;
    if (!slug) {
      alert('공유 링크를 생성할 수 없습니다. 결과 식별자가 없습니다.');
      return;
    }

    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${pathname}/${slug}`;

    if (navigator.clipboard && window.location.protocol === 'https:') {
      // HTTPS 환경에서만 동작
      navigator.clipboard
        .writeText(fullUrl)
        .then(() => alert('링크가 복사되었습니다!'))
        .catch((error) => {
          console.error('링크 복사 실패:', error);
          alert('링크 복사에 실패했습니다.');
        });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = fullUrl;
      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      try {
        // @ts-ignore
        document.execCommand('copy');
        alert('링크가 복사되었습니다!');
      } catch (error) {
        console.error('링크 복사 실패:', error);
        alert('링크 복사에 실패했습니다.');
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }, [pathname]);

  return (
    <button
      onClick={handleCopyLink}
      className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white border border-gray-200 hover:bg-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors text-sm"
    >
      <Share />
      <span>공유하기</span>
    </button>
  );
};

export default ShareButton;
