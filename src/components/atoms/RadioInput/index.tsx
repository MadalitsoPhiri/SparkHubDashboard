import React, { FC } from 'react';

interface RadioInputProps {
  label: string;
  onChange: () => void;
  checked: boolean | undefined;
  key?: React.Key | null | undefined;
}

const RadioInput: FC<RadioInputProps> = ({ label, onChange, key, checked }) => {
  return (
    <label htmlFor='' className='flex items-center' key={key}>
      <input
        type='radio'
        name='radio'
        className='cursor-pointer w-4 h-4'
        checked={checked}
        onChange={onChange}
      />
      <p className='ml-3 font-medium text-md text-lightBlack'>{label}</p>
      <span className='checkmark'></span>
    </label>
  );
};

export default RadioInput;
