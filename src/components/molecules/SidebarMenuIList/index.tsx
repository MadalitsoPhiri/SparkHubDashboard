import React, { Fragment, FC } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import { useAuth } from '@/hooks/useAuth';
import { useWorkspace } from '@/hooks/useWorkspace';
import routeNames from '@/routes/routeNames';
import { AuthStore } from '@/state/AuthenticationStore';
import { ChevronRightIcon, XIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

type SidebarMenuIListProps = {
  showName?: boolean;
  open?: boolean;
};

const SidebarMenuIList: FC<SidebarMenuIListProps> = ({ showName, open }) => {
  const { logout } = useAuth();
  const { switchWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const user = AuthStore.currentUser;
  const user_workspace_info = AuthStore.user_workspace_info;
  const user_name = user?.user_name || 'Unknown User';

  return (
    <Popover>
      <Menu as='div' className='flex-shrink-0'>
        <div className='flex-shrink-0'>
          <Menu.Button className='block w-full' aria-hidden='true'>
            <div className='flex justify-between items-center cursor-pointer'>
              <div className='flex items-center flex-none'>
                <Avatar
                  className='relative'
                  src={user?.profile_picture_url as string}
                  size='md'
                  alt={user_name}
                  online
                  color='white'
                  textColor='secondary'
                />
                {!showName && (
                  <div className='ml-4'>
                    <Text size='sm' color='text-white'>
                      {user_name}
                    </Text>
                  </div>
                )}
              </div>

              {!showName && <Icon icon={Icons.arrowRight} color='#DFE1E6' />}
            </div>
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
            <div
              id='sidebar_menu'
              className={`${
                open ? 'left-[70px]' : 'left-[260px]'
              }  flex flex-col bottom-[70px]  bg-white
              absolute mt-2  rounded-md shadow-2xl  ring-1 ring-black
               ring-opacity-5 py-3 focus:outline-none w-[250px]
               `}
            >
              <div className='flex flex-row justify-between items-center pr-3 pl-3'>
                <div className='flex items-center flex-none'>
                  <Avatar
                    className='relative'
                    src={user?.profile_picture_url as string}
                    size='md'
                    alt={user_name}
                    online
                  />
                  {!showName && (
                    <div className='ml-2'>
                      <Text size='sm' color='text-gray-500'>
                        {user_name}
                      </Text>
                    </div>
                  )}
                </div>
                <div>
                  <XIcon className='h-5 w-5 hover:text-secondary transition-all text-gray-400 cursor-pointer hover:rotate-90 flex-shrink-0 ' />
                </div>
              </div>
              <div className='flex flex-col gap-1 mt-4 relative border-t border-grey-dark'>
                <p
                  onClick={() => {
                    navigate(
                      routeNames.dashboard.agentProfile + '/' + user?._id,
                    );
                  }}
                  className='pl-3 py-2 text-md text-gray-500 cursor-pointer hover:text-primary-medium  transition-colors'
                >
                  View Profile
                </p>
                <div
                  className='py-2 flex items-center flex-row justify-between cursor-pointer group peer pr-3 pl-3'
                  onClick={() => {
                    //...
                  }}
                >
                  <p className='text-md  text-gray-500 cursor-pointer group-hover:text-primary-medium  transition-colors'>
                    Workspaces
                  </p>

                  <ChevronRightIcon className='h-4 w-4 group-hover:text-primary-medium text-gray-400 cursor-pointer  transition-colors flex-shrink-0 ' />
                </div>

                <div
                  className='py-2 border-t border-grey-dark'
                  onClick={async () => await logout()}
                >
                  <p className='text-md text-gray-500 cursor-pointer hover:text-primary-medium pl-3'>
                    Logout
                  </p>
                </div>
                {/* Workspaces menu */}
                <div className='bg-white w-56 max-h-[300px] flex-col rounded-md shadow-2xl overflow-hidden absolute -right-[226px] bottom-0 peer-hover:flex hidden hover:flex'>
                  <div className='flex-1 w-full h-full overflow-y-auto small-scrollbar'>
                    {user_workspace_info.workspaces.map((workspace, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => switchWorkspace(workspace)}
                          className='p-3 truncate flex flex-row justify-between cursor-pointer group m-1 rounded-md transition-colors hover:bg-secondary hover:text-white text-gray-500'
                        >
                          <p
                            className={`truncate text-md   group-hover:text-primary-medium ${
                              workspace?.active_workspace?.workspace?._id ===
                              workspace._id
                                ? 'text-primary-medium'
                                : ''
                            }`}
                          >
                            {workspace.company_name}
                          </p>

                          {user_workspace_info.active_workspace.workspace
                            ?._id === workspace._id && (
                            <CheckIcon
                              className={`h-4 w-4 group-hover:text-primary-medium cursor-pointer  transition-colors flex-shrink-0 ${
                                user_workspace_info.active_workspace.workspace
                                  ._id === workspace?._id
                                  ? 'text-primary-medium'
                                  : ''
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    onClick={() => navigate(routeNames.workspaces.add)}
                    className='flex-shrink-0 border-t-[0.5px] border-gray-300 p-4 group cursor-pointer flex flex-row justify-center items-center'
                  >
                    <p className='text-md text-gray-500 cursor-pointer group-hover:text-primary-medium'>
                      Add new workspace
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Menu>
    </Popover>
  );
};
export default observer(SidebarMenuIList);
