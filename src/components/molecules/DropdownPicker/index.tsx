import { FC } from 'react';

export type DropdownOption = {
  value: string;
  label: string;
};

type DropdownPickerProps = {
  options: DropdownOption[];
  selected: string | undefined;
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  onSelect: (DropdownOption: DropdownOption) => void;
};

export const DropdownPicker: FC<DropdownPickerProps> = ({
  options,
  selected,
  isOpen,
  setIsOpen,
  onSelect,
}) => {
  return (
    <div className='relative'>
      <button
        className='text-[14px] leading-[20px] flex w-full border mt-1 px-2 justify-between items-center border-border py-2 bg-gray-200 rounded-[4px] focus:outline-none focus:bg-white'
        onClick={() => setIsOpen?.(!isOpen)}
      >
        {selected}
        <svg
          className='w-4 h-4 ml-2'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>
      {isOpen && (
        <ul className='absolute left-0 py-1 bg-white border rounded-b-[4px] shadow-lg w-full'>
          {options.map((option, index) => (
            <li
              key={option.value + index}
              onClick={() => onSelect(option)}
              className='cursor-pointer px-4 py-2 hover:bg-gray-100 text-[14px] leading-[20px]'
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
