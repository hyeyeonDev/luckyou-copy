'use client';

import React, { ForwardRefExoticComponent, RefAttributes, useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { LucideProps } from 'lucide-react';
import { navLinks } from '@/types/Menu';

interface MenuLinkCardProps {
  href: string;
  label: string;
  iconElement: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  activeColor: string;
  description: string;
}

const MenuLinkCard: React.FC<MenuLinkCardProps> = ({ href, label, iconElement: Icon, activeColor, description }) => {
  const iconBg = classNames('flex-shrink-0 rounded-md p-3', `bg-${activeColor}-100`, `dark:bg-${activeColor}-900/30`);
  const iconColor = classNames('h-6 w-6', `text-${activeColor}-600`, `dark:text-${activeColor}-400`);

  return (
    <Link href={{ pathname: href }}>
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className={iconBg}>
              <Icon className={iconColor} />
            </div>
            <div className="ml-5">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{label}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function LuckYouStartPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">LuckYou에 오신 것을 환영합니다</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
            운세를 확인하려면 아래 서비스를 선택해주세요
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            {navLinks.map(({ href, label, iconElement: Icon, activeColor, description }) => {
              return (
                <MenuLinkCard
                  key={href}
                  href={href}
                  label={label}
                  iconElement={Icon}
                  activeColor={activeColor}
                  description={description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
