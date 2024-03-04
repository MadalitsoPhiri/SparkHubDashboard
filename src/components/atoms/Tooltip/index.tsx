import { ReactNode, FC } from 'react';

type ToolTipProps = {
  title: string;
  children: ReactNode;
  right?: boolean;
};

const ToolTip: FC<ToolTipProps> = ({ title, children, right }) => {
  return (
    <div className='cursor-pointer group relative z-40'>
      {children}
      <div
        className={` ${
          right ? 'right-0 ' : 'right-0 left-0'
        } absolute bottom-[36px] flex flex-col items-center  invisible  group-hover:visible`}
      >
        <div className='relative z-10 p-2 overflow-hidden whitespace-no-wrap truncate  text-center text-[14px] leading-[20px] text-black text-opacity-80 border border-[#F1f1f1] whitespace-no-wrap bg-[#fff] shadow-lg rounded-[6px]'>
          {title}
        </div>
        <div className='w-3 h-3 -mt-2 rotate-45 bg-[#fff] border border-white z-20'></div>
      </div>
    </div>
  );
};

export default ToolTip;
