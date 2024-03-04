import { FC } from 'react';

interface IconProps {
  icon: string;
  size?: string | number;
  color?: string;
}

const Icon: FC<IconProps> = ({ icon, size = '1em', color = 'black' }) => {
  return (
    <svg
      viewBox={`0 -6.5 ${size} ${size}`}
      width={size}
      height={size}
      fill={color}
      // className='w-fit'
      xmlns='http://www.w3.org/2000/svg'
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
};

export default Icon;
