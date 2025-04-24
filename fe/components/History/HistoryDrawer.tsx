"use client";

import React, { useState } from "react";
import { useHistory } from "@/context/HistoryContext";
import HistoryButton from "@/components/History/HistoryButton";
import HistoryList from "@/components/History/HistoryList";
import HistoryItem from "@/components/History/HistoryItem";
import { TAROT_DATA, TarotResponse } from "@/types/Tarot";
import { SAJU_DATA, SajuResponse } from "@/types/Saju";
import HistoryContent from "@/components/History/HistoryContent";

export default function HistoryDrawer() {
  const {
    isOpen,
    tarotHistory,
    sajuHistory,
    selectedHistory,
    setSelectedHistory,
    deleteTarot,
    deleteSaju,
  } = useHistory();

  const handlerItemClick = (item: TarotResponse | SajuResponse) => {
    setSelectedHistory(item);
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-20" />

          {/* 사이드바 */}
          <div
            className={`
                fixed md:relative w-3/4 sm:w-2/3 md:w-1/3 h-full bg-gray-100 dark:bg-gray-900
                shadow-xl md:shadow-none
                transition-transform duration-300 ease-in-out
                ${
                  isOpen
                    ? "translate-x-0"
                    : "-translate-x-full md:translate-x-0"
                }
                overflow-hidden z-30
              `}
          >
            <div className="h-full flex flex-col py-3 px-4">
              {/* 헤더 */}
              <div className="flex justify-between items-center mb-4">
                <HistoryButton />
              </div>

              {/* 타로 히스토리 섹션 */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔮</span>
                  <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    타로
                  </h2>
                </div>
                <div className="overflow-y-auto pr-1 custom-scrollbar">
                  <HistoryList>
                    {tarotHistory.length === 0 ? (
                      <div className="text-center py-4 text-gray-500 dark:text-gray-400 italic text-sm">
                        타로 기록이 없습니다
                      </div>
                    ) : (
                      tarotHistory.map((item) => {
                        const { id, question, createdAt } = item;
                        return (
                          <HistoryItem
                            key={`tarot-history-${id}`}
                            timestamp={createdAt}
                            question={TAROT_DATA[question]?.topic || question}
                            handleClick={() => handlerItemClick(item)}
                            handleDelete={() => deleteTarot(id)}
                            activeColor="amber"
                          />
                        );
                      })
                    )}
                  </HistoryList>
                </div>
              </div>

              {/* 사주 히스토리 섹션 */}
              <div className="flex-1 overflow-hidden flex flex-col mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⭐</span>
                  <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    사주
                  </h2>
                </div>
                <div className="overflow-y-auto pr-1 custom-scrollbar">
                  <HistoryList>
                    {sajuHistory.length === 0 ? (
                      <div className="text-center py-4 text-gray-500 dark:text-gray-400 italic text-sm">
                        사주 기록이 없습니다
                      </div>
                    ) : (
                      sajuHistory.map((item) => {
                        const { id, question, createdAt } = item;
                        return (
                          <HistoryItem
                            key={`saju-history-${id}`}
                            timestamp={createdAt}
                            question={SAJU_DATA[question]?.topic || question}
                            handleClick={() => handlerItemClick(item)}
                            handleDelete={() => deleteSaju(id)}
                            activeColor="purple"
                          />
                        );
                      })
                    )}
                  </HistoryList>
                </div>
              </div>

              {/* 하단 영역 */}
              <div className="mt-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    저장된 히스토리 {tarotHistory.length + sajuHistory.length}개
                  </span>
                  <span className="text-right font-medium text-amber-600 dark:text-purple-400">
                    LuckYou
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedHistory && (
        <HistoryContent
          data={selectedHistory}
          type={"selectedCards" in selectedHistory ? "tarot" : "saju"}
          handleClose={() => setSelectedHistory(null)}
        />
      )}
    </>
  );
}
