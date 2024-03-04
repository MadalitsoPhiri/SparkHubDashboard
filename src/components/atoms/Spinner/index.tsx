import { FC } from 'react';

interface SpinnerProps {
  size: number;
  color?: string;
}

const Spinner: FC<SpinnerProps> = ({ size, color = '#033EB5' }) => {
  return (
    <div className='flex-1 flex justify-center items-center'>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderColor: color,
          borderTopColor: 'transparent',
        }}
        className='border-2 border-solid rounded-full animate-spin'
      ></div>
    </div>
  );
};

export default Spinner;
