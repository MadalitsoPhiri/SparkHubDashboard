import Search from '@/components/atoms/Search';
import FilterTabs from '@/components/molecules/FilterTabs';
import { useState } from 'react';
import ActivityList from './activityList';

const Activities = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (id: number) => {
    setActiveTab(id);
  };
  const options = [
    { id: 0, title: 'All', icon: null },
    { id: 1, title: 'Overdue', icon: null },
    { id: 2, title: 'Due Today', icon: null },
    { id: 3, title: 'Upcoming', icon: null },
  ];
  return (
    <div className='flex flex-col py-4'>
      <div className='flex justify-between mb-4'>
        <div className='relative flex items-center mr-2 sm:w-96 md:w-[500px]'>
          <Search
            placeholder='Search a Activity'
            transparent
            showCommand={false}
          />
        </div>

        <FilterTabs
          options={options}
          onChange={handleTabChange}
          activeTab={activeTab}
        />
      </div>
      <ActivityList />
    </div>
  );
};
export default Activities;
