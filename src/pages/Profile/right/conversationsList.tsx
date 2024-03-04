import FilterTabs from '@/components/molecules/FilterTabs';
import { useState } from 'react';
import {
  ChatIcon,
  EmailIcon,
  SMSIcon,
  MessengerIcon,
  WhatsappIcon,
} from '@/components/molecules/FilterTabs/icons';
import Email from './email';
import Messenger from './messenger';
import SMS from './sms';
import Chat from './chat';
import WhatsApp from './whatsapp';

const ConversationsList = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabChange = (id: number) => {
    setActiveTab(id);
  };
  const options = [
    { id: 1, title: 'Chat', icon: <ChatIcon /> },
    { id: 2, title: 'Email', icon: <EmailIcon />, disabled: true },
    { id: 3, title: 'SMS', icon: <SMSIcon />, disabled: true },
    { id: 4, title: 'Messenger', icon: <MessengerIcon />, disabled: true },
    { id: 5, title: 'WhatsApp', icon: <WhatsappIcon />, disabled: true },
  ];
  return (
    <div className='flex flex-col pt-4 h-screen'>
      <hr className='h-px border-0 bg-[#ECEDF0] my-4'></hr>
      <div className='h-[37px] flex flex-row w-full  justify-between'>
        <FilterTabs
          options={options}
          onChange={handleTabChange}
          activeTab={activeTab}
        />
      </div>
      <hr className='h-px border-0 bg-[#ECEDF0] my-4'></hr>
      {activeTab == 1 && <Chat />}
      {activeTab == 2 && <Email />}
      {activeTab == 3 && <SMS />}
      {activeTab == 4 && <Messenger />}
      {activeTab == 5 && <WhatsApp />}
    </div>
  );
};
export default ConversationsList;
