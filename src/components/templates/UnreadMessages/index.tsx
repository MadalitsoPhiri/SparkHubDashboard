import Text from '@/components/atoms/Text';
import FilterTabs, { FilterTabOption } from '@/components/molecules/FilterTabs';
import {
  EmailIcon,
  SMSIcon,
  ChatIcon,
  MessengerIcon,
  WhatsappIcon,
} from '@/components/molecules/FilterTabs/icons';
import MTab from '@/components/molecules/MTab';
// import { ConStore } from '@/state/ConversationStore';
import { useState } from 'react';
import routeNames from '@/routes/routeNames';
import { useNavigate } from 'react-router-dom';

export const UnreadMessage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const navigate = useNavigate();

  const handleTabChange = (id: number) => {
    setActiveTab(id);
  };
  const filterOptions: FilterTabOption[] = [
    { id: 1, title: 'Chat', icon: <ChatIcon /> },
    { id: 1, title: 'SMS', icon: <SMSIcon />, disabled: true },
    { id: 2, title: 'Email', icon: <EmailIcon />, disabled: true },
    { id: 3, title: 'Messenger', icon: <MessengerIcon />, disabled: true },
    { id: 4, title: 'WhatsApp', icon: <WhatsappIcon />, disabled: true },
  ];
  const msg = [
    {
      name: 'Brandon Lee',
      src: undefined,
      online: true,
      time: '23m',
      message:
        "It's important to remember that taking breaks and giving yourself time to rechar...",
    },
    {
      name: 'Ethan Rodrigez',
      src: undefined,
      online: false,
      time: '1h',
      message:
        'Today is a good day to start working towards your goals and aspirations. Whether...',
    },
    {
      name: 'Lily Chen',
      src: undefined,
      online: true,
      time: '2h',
      message:
        "Remember to always be kind to others, even if they are not kind to you. It's easy...",
    },
    {
      name: 'Ava Singh',
      src: undefined,
      online: true,
      time: '2h',
      message:
        'ith hard work, determination, and a positive attitude, you can overcome any obs...',
    },
  ];
  return (
    <div className='bg-white  border border-[#E6E6E6] rounded-[4px]'>
      <div className='p-6 flex flex-col'>
        <div className='flex justify-between items-center font-medium leading-normal my-4'>
          <Text color='text-black' size='md' className='gap-2'>
            Messages
          </Text>

          <div
            onClick={() => {
              navigate(`${routeNames.dashboard.inbox}/?list=Chat`);
            }}
            className='gap-2 z-50'
          >
            <Text color='text-secondary' size='sm' className='cursor-pointer'>
              View all
            </Text>
          </div>
        </div>
        <div className='mb-4 pb-2 -mt-10 overflow-x-auto overflow-y-visible small-scrollbar'>
          <FilterTabs
            options={filterOptions}
            onChange={handleTabChange}
            activeTab={activeTab}
            mt={52}
          />
        </div>
        {activeTab === 1 &&
          msg.map((msg, index) => (
            <MTab
              key={index}
              name={msg.name}
              src={msg.src}
              online={msg.online}
              time={msg.time}
              message={msg.message}
            />
          ))}
        {activeTab === 2 && (
          <div className='mt-20 text-center text-xl font-semibold text-black'>
            Email Content
          </div>
        )}
        {activeTab === 3 && (
          <div className='mt-20 text-center text-xl font-semibold text-black'>
            Messenger Content
          </div>
        )}
        {activeTab === 4 && (
          <div className='mt-20 text-center text-xl font-semibold text-black'>
            WhatsApp Content
          </div>
        )}
      </div>
    </div>
  );
};
