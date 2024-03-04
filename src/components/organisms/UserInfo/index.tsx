/* eslint-disable @typescript-eslint/no-unused-vars */
import routeNames from '@/routes/routeNames';
import TimeAgo from 'javascript-time-ago';
import { useEffect, useRef, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { GoGlobe, GoMention } from 'react-icons/go';
import { MdOutlineLaptopMac, MdOutlineWork } from 'react-icons/md';
import {
  RiArrowLeftRightFill,
  RiPhoneFill,
  RiTwitterFill,
  RiWhatsappFill,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { USERTYPE } from '../../../constants';
import { User } from 'types/user.types';
import { ConStore } from '@/state/ConversationStore';
import { AuthStore } from '@/state/AuthenticationStore';
import { capitalizeFirstLetter, getInitialsFromName } from '@/utils/index';
import { useAuth } from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';

const UserInfo = () => {
  const [see_more_toogled, set_see_more_toogled] = useState(false);
  const [edit_toogled, set_edit_toogled] = useState(false);
  const [on_route, set_on_route] = useState(false);
  const [user_name_input_focused, set_user_name_input_focused] =
    useState(false);
  const timeAgo = new TimeAgo('en-US');

  const [user_name, set_user_name] = useState<string | null>(null);
  const [current_user_info, set_current_info] = useState<User | null>(null);
  const [img1Loaded] = useState(false);
  const user_name_ref = useRef(null);
  const navigate = useNavigate();
  const { update_user_info_async } = useAuth();
  const on_username_input_focus = () => set_user_name_input_focused(true);
  const on_username_input_blur = () => {
    set_user_name_input_focused(false);
    set_on_route(false);
    // check if input is different from global value
    if (current_user_info?.user_name.trim() != user_name?.trim()) {
      handle_update_user_name();
    }
  };
  const user_details = [
    {
      id: 1,
      name: 'Type',
      icon: (
        <svg
          className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
            clipRule='evenodd'
          />
        </svg>
      ),
      value: current_user_info
        ? current_user_info.type === USERTYPE.CLIENT
          ? 'Lead'
          : 'Team mate'
        : null,
      visible: true,
    },
    {
      id: 1,
      name: 'Email',
      icon: (
        <GoMention className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.email : null,
      visible: true,
    },
    {
      id: 2,
      name: 'Phone',
      icon: (
        <RiPhoneFill className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.phone_number : null,
      visible: true,
    },
    {
      id: 3,
      name: 'User id',
      icon: (
        <RiArrowLeftRightFill className='text-gray-600 w-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px]  flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info._id?.slice(9) : null,
      visible: true,
    },
    {
      id: 4,
      name: 'First seen',
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.first_seen : null,
      visible: false,
    },
    {
      id: 5,
      name: 'Last seen',
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info?.last_seen
        ? timeAgo.format(new Date(current_user_info?.last_seen), 'round')
        : null,
      visible: true,
    },
    {
      id: 6,
      name: 'Signed up',
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.signup_date : null,
      visible: false,
    },
    {
      id: 7,
      name: 'Last heard from',
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.last_heard : null,
      visible: false,
    },
    {
      id: 8,
      name: 'Last clicked link',
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.last_clicked_link : null,
      visible: false,
    },
    {
      id: 9,
      name: 'Browser language',
      icon: (
        <GoGlobe className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.browser_lang : null,
      visible: false,
    },
    {
      id: 10,
      name: 'Browser',
      icon: (
        <MdOutlineLaptopMac className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.browser : null,
      visible: false,
    },
    {
      id: 11,
      name: 'Device',
      icon: (
        <MdOutlineLaptopMac className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px]  flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.device : null,
      visible: false,
    },
    {
      id: 12,
      name: 'Device platform',
      icon: (
        <MdOutlineLaptopMac className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.device_platform : null,
      visible: false,
    },
    {
      id: 13,
      name: 'Last contacted',
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.last_contacted : null,
      visible: false,
    },
    {
      id: 14,
      name: 'Last opened email',
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.last_opened_email : null,
      visible: false,
    },
    {
      id: 15,
      name: 'Whatsapp number',
      icon: (
        <RiWhatsappFill className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.whatsapp_number : null,
      visible: false,
    },
    {
      id: 16,
      name: 'Twitter follower',
      icon: (
        <RiTwitterFill className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.twitter_followers : null,
      visible: false,
    },
    {
      id: 17,
      name: 'Last known location',
      icon: (
        <GoGlobe className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info
        ? current_user_info.last_known_location.longitude
        : null,
      visible: false,
    },
    {
      id: 18,
      name: 'City',
      icon: (
        <GoGlobe className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.city : null,
      visible: true,
    },
    {
      id: 19,
      name: 'Country',
      icon: (
        <GoGlobe className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.country : null,
      visible: false,
    },
    {
      id: 20,
      name: 'Job title',
      icon: (
        <MdOutlineWork className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4  2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      value: current_user_info ? current_user_info.job_title : null,
      visible: false,
    },
  ];
  useEffect(() => {
    const current_conversation = ConStore.cons.get(
      ConStore.selected_conversation_id as string,
    );
    if (current_conversation?.lead) {
      const current_users_info = AuthStore.users_info.get(
        (current_conversation.lead as User)._id,
      );
      if (current_users_info) {
        set_current_info(current_users_info);
        set_user_name(current_users_info.user_name);
      }
    }
    // set_current_info();
  }, [ConStore.selected_conversation_id, AuthStore.users_info]);
  const handle_update_user_name = () => {
    const update = { id: current_user_info?._id, user: { user_name } };
    update_user_info_async(update);
  };

  return (
    current_user_info && (
      <div className='mb-[24px] border-b border-[#EFEFEF]'>
        <div className='flex  flex-row w-full my-[24px] border-b border-[#EFEFEF] pb-6'>
          <div className='flex flex-col w-full  items-center justify-center group truncate  '>
            {/* <div className="cursor-pointer rounded-full bg-[#6652A9] w-7 h-7 3xl:w-9 3xl:h-9  2xl:w-8 2xl:h-8 mr-2 flex-shrink-0 "></div> */}
            <div
              className={`relative rounded-full cursor-pointer bg-[#6652A9] flex flex-row justify-center items-center  w-16 h-16 3xl:w-16 3xl:h-16  flex-shrink-0 2xl:w-16 2xl:h-16 mr-2 mb-3 ${
                img1Loaded ? 'hidden' : 'block'
              }`}
            >
              <p className='text-[16px] font-medium text-white'>
                {!AuthStore.users_info.has(current_user_info._id)
                  ? getInitialsFromName(current_user_info.user_name)
                  : getInitialsFromName(
                      AuthStore.users_info.get(current_user_info._id).user_name,
                    )}
              </p>
            </div>
            {on_route ? (
              <div className='flex  flex-row items-center justify-center truncate'>
                <input
                  onChange={e => set_user_name(e.target.value)}
                  disabled={AuthStore.user_info_updating}
                  ref={user_name_ref}
                  onBlur={on_username_input_blur}
                  onFocus={on_username_input_focus}
                  className='text-[11px] 3xl:text-[13.5px] 2xl:text-[12px] font-semibold text-black truncate cursor-pointer outline-none bg-[#ffffff]'
                  value={user_name as string}
                />
                <div
                  className={`rounded-full  w-2 h-2 ml-2 ${
                    !AuthStore.users_online_info.has(current_user_info._id)
                      ? 'bg-gray-500'
                      : AuthStore.users_online_info.get(current_user_info._id)
                          .is_online
                      ? 'bg-[#01A63E]'
                      : AuthStore.users_online_info.get(current_user_info._id)
                          .is_online === undefined
                      ? 'bg-gray-500'
                      : 'bg-red-500'
                  } `}
                ></div>
              </div>
            ) : (
              <div className='w-full flex flex-row items-center justify-center truncate'>
                <p
                  onClick={() => {
                    navigate(
                      `${routeNames.dashboard.contacts}/contact-profile/${current_user_info?._id}`,
                    );
                  }}
                  ref={user_name_ref}
                  className='text-[16px] 3xl:text-[16px] 2xl:text-[16px] font-medium text-[#222124] truncate cursor-pointer'
                >
                  {user_name}
                </p>

                {AuthStore.users_online_info.get(current_user_info._id)
                  ?.is_online && (
                  <div className='shrink-0 rounded-full w-2 h-2 ml-2 bg-[#01A63E] '></div>
                )}
              </div>
            )}

            <p className='text-[#656971] text-xs font-medium truncate w-full text-center'>
              {current_user_info.email}
            </p>
          </div>
        </div>
        <div className='flex flex-col mt-3 3xl:mt-4 '>
          {user_details.map((item, index) => {
            if (see_more_toogled) {
              return (
                <div
                  className={`${
                    item.value === null
                      ? 'sr-only'
                      : 'w-full flex flex-row mb-2 items-center truncate justify-between'
                  }`}
                  key={index}
                >
                  <div className='flex flex-row truncate justify-between w-full'>
                    <p className='text-[#222124] font-medium text-[14px] 3xl:text-[14px] 2xl:text-[14px]'>
                      {capitalizeFirstLetter(item.name)}
                    </p>
                    <p className='text-[#5F5F61] font-medium text-[14px] 3xl:text-[14px] 2xl:text-[14px] first-line:text-xs ml-3 truncate'>
                      {capitalizeFirstLetter(
                        item.value
                          ? (item.value as string).toLowerCase()
                          : 'unknown',
                      )}
                    </p>
                  </div>
                  {/* {edit_toogled ? (
                    item.visible ? (
                      <EyeIcon className="cursor-pointer h-3 w-3 3xl:w-4 3xl:h-4 text-gray-500 flex-shrink-0 ml-2" />
                    ) : (
                      <EyeOffIcon className="cursor-pointer h-3 w-3 3xl:w-4 3xl:h-4 text-gray-500 flex-shrink-0 ml-2" />
                    )
                  ) : null} */}
                </div>
              );
            } else {
              if (item.visible) {
                return (
                  <div
                    className={`${
                      item.value === null
                        ? 'sr-only'
                        : 'w-full flex flex-row mb-2 items-center truncate justify-between'
                    }`}
                    key={index}
                  >
                    <div className='flex flex-row truncate justify-between w-full'>
                      <p className='text-[#222124] font-medium text-[14px] 3xl:text-[14px] 2xl:text-[14px] '>
                        {capitalizeFirstLetter(item.name)}
                      </p>
                      <p className='text-[#5F5F61] font-medium text-[14px] 3xl:text-[14px] 2xl:text-[14px] first-line:text-xs ml-3 truncate'>
                        {capitalizeFirstLetter(
                          item.value
                            ? (item.value as string).toLowerCase()
                            : 'unknown',
                        )}
                      </p>
                    </div>
                    {/* {edit_toogled ? (
                      item.visible ? (
                        <EyeIcon className="cursor-pointer h-3 w-3 3xl:w-4 3xl:h-4 2xl:w-[14px] 2xl:h-[14px] text-gray-500 flex-shrink-0 ml-2" />
                      ) : (
                        <EyeOffIcon className="cursor-pointer h-3 w-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] text-gray-500 flex-shrink-0 ml-2" />
                      )
                    ) : null} */}
                  </div>
                );
              }
            }
          })}
        </div>
        {edit_toogled && (
          <div className='flex flex-col mt-1'>
            <div className='flex flex-col w-full mb-2 3xl:mb-3'>
              <button className='self-end'>
                <p
                  className='text-gray-500 text-[11px] 3xl:text-[13.5px] 2xl:text-[12.5px] font-semibold mb-1'
                  onClick={() => set_edit_toogled(false)}
                >
                  Done
                </p>
              </button>
              <div className='rounded-md border-[1.5px] 3xl:border-[2px] 2xl:border-[2px] border-gray-300 flex flex-row px-2 py-[2px] 3xl:px-3 3xl:py-[4px]  2xl:px-[10px] 2xl:py-[3px] items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-3 w-3 text-gray-500 3xl:w-4 3xl:h-4 2xl:w-[14px] 2xl:h-[14px] flex-shrink-0'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
                    clipRule='evenodd'
                  />
                </svg>

                <input
                  className='text-[11px] 3xl:text-[13.5px] 2xl:text-[12.5px] outline-none ml-1'
                  placeholder='search details...'
                />
              </div>
            </div>
            {user_details.map((item, index) => {
              if (!item.visible) {
                return (
                  <div
                    className={`${
                      item.value === null
                        ? 'sr-only'
                        : 'flex flex-row mb-2 items-center truncate justify-between'
                    }`}
                    key={index}
                  >
                    <div className='flex flex-row truncate justify-between'>
                      <p className='text-[#222124] font-medium text-[14px]  3xl:text-[14px] 2xl:text-[14px] '>
                        {capitalizeFirstLetter(item.name)}
                      </p>
                      <p className='text-[#5F5F61] font-medium text-[14px] 2xl:text-[14px] 3xl:text-[14px]  first-line:text-xs ml-3 truncate'>
                        {capitalizeFirstLetter(
                          item.value
                            ? (item.value as string).toLowerCase()
                            : 'unknown',
                        )}
                      </p>
                    </div>
                    {/* {edit_toogled ? (
                      item.visible ? (
                        <EyeIcon className="cursor-pointer h-3 w-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] text-gray-500 flex-shrink-0 ml-2" />
                      ) : (
                        <EyeOffIcon className="cursor-pointer h-3 w-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] text-gray-500 flex-shrink-0 ml-2" />
                      )
                    ) : null} */}
                  </div>
                );
              }
            })}
          </div>
        )}
        <div className='flex flex-row justify-between mt-1 mb-[24px]'>
          {edit_toogled ? null : (
            <div
              className='w-full justify-center flex flex-row items-center border border-[#DFE1E6] shadow rounded-[4px] h-[32px] cursor-pointer'
              onClick={() => set_see_more_toogled(!see_more_toogled)}
            >
              <p className='text-[14px] 3xl:text-[13.5px] 2xl:text-[12.5px] font-medium text-[#161518] '>
                {see_more_toogled ? 'See Less' : 'See  More'}
              </p>
            </div>
          )}
          {see_more_toogled ? null : edit_toogled ? null : (
            <p
              className='text-[11px] 3xl:text-[13.5px] 2xl:text-[12.5px] font-semibold text-gray-500 cursor-pointer sr-only'
              onClick={() => set_edit_toogled(!edit_toogled)}
            >
              Edit
            </p>
          )}
        </div>
        {current_user_info.last_known_location.latitude &&
          current_user_info.last_known_location.longitude && (
            <a
              href={`https://www.google.com/maps/place/${current_user_info.last_known_location.latitude},${current_user_info.last_known_location.longitude}`}
              target='_blank'
              rel='noreferrer'
            >
              <div className='w-full justify-center flex flex-row items-center border mb-4 border-[#DFE1E6] shadow rounded-[4px] h-[32px] cursor-pointer'>
                <p className='text-[14px] 3xl:text-[13.5px] 2xl:text-[12.5px] font-medium text-[#161518] '>
                  Go To Map
                </p>
              </div>
            </a>
          )}
      </div>
    )
  );
};
export default observer(UserInfo);
