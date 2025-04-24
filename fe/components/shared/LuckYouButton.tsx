import React from 'react';
import { Button } from 'flowbite-react';

interface LuckYouButtonProps {
  color?: string;
  onClick?: () => void;
  children: React.ReactNode;
  tabIndex?: number;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const LuckYouButton: React.FC<LuckYouButtonProps> = ({
  type = 'button',
  color = 'none',
  onClick,
  children,
  tabIndex,
  disabled = false,
}) => {
  return (
    <Button
      type={type}
      className={`w-full rounded-lg font-medium text-white bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors ${
        disabled ? 'opacity-70 cursor-not-allowed' : ''
      }`}
      color={color}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
export default LuckYouButton;
