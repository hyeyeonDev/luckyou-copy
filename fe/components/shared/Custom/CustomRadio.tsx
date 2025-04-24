import React from 'react';
import { Label, Radio } from 'flowbite-react';

interface CustomRadioProps {
  id: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  tabIndex?: number;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ id, name, value, isChecked, onChange, children, tabIndex }) => {
  return (
    <Label
      className={`w-full my-3 py-2.5 rounded-lg text-center shadow-lg flex justify-evenly items-center ${
        isChecked ? 'bg-purple-500' : 'bg-gray-100 dark:bg-gray-600'
      }`}
    >
      <Radio
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={onChange}
        className="hidden text-purple-600 focus:ring-purple-500 border-gray-300"
      />
      <span className="text-gray-700 dark:text-gray-300">{children}</span>
    </Label>
  );
};

export default CustomRadio;
