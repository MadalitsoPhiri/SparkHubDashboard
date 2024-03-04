/* eslint-disable @typescript-eslint/no-explicit-any */
import ConfirmationModal from '@/components/atoms/modal/ConfirmationModal';
import { contactStore } from '@/state/ContactStore';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { observer } from 'mobx-react-lite';
import { FC, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

const filter_info = [
  {
    title: 'Archive',
    sub_title: 'Archive this person and their conversation history.',
    icon: (
      <svg
        width='16'
        height='16'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 16 16'
      >
        <path d='M2 5.613V14.5h12V5.613H2zm4.05 1.91h4v1.625h-4V7.523zM1.5 1.5h13v3.25h-13V1.5z'></path>
      </svg>
    ),
  },
  {
    title: 'Block',
    sub_title: "Block them so you won't get their replies.",
    icon: (
      <svg
        width='16'
        height='16'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M10.53 5.47a.75.75 0 010 1.06L9.06 8l1.47 1.47a.75.75 0 11-1.06 1.06L8 9.06l-1.47 1.47a.75.75 0 11-1.06-1.06L6.94 8 5.47 6.53a.75.75 0 011.06-1.06L8 6.94l1.47-1.47a.75.75 0 011.06 0z'></path>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1 8a7 7 0 1114 0A7 7 0 011 8zm7 5.6A5.6 5.6 0 118 2.4a5.6 5.6 0 010 11.2z'
        ></path>
      </svg>
    ),
  },
  {
    title: 'Delete',
    sub_title: 'Permanently delete all conversations and attachments. ',
    icon: (
      <svg
        width='16'
        height='16'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M10.53 5.47a.75.75 0 010 1.06L9.06 8l1.47 1.47a.75.75 0 11-1.06 1.06L8 9.06l-1.47 1.47a.75.75 0 11-1.06-1.06L6.94 8 5.47 6.53a.75.75 0 011.06-1.06L8 6.94l1.47-1.47a.75.75 0 011.06 0z'></path>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1 8a7 7 0 1114 0A7 7 0 011 8zm7 5.6A5.6 5.6 0 118 2.4a5.6 5.6 0 010 11.2z'
        ></path>
      </svg>
    ),
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

type ArchiveBlockMenuProps = {
  handleDelete: (userId: string) => void;
  handleBlock: (userId: string) => void;
};

const ArchiveBlockMenu: FC<ArchiveBlockMenuProps> = ({
  handleDelete,
  handleBlock,
}) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const { id: userId } = useParams<{ id: string }>();

  return (
    <div>
      <Popover>
        <Menu as='div' className='flex-shrink-0 relative'>
          <div>
            <Menu.Button
              className={classNames(
                'px-2 py-1 cursor-pointer rounded-[4px] shadow border border-border flex justify-center items-center',
              )}
              aria-hidden='true'
            >
              <Icon
                icon='mdi:dots-vertical'
                color='#DFE1E6'
                height={18}
                width={18}
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-2 w-[355px] origin-top-right divide-y divide-grey-light overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {filter_info.map(item => (
                <Menu.Item key={item.title}>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        if (item.title === 'Delete') {
                          setIsDelete(true);
                        }
                        if (item.title === 'Block') {
                          setIsBlock(true);
                        }
                      }}
                      className={classNames(
                        active
                          ? 'bg-secondary text-[#FFFFFF]'
                          : 'text-opacity-90',
                        'block py-2 px-4 text-[#222] cursor-pointer',
                      )}
                    >
                      <div className='flex items-center space-x-[7px]'>
                        <span>{item.icon}</span>
                        <span className='text-[14px] leading-[20px]'>
                          {item.title === 'Block' &&
                          contactStore?.contact?.is_blocked
                            ? 'Unblock'
                            : item.title}
                        </span>
                      </div>
                      <span className='text-[13px] leading-[18px]'>
                        {item.sub_title}
                      </span>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </Popover>

      <ConfirmationModal
        title='Block Contact'
        content='Are you sure you want to block this contact?'
        show={isBlock}
        setShow={setIsBlock}
        confirmText='Block'
        onConfirm={() => {
          handleBlock(userId as string);
          setIsBlock(false);
        }}
      />

      <ConfirmationModal
        title='Delete Contact'
        content='Are you sure you want to delete this contact?'
        show={isDelete}
        setShow={setIsDelete}
        confirmText='Delete'
        onConfirm={() => {
          handleDelete(userId as string);
          setIsDelete(false);
        }}
      />
    </div>
  );
};

export default observer(ArchiveBlockMenu);
