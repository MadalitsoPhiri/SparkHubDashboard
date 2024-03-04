import React, { FC } from 'react';

type ContainerProps = {
  title?: string;
  font?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
};

const Container: FC<ContainerProps> = ({ children, font, title }) => {
  let fontSize = '';
  let lineHeight = '';

  switch (font) {
    case 'sm':
      fontSize = 'text-sm';
      lineHeight = 'leading-4';
      break;
    case 'md':
      fontSize = 'text-base';
      lineHeight = 'leading-5';
      break;
    case 'lg':
      fontSize = 'text-lg';
      lineHeight = 'leading-6';
      break;
    case 'xl':
      fontSize = 'text-xl';
      lineHeight = 'leading-7';
      break;
    default:
      fontSize = 'text-base';
      lineHeight = 'leading-5';
  }
  return (
    <div
      className={
        'duration-200 ease-in-out  w-full bg-white border border-[#E6E6E6] rounded-[4px] rounded-b-0'
      }
    >
      {title && <div className={`${fontSize} ${lineHeight} p-4`}>{title}</div>}
      {children}
    </div>
  );
};

export default Container;
