import React, { FC, SVGProps } from 'react';
import { TextInput } from 'flowbite-react';

interface CustomTextInputProps {
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  icon?: FC<SVGProps<SVGSVGElement>> | undefined;
  rightIcon?: FC<SVGProps<SVGSVGElement>> | undefined;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[] | undefined;
  tabIndex?: number;
  placeholder?: string;
  pattern?: string;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  checked?: boolean | undefined;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  onClick,
  onChange,
  onKeyDown,
  id,
  name,
  icon,
  rightIcon,
  type = 'text',
  value,
  tabIndex,
  placeholder,
  pattern,
  maxLength,
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
      type={type}
      className="w-full my-2 py-1 rounded-md text-dark dark:text-white bg-transparent"
      value={value}
      onChange={onChange}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      placeholder={placeholder}
      pattern={pattern}
      maxLength={maxLength}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
      checked={checked}
    />
  );
};

export default CustomTextInput;
