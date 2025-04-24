import React from 'react';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full h-full flex items-center align-middle justify-center">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent">
            LuckYou
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">타로카드와 사주풀이로 당신의 운세를 확인하세요</p>
        </div>
        {children}
      </div>
    </main>
  );
}
