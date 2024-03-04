import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Text from '@/components/atoms/Text';
import { listStore } from '@/state/ListStore';
import { sideBarStore } from '@/state/SidebarStore';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarMenuIList from '../SidebarMenuIList';
import ToolTip from '@/components/atoms/Tooltip';
interface Route {
  name: string;
  icon?: React.ReactNode;
  path: string;
  count?: number;
  children?: Route[];
  open: boolean;
  isButton: boolean;
  isLine?: boolean;
  comingSoon: boolean;
}

interface NavItemProps {
  routes: Route[];
  handleButtonClick?: () => void;
}

const RouteNavItem: FC<NavItemProps> = ({ routes, handleButtonClick }) => {
  const open = sideBarStore.open;
  const location = useLocation();
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const isAccordionOpen = (index: number) => openIndices.includes(index);

  const handleClick = (index: number) => {
    if (isAccordionOpen(index)) {
      setOpenIndices([]);
    } else {
      setOpenIndices([index]);
    }
  };

  const handleOpen = () => {
    sideBarStore.setOpen(!open);
  };

  const handleDisabled = (e: any) => {
    e.preventDefault();
  };

  const active = location.pathname;

  return (
    <div
      className={`${
        !open ? 'w-[256px]' : 'w-[67px]'
      }  left-0 h-full  p-[16px] max-h-[calc(100vh-48px)] bg-secondary flex flex-col justify-between duration-500 ease-in-out`}
    >
      <div className='w-full overflow-y-auto max-h-[calc(100vh-48px)] no-scrollbar'>
        {routes.map((route, index) => (
          <div key={index}>
            {!route.children || route.children.length === 0 ? (
              <NavLink
                to={route.path}
                className={clsx(
                  `${
                    !open ? 'px-[6px] h-[40px]' : 'pl-[8px] h-[30px]'
                  } self-stretch w-full px-2 py-1.5  items-center gap-4 inline-flex mb-2`,
                  {
                    ' bg-white bg-opacity-10 rounded-md shadow border border-white border-opacity-5':
                      route.path === active,
                  },
                )}
              >
                <div className={'flex items-center justify-center space-x-4'}>
                  <span className='flex items-center justify-center ml-[2px]'>
                    {route.icon}
                  </span>
                  {!open && (
                    <Text size='sm' color='text-white'>
                      {route.name}
                    </Text>
                  )}
                </div>
              </NavLink>
            ) : (
              <button
                type='button'
                className={clsx(
                  isAccordionOpen(index) ? 'text-white' : '',
                  'flex justify-between items-center w-full h-[40px] pl-[10px] focus:outline-none mb-2',
                )}
                onClick={() => handleClick(index)}
              >
                <div className={'flex items-center'}>
                  <span className='flex items-center justify-center'>
                    {route.icon}
                  </span>
                  {!open && (
                    <Text size='sm' color='text-white'>
                      {route.name}
                    </Text>
                  )}
                </div>
                {!open && (
                  <div className='mr-1.5'>
                    {isAccordionOpen(index) ? (
                      <Icon icon={Icons.arrowUp} size={20} color='#DFE1E6' />
                    ) : (
                      <Icon icon={Icons.arrowDown} size={20} color='#DFE1E6' />
                    )}
                  </div>
                )}
              </button>
            )}

            <div
              className={clsx(
                ` ${
                  !open
                    ? 'px-2 ml-4 border-[#FFFFFF14] border-[0.5px] border-y-0 border-r-0'
                    : ''
                }  text-sm`,
                {
                  hidden: !isAccordionOpen(index),
                },
              )}
            >
              <div>
                {route?.children?.map((child, index) => (
                  <div key={index}>
                    {child.isButton ? (
                      <div
                        onClick={handleButtonClick}
                        className={`${
                          open
                            ? 'w-[35px] justify-around px-1'
                            : 'py-2.5 px-2 w-full my-3'
                        } flex items-center  space-x-2 rounded-md  hover:bg-[#033496] cursor-pointer`}
                      >
                        {open ? (
                          <div
                            className='my-1  w-[25px] h-[25px]  flex justify-center
                           items-center rounded-[4px] bg-[#00b1ff20] flex-none'
                          >
                            <Icon icon={Icons.plus} color='white' />
                          </div>
                        ) : (
                          <>
                            <Icon icon={Icons.plus} color='white' />
                            <Text size='sm' color='text-white'>
                              Add favorite list
                            </Text>
                          </>
                        )}
                      </div>
                    ) : (
                      <div key={index}>
                        {child.comingSoon ? (
                          <ToolTip title='Coming soon'>
                            <NavLink
                              to={''}
                              onClick={handleDisabled}
                              className={clsx(
                                `${
                                  open
                                    ? 'w-[35px] py-1 justify-around'
                                    : 'p-2 ml-2 justify-between w-full'
                                } flex text-[#FFFFFF!important] rounded-md hover:bg-[#033496] items-center my-1`,
                                {
                                  'bg-white bg-opacity-10 shadow border border-white border-opacity-5 pointer-events-none':
                                    `${route.path}/${child.path}` === active,
                                },
                              )}
                            >
                              <div className='flex items-center'>
                                {!child.icon ? (
                                  open && (
                                    <div
                                      className={`${
                                        !open ? 'px-[3px] mr-2' : ''
                                      } w-[25px] h-[25px]  flex justify-center items-center rounded-[4px]  py-[2px] bg-[#00b1ff20]`}
                                    >
                                      <Text size='sm'>{child.name[0]}</Text>
                                    </div>
                                  )
                                ) : (
                                  <div
                                    className={`${
                                      !open ? 'px-[3px] mr-2' : ''
                                    } w-[25px] h-[25px]  flex justify-center items-center rounded-[4px]  py-[2px] bg-[#00b1ff20]`}
                                  >
                                    {child.icon}
                                  </div>
                                )}

                                {!open && <Text size='sm'>{child.name}</Text>}
                              </div>

                              {!open && child.count != null && (
                                <div className='w-[25px] h-[25px] flex justify-center items-center rounded-[4px] px-[4px] py-[2px] bg-[#EDEFF210]'>
                                  <Text size='sm' color='white'>
                                    {child.count}
                                  </Text>
                                </div>
                              )}
                            </NavLink>
                          </ToolTip>
                        ) : (
                          <NavLink
                            to={`${
                              child.path == null
                                ? ''
                                : `${route.path}/${child.path}?list=${child.name}`
                            }`}
                            onClick={() => {
                              listStore.setActiveList(child.name);
                            }}
                            className={clsx(
                              `${
                                open
                                  ? 'w-[35px] py-1 justify-around'
                                  : 'p-2 ml-2 justify-between w-full'
                              } flex text-[#FFFFFF!important] rounded-md hover:bg-[#033496] items-center my-1`,
                              {
                                'bg-white bg-opacity-10 shadow border border-white border-opacity-5 pointer-events-none':
                                  `${route.path}/${child.path}` === active,
                              },
                            )}
                          >
                            <div className='flex items-center'>
                              {!child.icon ? (
                                open && (
                                  <div
                                    className={`${
                                      !open ? 'px-[3px] mr-2' : ''
                                    } w-[25px] h-[25px]  flex justify-center items-center rounded-[4px]  py-[2px] bg-[#00b1ff20]`}
                                  >
                                    <Text size='sm'>{child.name[0]}</Text>
                                  </div>
                                )
                              ) : (
                                <div
                                  className={`${
                                    !open ? 'px-[3px] mr-2' : ''
                                  } w-[25px] h-[25px]  flex justify-center items-center rounded-[4px]  py-[2px] bg-[#00b1ff20]`}
                                >
                                  {child.icon}
                                </div>
                              )}

                              {!open && <Text size='sm'>{child.name}</Text>}
                            </div>

                            {!open && child.count != null && (
                              <div className='w-[25px] h-[25px] flex justify-center items-center rounded-[4px] px-[4px] py-[2px] bg-[#EDEFF210]'>
                                <Text size='sm' color='white'>
                                  {child.count}
                                </Text>
                              </div>
                            )}
                          </NavLink>
                        )}
                        {child.isLine && (
                          <div className='h-[1px] w-[190px]  bg-[#FFFFFF14]  mt-6 mb-4'></div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <SidebarMenuIList showName={open} open={open} />

        <div
          onClick={handleOpen}
          className='flex flex-none items-center mt-6  ml-1 cursor-pointer h-4'
        >
          <div className={`${open ? 'transform rotate-180 ' : ''} pt-1 `}>
            <Icon icon={Icons.collapseMenu} color='white' />
          </div>
          {!open && (
            <span className='ml-2'>
              <Text size='sm' color='text-white'>
                Collapse menu
              </Text>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(RouteNavItem);
