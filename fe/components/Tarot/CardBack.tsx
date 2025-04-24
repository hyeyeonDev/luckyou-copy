const CardBack = () => {
  return (
    <div className="w-16 h-24 md:w-24 md:h-32  rounded-lg p-2">
      {/* 카드 테두리 디자인 */}
      <div className="absolute inset-0 rounded-lg border-2 border-blue-400/80 dark:border-violet-400/80 p-2 backdrop-blur-sm bg-fuchsia-300/90 dark:bg-slate-800/90">
        <div className="w-full h-full rounded-lg border border-blue-400/60 dark:border-violet-400/60">
          {/* 안쪽 장식적 요소 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-16 border border-blue-400/40 dark:border-violet-400/40 rounded-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-8 border border-blue-400/30 dark:border-violet-400/30 rounded-lg" />
          {/* 모서리 장식 */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-blue-400/60 dark:border-violet-400/60" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-blue-400/60 dark:border-violet-400/60" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-blue-400/60 dark:border-violet-400/60" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-blue-400/60 dark:border-violet-400/60" />
        </div>
      </div>
    </div>
  );
};

export default CardBack;
