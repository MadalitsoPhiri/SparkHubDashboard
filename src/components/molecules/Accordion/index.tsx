import { ChevronDownIcon } from '@/components/atoms/Icons/ChevronDownIcon';
import { ChevronUpIcon } from '@/components/atoms/Icons/ChevronUpIcon';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const Accordion: FC<any> = ({ payload, Content, Icon, handleClick }) => {
  const { Phrase, Title, selected } = payload;

  return (
    <div
      className={`${
        selected
          ? 'border border-[#EFEFEF]  bg-[#FBFCFD] rounded-md'
          : 'border-gray-300 hover:border-primary-medium group bg-white'
      }  my-4  p-4`}
    >
      <div
        className={`flex flex-row items-center justify-between  cursor-pointer ease-in-out duration-300 ${
          selected ? 'mb-6' : 'h-[70px]'
        }`}
        onClick={handleClick}
      >
        <div className='flex flex-row items-center h-[52px]'>
          <div className='flex flex-row items-center justify-center  mr-[16px] w-[40px] h-[40px] rounded-full border border-[#0000000A] bg-[#F5F9FF] flex-none'>
            {Icon}
          </div>
          <div className='flex flex-col'>
            <h3
              className={`${
                selected ? '' : 'group-hover:text-primary-medium'
              } text-[16px] font-[500] leading-[20px] text-[#222] text-opacity-90 mb-[8px]`}
            >
              {Title}
            </h3>
            <p className='text-[14px] leading-[20px] text-[#656971] text-opacity-80'>
              {Phrase}
            </p>
          </div>
        </div>
        {selected ? (
          <ChevronUpIcon className='ease-in-out duration-300 ' />
        ) : (
          <ChevronDownIcon className='ease-in-out duration-300 ' />
        )}
      </div>
      {selected && <div className=''>{Content}</div>}
    </div>
  );
};
export default observer(Accordion);
