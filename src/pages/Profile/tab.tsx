import { FC } from 'react';

type TabProps = {
  tab: number;
  setTab: (tab: number) => void;
};

export const Tab: FC<TabProps> = ({ tab, setTab }) => {
  return (
    <div className='flex  bg-gray-100 p-[2px] rounded-[8px] h-[38px]'>
      <div
        onClick={() => setTab(0)}
        className={`${
          tab === 0
            ? 'bg-white shadow border border-black border-opacity-20 '
            : ''
        } cursor-pointer flex items-center justify-center text-center p-2 rounded-[7px] w-[100%]`}
      >
        Activities
      </div>
      <div className='h-[25px] mt-[5px] bg-gray-300 shadow-sm w-px mx-2'></div>
      <div
        onClick={() => setTab(1)}
        className={`${
          tab === 1
            ? 'bg-white shadow border border-black border-opacity-20 '
            : ''
        } cursor-pointer flex items-center justify-center text-center p-2 rounded-[7px] w-[100%]`}
      >
        Conversations
      </div>
      <div className='h-[25px] mt-[5px] bg-gray-300 shadow-sm w-px mx-2'></div>
      <div
        onClick={() => setTab(2)}
        className={`${
          tab === 2
            ? 'bg-white shadow border border-black border-opacity-20 '
            : ''
        } cursor-pointer flex items-center justify-center text-center p-2 rounded-[7px] w-[100%]`}
      >
        Tasks
      </div>
    </div>
  );
};
