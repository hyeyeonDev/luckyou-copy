import React from 'react';
import { Button } from 'flowbite-react';

interface CustomButtonProps {
  color?: string;
  onClick?: () => void;
  children: React.ReactNode;
  tabIndex?: number;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const CustomButton: React.FC<CustomButtonProps> = ({
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
      className={`border-none text-dark dark:text-white bg-gray-400 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700 shadow-lg`}
      color={color}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
