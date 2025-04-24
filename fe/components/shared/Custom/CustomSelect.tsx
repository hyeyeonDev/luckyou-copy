import React from 'react';
import { Select } from 'flowbite-react';

interface CustomSelectProps {
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  name?: string;
  value: string | number | readonly string[] | undefined;
  children?: React.ReactNode;
  tabIndex?: number;
  disabled?: boolean;
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  onClick,
  onChange,
  id,
  name,
  value,
  children,
  tabIndex,
  disabled,
  required = false,
}) => {
  return (
    <Select
      id={id}
      name={name}
      className="w-full my-2 py-1 rounded-md border-none text-dark dark:text-white bg-transparent"
      value={value}
      onClick={onClick}
      onChange={onChange}
      tabIndex={tabIndex}
      disabled={disabled}
      required={required}
    >
      {children}
    </Select>
  );
};

export default CustomSelect;
