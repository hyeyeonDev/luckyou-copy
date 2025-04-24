// components/History/HistoryContent.tsx
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { SAJU_DATA, SajuResponse } from "@/types/Saju";
import { TAROT_DATA, tarotCards, TarotResponse } from "@/types/Tarot";
import { timeAgo } from "@/utils/timer";
import { X } from "lucide-react";
import CardFront from "@/components/Tarot/CardFront";
import ShareButton from "@/components/shared/ShareButton";

interface HistoryContentProps {
  data: TarotResponse | SajuResponse;
  type: "tarot" | "saju";
  handleClose?: () => void;
}

const HistoryContent: React.FC<HistoryContentProps> = ({
  data,
  type,
  handleClose,
}) => {
  const { question, interpretation, createdAt } = data;
  const isTarot = "selectedCards" in data;
  const selectedCards = isTarot ? data.selectedCards : undefined;
  const _DATA = isTarot ? TAROT_DATA : SAJU_DATA;
  const router = useRouter();
  const pathname = usePathname();

  const handleDrawerClose = () => {
    if (handleClose) {
      handleClose?.();
      return;
    }

    // router.push(`/${type}`);

    const parts = pathname.split("/").slice(0, 2).join("/");
    if (parts === "/tarot" || parts === "/" || parts === "/saju") {
      router.push(parts);
    }
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      {/* 모달 */}
      <div className="w-80 md:w-[30rem] h-5/6 fixed flex flex-col justify-between gap-3 rounded-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
        {/* 헤더 섹션 */}
        <div className="bg-gradient-to-r from-amber-600 to-purple-600 p-5 text-white">
          <div className="flex justify-between items-center">
            <div className="pr-8">
              <h2 className="text-xs uppercase tracking-wider mb-1 opacity-80">
                나의 {isTarot ? "타로" : "사주"} 해석
              </h2>
              <h3 className="text-xl font-bold">
                {_DATA[question]?.topic || question}
              </h3>
            </div>
            <div>
              <button
                onClick={handleDrawerClose}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X />
              </button>
            </div>
          </div>
        </div>

        {/* 카드 섹션 */}
        {isTarot && selectedCards && (
          <div className="flex flex-row max-h-64 flex-nowrap justify-around py-4 px-6 bg-amber-50/50 dark:bg-gray-700/30">
            {selectedCards.split(", ").map((cardName: string, i: number) => {
              const card = tarotCards.find(({ name }) => name === cardName);
              if (!card) return null;
              return <CardFront key={i} card={card} />;
            })}
          </div>
        )}

        {/* 해석 섹션 */}
        <div className="px-6 py-2 flex-grow h-full overflow-y-auto custom-scrollbar">
          <div className="leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-200">
            {interpretation}
          </div>
        </div>

        {/* 푸터 섹션 */}
        <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {timeAgo(createdAt)}
          </div>
          {/* 공유 버튼 */}
          <ShareButton data={data} />
        </div>
      </div>
    </>
  );
};

export default HistoryContent;
