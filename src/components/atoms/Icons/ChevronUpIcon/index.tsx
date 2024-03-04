import { IconProps } from '@/types/icon.type';
import { FC } from 'react';

export const ChevronUpIcon: FC<IconProps> = ({ className }) => {
  return (
    <svg
      width='16'
      height='10'
      className={className}
      viewBox='0 0 16 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 9C13.7188 9 13.4688 8.90625 13.2812 8.71875L8 3.4375L2.6875 8.71875C2.3125 9.125 1.65625 9.125 1.28125 8.71875C0.875 8.34375 0.875 7.6875 1.28125 7.3125L7.28125 1.3125C7.65625 0.90625 8.3125 0.90625 8.6875 1.3125L14.6875 7.3125C15.0938 7.6875 15.0938 8.34375 14.6875 8.71875C14.5 8.90625 14.25 9 14 9Z'
        fill='#5F5F61'
      />
    </svg>
  );
};
