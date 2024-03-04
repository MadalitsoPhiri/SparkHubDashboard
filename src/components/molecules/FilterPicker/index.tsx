/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import { User } from '@/types/user.types';
import { FC, useState } from 'react';

const options: FilterOption[] = [
  { label: 'Name', value: 'user_name' },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone_number' },
  { label: 'Company', value: 'company_name' },
  { label: 'City', value: 'city' },
];

type FilterOption = {
  label: string;
  value: keyof User;
};

type FilterPickerProps = {
  onSelect: (data: FilterOption) => void;
};

export const FilterPicker: FC<FilterPickerProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<FilterOption>(
    options[0] as FilterOption,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: FilterOption) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        className='text-[14px] leading-[20px] flex w-full border mt-1 px-2 justify-between items-center border-border py-1 bg-mainGray rounded-[4px] focus:outline-none focus:bg-white'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.label}
        <svg
          className={`${isOpen ? 'rotate-180' : ''} w-4 h-4 ml-2`}
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
        <ul className='absolute left-0 py-1 mt-4 bg-white border rounded-[4px] shadow-lg w-[200px] max-h-auto right-0'>
          <div className='p-2 relative flex'>
            <input
              type='text'
              placeholder='Search'
              className={`placeholder:text-[#7E8B99] placeholder:text-md pl-7 pr-12 h-[28px] w-full rounded-[6px] focus:outline-none border border-border focus:border-secondary`}
            />
            <div className='absolute pt-0.5 left-0 flex items-center px-4 pointer-events-none'>
              <Icon icon={Icons.search} size={20} color='#7E8B99' />
            </div>
          </div>
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className='cursor-pointer pr-2 pl-3 py-2 hover:bg-gray-100 text-[14px] leading-[20px] flex justify-between items-center'
            >
              <li>{option.label}</li>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
