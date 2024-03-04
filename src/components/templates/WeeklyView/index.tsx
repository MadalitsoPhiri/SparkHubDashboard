import { useState } from 'react';
import Text from '@/components/atoms/Text';
import WeeklyTasks from './tasks';
import WeeklyActivities from './activities';

export const WeeklyView = () => {
  const [tab, setTab] = useState(0);
  const Tab = () => {
    return (
      <div className='flex  bg-gray-100 p-[2px] rounded-md h-[38px] text-[12px]'>
        <div
          onClick={() => setTab(0)}
          className={`${
            tab === 0
              ? 'bg-white shadow border border-black border-opacity-20 '
              : ''
          } cursor-pointer flex items-center justify-center text-center px-5 py-1 rounded-md w-[100%]`}
        >
          Tasks
        </div>
        <div
          onClick={() => setTab(1)}
          className={`${
            tab === 1
              ? 'bg-white shadow border border-black border-opacity-20 '
              : ''
          } cursor-pointer flex items-center justify-center text-center px-5 py-1 rounded-md w-[100%]`}
        >
          Activities
        </div>
      </div>
    );
  };

  return (
    <div className='bg-white  border border-[#E6E6E6] rounded-[4px]'>
      <div className='p-6 flex flex-col'>
        <div className='flex flex-col justify-between  font-medium leading-normal mb-4'>
          <div className='flex justify-between items-center'>
            <Text color='text-black' size='md'>
              My week
            </Text>
            <Tab />
          </div>
          {tab === 0 ? <WeeklyTasks /> : <WeeklyActivities />}
        </div>
      </div>
    </div>
  );
};
