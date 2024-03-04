import { getInitialsFromName } from '@/helpers/index';
import { useAuth } from '@/hooks/useAuth';
import { AuthStore } from '@/state/AuthenticationStore';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import routeNames from '@/routes/routeNames';
import { useNavigate } from 'react-router-dom';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ProfileMenuItem = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [imgLoaded, setImgLoaded] = useState(false);
  const user = AuthStore.currentUser;

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

  return (
    <Popover>
      <Menu as='div' className='flex-shrink-0'>
        <Menu.Button className='group relative p-4 h-[64px]' aria-hidden='true'>
          <div className='relative z-10'>
            <div className='absolute bg-green-500 rounded-full w-[9px] h-[9px] bottom-0 border-2 border-sideBarColor group-hover:border-defaultBgColor right-0 z-10'></div>
            <div className='relative flex flex-row justify-center items-center rounded-full bg-[#ECD03E] w-8 h-8 overflow-hidden'>
              <p className='absolute text-xs'>
                {getInitialsFromName(
                  AuthStore?.currentUser?.user_name as string,
                )}
              </p>{' '}
              <img
                className={`absolute z-0 ${imgLoaded ? 'block' : 'hidden'}`}
                onError={() => setImgLoaded(false)}
                onLoad={() => setImgLoaded(true)}
                src={AuthStore?.currentUser?.profile_picture_url}
              />
            </div>
          </div>
          <div></div>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute  z-[99999] right-10  w-48 origin-top-right  overflow-hidden rounded-[8px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {userNavigation?.map(item => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <p
                    className={classNames(
                      active
                        ? 'bg-secondary text-[#FFFFFF]'
                        : 'text-opacity-90',
                      'block py-2 px-4 text-[#222] cursor-pointer',
                    )}
                    onClick={() => {
                      if (item?.name === 'Sign out') {
                        logout();
                      }
                      if (item?.name === 'Settings') {
                        navigate(`${routeNames.dashboard.settings}`);
                      }
                      if (item.name === 'Your Profile') {
                        navigate(
                          routeNames.dashboard.agentProfile + '/' + user?._id,
                        );
                      }
                    }}
                  >
                    {item?.name}
                  </p>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </Popover>
  );
};
export default ProfileMenuItem;
