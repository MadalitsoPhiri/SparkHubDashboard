import React, { ReactNode } from 'react';
import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Text from '@/components/atoms/Text';

interface AccordionItemProps {
  content: ReactNode;
  title: string;
  position: string;
  sub_is_open: boolean;
  toggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  content,
  title,
  position,
  sub_is_open,
  toggle,
}) => {
  return (
    <div className={`rounded-[8px] bg-white mb-2 border border-border`}>
      <div
        className={`flex flex-row items-center justify-between px-4 cursor-pointer ease-in-out duration-300 ${
          sub_is_open ? 'h-[60px]' : 'h-[50px]'
        }`}
        onClick={toggle}
      >
        <div className='flex flex-row items-center space-x-[10px] group'>
          <div className='font-semibold'>
            <Text color='text-black' size='sm'>
              {`${position}.`}
            </Text>
          </div>
          <h3
            className={`${
              sub_is_open
                ? 'hover:text-primary-medium'
                : 'group-hover:text-primary-medium'
            } font-semibold`}
          >
            <Text color='text-black' size='sm'>
              {title}
            </Text>
          </h3>
        </div>

        {sub_is_open ? (
          <div className='flex flex-col justify-center items-center  pl-2 pt-3'>
            <Icon icon={Icons.arrowUp} size={20} color='blue' />
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center pl-2 pt-3'>
            <Icon icon={Icons.arrowDown} size={20} color='#000000' />
          </div>
        )}
      </div>

      {sub_is_open && <div className='py-1 px-12 mb-4'>{content}</div>}
    </div>
  );
};

export default AccordionItem;
