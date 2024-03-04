import React, { FC } from 'react';

type TextProps = {
  color?: string;
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
};

const Text: FC<TextProps> = ({ color, size, weight, children, className }) => {
  let fontSize = '';
  let lineHeight = '';
  let fontWeight = '';

  switch (size) {
    case 'xs':
      fontSize = 'text-[12px]';
      lineHeight = 'leading-[16px]';
      break;
    case 'sm':
      fontSize = 'text-[14px]';
      lineHeight = 'leading-[20px]';
      break;
    case 'md':
      fontSize = 'text-[16px]';
      lineHeight = 'leading-[24px]';
      break;
    case 'lg':
      fontSize = 'text-[24px]';
      lineHeight = 'leading-[36px]';
      break;
    case 'xl':
      fontSize = 'text-xl';
      lineHeight = 'leading-7';
      break;
    default:
      fontSize = 'text-base';
      lineHeight = 'leading-5';
  }
  switch (weight) {
    case 'bold':
      fontWeight = 'font-bold';
      break;
    case 'medium':
      fontWeight = 'font-medium';
      break;
    case 'light':
      fontWeight = 'font-light';
      break;
    default:
      fontWeight = 'font-base';
  }

  return (
    <p
      className={`${color} ${fontSize} ${lineHeight} ${fontWeight} ${className}`}
    >
      {children}
    </p>
  );
};

export default Text;
