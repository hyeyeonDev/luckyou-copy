// components/layout/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import ThemeToggleButton from '@/components/shared/ThemeToggleButton';
import { useAuth } from '@/context/AuthContext';
import { useHistory } from '@/context/HistoryContext';
import HistoryButton from '@/components/History/HistoryButton';
import { LogOut } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Logo from '@/components/Layout/Logo';
import { navLinks } from '@/types/Menu';
import MobileMenuButton from '@/components/Mobile/MobileMenuButton';
import UserIcon from '@/components/shared/UserIcon';

export default function Header() {
  const { user, signOut } = useAuth();
  const { isOpen } = useHistory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* 네비게이션 바 */}
      <header className="flex-none bg-white dark:bg-gray-900 shadow">
        <div className="px-4">
          <div className="flex justify-between h-16">
            <div className="-mr-2 flex items-center justify-between sm:hidden">
              <HistoryButton />
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex sm:items-center sm:space-x-2">{!isOpen && <HistoryButton />}</div>
              <Logo />
              <Navbar />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <ThemeToggleButton />

              <div className="relative">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <UserIcon />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {user?.email?.split('@')[0] || '사용자'}
                    </span>
                  </div>
                  <button
                    onClick={signOut}
                    className="ml-4 inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <LogOut size={14} />
                    로그아웃
                  </button>
                </div>
              </div>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <div className="-mr-2 flex items-center justify-between sm:hidden">
              <MobileMenuButton isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map(({ href, label, iconElement: Icon, activeColor }) => {
              const color = classNames(
                `bg-${activeColor}-50 dark:bg-${activeColor}-900/20 border-${activeColor}-500 text-${activeColor}-700 dark:text-${activeColor}-300`
              );
              return (
                <Link
                  key={href}
                  href={{ pathname: href }}
                  className={`flex items-center px-3 py-2 text-base font-medium border-l-4 ${
                    pathname.includes(href)
                      ? color
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* 사용자정보, 테마토글, 로그아웃 */}
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4">
              <div className="flex-shrink-0 flex items-center gap-2">
                <UserIcon />
                <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                  {user?.email?.split('@')[0] || '사용자'}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {user?.email?.split('@')[1] || ''}
                </div>
              </div>
              <ThemeToggleButton />
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button
                onClick={signOut}
                className="flex items-center gap-2 w-full px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 rounded-md"
              >
                <LogOut size={16} />
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
