import { IconProps } from '@/types/icon.type';
import { FC } from 'react';

export const ChevronDownIcon: FC<IconProps> = ({ className }) => {
  return (
    <svg
      width='16'
      height='9'
      className={className}
      viewBox='0 0 16 9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z'
        fill='#5F5F61'
      />
    </svg>
  );
};
