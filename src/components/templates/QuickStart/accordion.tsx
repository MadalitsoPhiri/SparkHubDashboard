import Text from '@/components/atoms/Text';
import React, { ReactNode } from 'react';

interface AccordionProps {
  content: ReactNode;
  title: string;
  icon: ReactNode;
  time: string;
  step: string;
  is_open: boolean;
  toggle: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  content,
  title,
  icon,
  time,
  step,
  is_open,
  toggle,
}) => {
  return (
    <div
      className={`${
        is_open
          ? 'bg-[#FBFCFD] border border-border'
          : 'group hover:bg-[#FBFCFD] '
      }   rounded-[8px]  mb-2 py-3`}
    >
      <div
        className={`flex flex-col gap-y-4 px-4 cursor-pointer ease-in-out duration-300 ${
          is_open ? 'h-[80px]' : 'h-[70px]'
        }`}
        onClick={toggle}
      >
        <div className='flex flex-row items-center space-x-[10px]'>
          <div className='w-[45px] h-[45px] border border-border bg-slate-50 flex flex-col justify-center items-center rounded-full flex-none'>
            <div className='flex flex-col justify-center items-center pl-3 pt-2 w-[30px] h-[30px]'>
              {icon}
            </div>
          </div>
          <h3 className={`font-semibold`}>
            <Text color='text-black' size='md'>
              {title}
            </Text>
          </h3>
        </div>
        <div className='flex flex-row items-start'>
          <span className='mr-1 font-semibold'>
            <Text color='text-[#656971]' size='sm'>
              {step}
            </Text>
          </span>
          <div className='flex flex-row  mr-[10px]'>
            <span className='mr-1 mb-1 font-[600] leading-[18px] text-[12px] text-[#656971]'>
              |
            </span>
            <Text color='text-[#656971]' size='sm'>
              {time}
            </Text>
          </div>
        </div>
      </div>
      <div
        className={`bg-defaultBgColor w-full h-[5px] ${
          is_open ? '' : 'rounded-bl-[12px] rounded-br-[12px]'
        }`}
      ></div>
      {is_open && <div className='py-1 px-2'>{content}</div>}
    </div>
  );
};

export default Accordion;
