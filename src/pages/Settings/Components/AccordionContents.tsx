import { AuthStore } from '@/state/AuthenticationStore';
import { SearchIcon } from '@heroicons/react/outline';
import { ArrowCircleUpIcon, CheckIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiTriangle } from 'react-icons/fi';
import { MdChatBubbleOutline } from 'react-icons/md';
import { TiArrowShuffle } from 'react-icons/ti';
import ToggleSwitch from '../Components/Switch';

const assignment_method = [
  {
    name: 'Manual',
    text: 'Conversations are not automatically assigned',
    subtext: '',
    icon: <MdChatBubbleOutline className='w-[50px] h-[50px]' />,
  },
  {
    name: 'Round robin',
    text: 'Conversations are assinged to teammates in sequential order',
    subtext: '',
    icon: <FiTriangle className='w-[50px] h-[50px]' />,
  },
  {
    name: 'Balanced',
    text: 'Conversations are assigned to teammates with fewest active conversations',
    subtext: '',
    icon: <TiArrowShuffle className='w-[50px] h-[50px]' />,
  },
];

const AccordionContents = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState('');

  const handleSelectedTab = (index: number) => {
    setSelectedTab(index);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearch('');
  };

  return (
    <div>
      <div className='px-8 flex flex-col'>
        <span className='font-bold 2xl:text-lg xl:text-md pb-4'>
          Choose an assignment method
        </span>
        <div className='flex flex-row justify-center items-center space-x-2'>
          {assignment_method.map((item, index) => (
            <div
              className={`border border-border rounded-[7px] w-[500px] 2xl:h-[240px] xl:h-[200px] cursor-pointer ${
                index === selectedTab
                  ? 'border-secondary bg-secondary'
                  : 'hover:border-secondary hover:bg-gray-50 bg-white'
              }`}
              onClick={() => handleSelectedTab(index)}
              key={index}
            >
              <div
                className={`flex flex-row-reverse p-2 ${
                  index === selectedTab ? 'text-white' : 'text-transparent'
                }`}
              >
                <CheckIcon
                  className='2xl:h-5 2xl:w-5 xl:w-4 xl:h-4'
                  aria-hidden='true'
                />
              </div>
              <div className='flex flex-col items-center 2xl:py-4 xl:py-1 2xl:px-20 xl:px-10'>
                <div
                  className={`${
                    index === selectedTab ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`font-bold 2xl:text-lg xl:text-md 2xl:py-2 xl:py-1 ${
                    index === selectedTab ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`2xl:text-[15px] xl:text-[12px] text-center ${
                    index === selectedTab ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {item.text}
                </span>
                <span
                  className={`${
                    item.name === 'Manual'
                      ? 'sr-only'
                      : 'flex items-center border border-border  rounded-[4px] px-2 space-x-2 cursor-pointer'
                  }
                  
                  ${index === selectedTab ? 'text-white' : 'text-gray-500'}`}
                >
                  <ArrowCircleUpIcon className='2xl:w-5 2xl:h-5 xl:w-4 xl:h-4' />{' '}
                  <span className='2xl:text-[14px] xl:text-[12px]'>
                    Get feature
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='border border-b-0 my-6'></div>
        <span className='font-bold 2xl:text-lg xl:text-md'>Teammates</span>
        <div className='flex relative text-sm rounded-md items-center border border-gray-200'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
            <SearchIcon className='2xl:w-4 2xl:h-4 xl:w-3 xl:h-3 text-gray-500' />
          </span>
          <input
            value={search}
            className='2xl:pl-8 xl:pl-6 w-full 2xl:text-[14px] xl:text-[12px] text-black 2xl:p-2 xl:p-1 placeholder:text-gray-500 flex-none outline-none rounded-[4px]'
            placeholder='Add your existing teammates to this team. You need to add at least one teammate to create a team'
            type='search'
            onChange={e => {
              setSearch(e.target.value);
            }}
            onKeyDown={e => {
              if (e.code === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (search.trim() !== '') {
                  handleSubmit(e);
                }
              }
            }}
          />
        </div>
        <div className='my-4'>
          <div className='border border-1  rounded-[5px] bg-opacity-[0.5] bg-gray-50 px-2'>
            <div className='flex flex-row py-2 justify-between'>
              <label
                htmlFor='workspace'
                className='block 2xl:text-lg xl:text-md font-bold'
              >
                Select team office hours
              </label>
              <span className='flex items-center space-x-2 text-secondary cursor-pointer '>
                <ArrowCircleUpIcon className='2xl:w-5 2xl:h-5 xl:w-4 xl:h-4' />{' '}
                <span className='2xl:text-[14px] xl:text-[12px]'>
                  Get feature
                </span>
              </span>
            </div>
            <div>
              <div className='2xl:py-1'>
                <span className='2xl:text-[15px] xl:text-[12px]'>
                  Set up hours for when teammates on this team will be working.
                </span>
              </div>
              <div className='2xl:py-1'>
                <span className='2xl:text-[15px] xl:text-[12px]'>
                  When new conversations are assigned to this team outside of
                  these hours, customers will see when you’ll be back, relative
                  to their timezone.
                </span>
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='2xl:text-[15px] xl:text-[12px] font-bold text-gray-400 2xl:my-4 xl:my-2'>
                Choose office hours
              </span>
              <div
                className='relative 2xl:w-[90px] xl:w-[75px] w-[90px] group block flex  cursor-pointer sm:text-sm items-center px-2 py-1 mb-2 border border-transparent shadow-sm 
            font-medium rounded-[4px] text-black bg-gray-200 focus:outline-none '
              >
                <span className='inset-y-0 absolute right-0 flex items-center pr-2 '>
                  <AiFillCaretDown
                    className='2xl:h-4 2xl:w-4 xl:w-3 xl:h-3 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
                <span className=' 2xl:text-[14px] xl:text-[12px] block truncate text-gray-400'>
                  Default
                </span>
              </div>
            </div>
            <div className='2xl:my-4 xl:my-2'>
              <span className='2xl:text-[13px] xl:text-[10px] text-gray-500'>
                Weekdays 9am – 5pm •{' '}
                {
                  AuthStore.user_workspace_info.active_workspace.workspace
                    .timezone
                }
              </span>
            </div>
          </div>
        </div>

        <div className='my-4'>
          <div className='border border-1  rounded-[5px] bg-opacity-[0.5] bg-gray-50 px-2'>
            <div className='flex flex-row py-2 justify-between'>
              <label
                htmlFor='workspace'
                className='block 2xl:text-lg xl:text-md font-bold'
              >
                Share team reply time
              </label>
              <span className='flex items-center space-x-2 text-candy_yellow cursor-pointer'>
                <ArrowCircleUpIcon className='2xl:w-5 2xl:h-5 xl:w-4 xl:h-4' />{' '}
                <span className='2xl:text-[14px] xl:text-[12px]'>
                  Get feature
                </span>
              </span>
            </div>
            <div className='flex flex-row my-4 items-center'>
              <ToggleSwitch />
              <span className='2xl:text-[15px] xl:text-[12px] 2xl:mx-4 xl:mx-2 mx-3'>
                Use team-specific reply time
              </span>
            </div>
            <div className='2xl:my-4 xl:my-2'>
              <span className='2xl:text-[15px] xl:text-[12px]'>
                Set expectations about how quickly your team replies during
                office hours. Say how soon this team usually replies:
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='border border-b-0'></div>
      <div className='flex flex-row py-10 px-8 justify-between'>
        <div>
          <button
            type='button'
            className='inline-flex items-center 2xl:px-4 2xl:py-[5px] xl:px-3 xl:py-[4px] border border-transparent shadow-sm 2xl:text-[14px] xl:text-[12px] font-bold rounded-md text-red-500 bg-red-100 bg-opacity-[0.4] hover:bg-red-100 focus:outline-none '
          >
            Delete Team
          </button>
        </div>
        <div className='space-x-4'>
          <button
            type='button'
            className='items-center 2xl:px-4 2xl:py-[5px] xl:px-3 xl:py-[4px] border border-transparent shadow-sm 2xl:text-[14px] xl:text-[12px] font-bold rounded-md text-gray-800 bg-gray-100 hover:text-candy_yellow hover:bg-candy_yellow_hover focus:outline-none '
          >
            Cancel
          </button>
          <button
            type='button'
            disabled
            className='items-center 2xl:px-4 2xl:py-[5px] xl:px-3 xl:py-[4px] border border-transparent shadow-sm 2xl:text-[14px] xl:text-[12px] font-bold rounded-md text-white bg-candy_yellow focus:outline-none '
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccordionContents;
