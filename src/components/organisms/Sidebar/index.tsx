/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import { ChatIcon, SMS } from '@/assets/Icons/inbox';
import Text from '@/components/atoms/Text';
import Modal from '@/components/atoms/modal';
import RouteNavItem from '@/components/molecules/RouteNav';
import { NewListForm } from '@/components/templates/forms/NewListForm';
import { useContact } from '@/hooks/useContact';
import { useList } from '@/hooks/useList';
import routeNames from '@/routes/routeNames';
import { contactStore } from '@/state/ContactStore';
import { listStore } from '@/state/ListStore';
import { ViewGridAddIcon } from '@heroicons/react/outline';
import { AiOutlineRadiusSetting, AiOutlineSetting } from 'react-icons/ai';
import { HiOutlineHome } from 'react-icons/hi2';

import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ConStore } from '@/state/ConversationStore';

const Sidebar = () => {
  const { createList, getLists, closeModal, openModal, open } = useList();
  const { getContacts } = useContact();

  const lists = listStore.lists.map(list => {
    return {
      name: list.name,
      icon: null,
      path: `list/${list._id}`,
      count: list.contact_ids.length,
    };
  });

  const routes = [
    {
      name: 'Dashboard',
      icon: <HiOutlineHome size={17} color='white' />,
      path: routeNames.dashboard.home,
    },
    {
      name: 'Inbox',
      icon: <Icon icon={Icons.inbox} size={30} color='white' />,
      path: routeNames.dashboard.inbox,
      children: [
        {
          name: 'Chat',
          icon: <ChatIcon />,
          path: '',
          count: ConStore.unread_conversations,
        },
        // { name: 'Email', icon: <Email />, path: 'email', count: 20 },
        {
          name: 'SMS',
          icon: <SMS />,
          path: 'sms',
          count: 50,
          comingSoon: true,
        },
        // {
        //   name: 'Messenger',
        //   icon: <Messenger />,
        //   path: 'messenger',
        //   count: 30,
        // },
        // { name: 'Whatsapp', icon: <Whatsapp />, path: 'whatsapp', count: 80 },
      ],
    },
    {
      name: 'Contacts',
      icon: <Icon icon={Icons.contacts} size={30} color='white' />,
      path: routeNames.dashboard.contacts,
      children: [
        {
          name: 'All Contacts',
          icon: null,
          path: '',
          count: contactStore.contacts.length,
        },
        {
          name: 'My Contacts',
          icon: null,
          path: 'my-contacts',
          count: contactStore.myContacts.length,
        },
        {
          name: 'Recently Viewed',
          icon: null,
          path: 'recently-viewed',
          count: contactStore.recentViewContacts.length,
          isLine: true,
        },
        ...lists,
        {
          name: (
            <div className='flex items-center space-x-2'>
              <Icon icon={Icons.plus} color='white' />
              <Text size='sm' color='text-white'>
                Add favorite list
              </Text>
            </div>
          ),
          isButton: true,
        },
      ],
    },
    {
      name: 'Configurations',
      icon: <AiOutlineRadiusSetting className='w-4 h-4 mr-3.5' color='white' />,
      path: routeNames.dashboard.configurations,
      children: [
        { name: 'Styling', icon: null, path: 'styling' },
        { name: 'General', icon: null, path: 'general' },
        { name: 'Offers', icon: null, path: 'offers' },
        { name: 'Setup', icon: null, path: 'setup' },
        { name: 'SparkGPT', icon: null, path: 'sparkgpt' },
      ],
    },
    {
      name: 'Integrations',
      icon: <ViewGridAddIcon className='w-4 h-4' color='white' />,
      path: routeNames.dashboard.integration,
    },
    {
      name: 'Settings',
      icon: <AiOutlineSetting className='w-4 h-4 mr-3.5' color='white' />,
      path: routeNames.dashboard.settings,
      children: [
        {
          name: 'General Settings',
          icon: null,
          path: '',
          count: null,
        },
        { name: 'Teammates', icon: null, path: 'teammates', count: null },
        // TODO: Uncomment when the feature is ready
        // {
        //   name: (
        //     <ToolTip title='Coming soon'>
        //       <Text size='sm' color='text-white'>
        //         Teams & roles
        //       </Text>
        //     </ToolTip>
        //   ),
        // },
        { name: 'Office Hours', icon: null, path: 'office-hours', count: null },
        // {
        //   name: 'Blocked people',
        //   icon: null,
        //   path: 'blocked-people',
        //   count: null,
        // },
        {
          name: 'Custom Fields',
          icon: null,
          path: 'custom-fields',
          count: null,
        },
      ],
    },
  ];

  useEffect(() => {
    getLists();
    getContacts();
  }, []);

  return (
    <div>
      <RouteNavItem
        routes={routes as any}
        handleButtonClick={openModal}
        key={
          contactStore.contacts.length || contactStore.recentViewContacts.length
        }
      />
      <Modal
        show={open}
        openModal={openModal}
        closeModal={closeModal}
        title='Create List'
        className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[440px] text-left align-center  transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <NewListForm closeModal={closeModal} handleCreateList={createList} />
      </Modal>
    </div>
  );
};

export default observer(Sidebar);
