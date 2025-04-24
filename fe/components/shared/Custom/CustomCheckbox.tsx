import React, { FC, SVGProps } from 'react';
import { TextInput } from 'flowbite-react';

interface CustomCheckboxProps {
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  icon?: FC<SVGProps<SVGSVGElement>> | undefined;
  rightIcon?: FC<SVGProps<SVGSVGElement>> | undefined;
  value?: string | number | readonly string[] | undefined;
  tabIndex?: number;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  checked?: boolean | undefined;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  onClick,
  onChange,
  onKeyDown,
  id,
  name,
  icon,
  rightIcon,
  value,
  tabIndex,
  disabled,
  required = false,
  autoComplete,
  checked,
}) => {
  return (
    <TextInput
      id={id}
      name={name}
      icon={icon}
      rightIcon={rightIcon}
      type="checkbox"
      color="purple-500"
      className="my-2 py-1 rounded-md bg-transparent"
      value={value}
      onChange={onChange}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      checked={checked}
    />
  );
};

export default CustomCheckbox;
