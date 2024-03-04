import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import { filterOperators } from '@/constants/index';
import { FC, useState } from 'react';

type OperatorPickerProps = {
  onSelect: (index: number) => void;
};

export const OperatorPicker: FC<OperatorPickerProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(filterOperators[0]);

  const handleOptionClick = (selectedIdx: number) => {
    onSelect(selectedIdx);
    setSelectedOption(filterOperators[selectedIdx] as any);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button
        className='text-[14px] leading-[20px] flex w-full border mt-1 px-2 justify-between items-center border-border py-1 bg-mainGray rounded-[4px] focus:outline-none focus:bg-white whitespace-nowrap overflow-hidden overflow-ellipsis'
        onClick={() => setIsOpen(!isOpen)}
        title={selectedOption.name}
      >
        {selectedOption.name}
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
        <ul className='absolute left-0 py-1 mt-4 bg-white border rounded-[4px] shadow-lg w-[200px]'>
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
          {filterOperators.map((option, index) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(index)}
              className='cursor-pointer pr-2 pl-3 py-2 hover:bg-gray-100 text-[14px] leading-[20px] flex justify-between items-center whitespace-nowrap overflow-hidden overflow-ellipsis'
              title={option.name}
            >
              {option.name}
              <Icon icon={Icons.arrowRight} color='#000000' />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
