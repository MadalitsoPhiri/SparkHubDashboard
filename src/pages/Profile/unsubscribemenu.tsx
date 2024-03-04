/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Popover, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { Fragment } from 'react';

const filter_info = [
  {
    title: 'New conversation',
    sub_title: 'New conversation',
    icon: (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M9 2.1v-.6a.5.5 0 00-.5-.5H4a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3V7.5a.5.5 0 00-.5-.5h-.6a.5.5 0 00-.5.5V12a1.5 1.5 0 01-1.5 1.5H4.1A1.5 1.5 0 012.6 12V4.1a1.5 1.5 0 011.5-1.5h4.4a.5.5 0 00.5-.5zm4.867-.899a.687.687 0 00-.973 0l-.972.973 1.944 1.944.973-.972a.687.687 0 000-.972l-.973-.973z'></path>
        <path d='M13.27 4.715l-1.945-1.944-3.89 3.889C6.352 7.744 6.074 9.098 6.003 9.72a.282.282 0 00.318.318c.622-.071 1.976-.35 3.06-1.434l3.89-3.889z'></path>
      </svg>
    ),
  },
  {
    title: 'Block',
    sub_title: "Block them so you won't get their replies ",
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
    title: 'Unsubscribe',
    sub_title: 'Remove them from your email list',
    icon: (
      <svg
        width='16'
        height='16'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M5.995 5.005a.7.7 0 10-.99.99l5 5a.7.7 0 00.99-.99l-5-5z'></path>
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

const UnsubscribeMenu = (props: any) => {
  return (
    <div>
      <Popover>
        <Menu as='div' className='flex-shrink-0 relative' {...props}>
          <div>
            <Menu.Button
              className={classNames(
                'px-2 py-1.5 cursor-pointer rounded-[4px] shadow border border-border flex justify-center items-center',
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
            <Menu.Items className='absolute z-[100] mt-2 w-[320px] origin-top-right divide-y divide-grey-light overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {filter_info.map(item => (
                <Menu.Item key={item.title}>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        if (item.title === 'Block') {
                          //...
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
                          {item.title}
                        </span>
                      </div>
                      <span className={'text-[13px] leading-[20px] font-[400]'}>
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
    </div>
  );
};

export default UnsubscribeMenu;
