import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Spinner from '@/components/atoms/Spinner';
import Modal from '@/components/atoms/modal';
import { useAuth } from '@/hooks/useAuth';
import { useUpload } from '@/hooks/useUpload';
import routeNames from '@/routes/routeNames';
import { AuthStore } from '@/state/AuthenticationStore';
import { UserIcon } from '@heroicons/react/solid';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { BsClock, BsFillChatSquareQuoteFill } from 'react-icons/bs';
import { GiMailbox } from 'react-icons/gi';
import { GoMention } from 'react-icons/go';
import { HiOutlineChatAlt2, HiPencil } from 'react-icons/hi';
import { MdOutlineWork } from 'react-icons/md';
import { RiTwitterFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

const AgentProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [edit, setEdit] = useState(false);
  const [user_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [twitter_followers, setTwitterFollowers] = useState('');
  const [bio, setBio] = useState('');
  const [job_title, setJob] = useState('');
  const [link, setLink] = useState('');
  const profileInputRef = useRef(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState('');
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const { uploading, upload, response } = useUpload();
  const { get_user_info, update_user_info_async } = useAuth();

  const users_info = AuthStore.users_info;
  const date = new Date(users_info.get(id)?.createdAt);
  const currentUser = AuthStore.currentUser;
  const user = users_info.get(id);
  const createdDate =
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

  const public_details = [
    {
      id: 1,
      name: !users_info.has(id)
        ? ''
        : users_info.get(id).user_name === null
        ? 'Unknown'
        : users_info.get(id).user_name,
      icon: (
        <UserIcon className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: true,
    },
    {
      id: 2,
      name: !users_info.has(id)
        ? ''
        : users_info.get(id).email === null
        ? 'Unknown'
        : users_info.get(id).email,
      icon: (
        <GoMention className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: true,
    },
    {
      id: 3,
      name: 'Active',
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: true,
    },
    {
      id: 4,
      name: !users_info.has(id)
        ? ''
        : users_info.get(id).country === null
        ? 'Unknown'
        : users_info.get(id).country + ',' + users_info.get(id).city,
      icon: (
        <GiMailbox className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: true,
    },
    {
      id: 5,
      name: !users_info.has(id)
        ? ''
        : users_info.get(id).job_title === null
        ? 'No job title yet'
        : users_info.get(id).job_title,
      icon: (
        <MdOutlineWork className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: false,
    },
    {
      id: 6,
      name: !users_info.has(id)
        ? ''
        : users_info.get(id).bio === null
        ? 'Introduce yourself'
        : users_info.get(id).bio,
      icon: (
        <BsFillChatSquareQuoteFill className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: false,
    },
    {
      id: 7,
      name: 'Add a link to your calendar',
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: false,
    },
    {
      id: 8,
      name: !users_info.has(id)
        ? ''
        : users_info.get(id).twitter_followers === null
        ? 'Add your Twitter'
        : users_info.get(id).twitter_followers,
      icon: (
        <RiTwitterFill className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: false,
    },
  ];

  const user_details = [
    {
      id: 1,
      name: 'created at',
      value: !users_info.has(id) ? '' : createdDate,
      icon: (
        <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: true,
    },
    {
      id: 2,
      name: 'email',
      value: !users_info.has(id)
        ? ''
        : users_info.get(id).email === null
        ? 'Unknown'
        : users_info.get(id).email,
      icon: (
        <GoMention className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
      ),
      visible: true,
    },
  ];

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleUpdateDetails = (args: any) => {
    const update = {
      id: id,
      user: {
        user_name,
        job_title,
        bio,
        twitter_followers,
        ...args,
      },
    };
    update_user_info_async(update);
    handleEdit();
  };

  useEffect(() => {
    if (id) {
      setUpdatedUser(updatedUser);
      setName(user?.user_name);
      setEmail(user?.email);
      setBio(user?.bio);
      setJob(user?.job_title);
      setTwitterFollowers(user?.twitter_followers);
    }
  }, [user]);

  useEffect(() => {
    if (id && !users_info.has(id)) {
      get_user_info(id);
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      if (response.status === 200) {
        handleUpdateDetails({ profile_picture_url: response.payload.url });

        closeProfileModal();
      }
    }
  }, [response]);

  if (!users_info.has(id)) {
    return (
      <div className='h-screen  flex justify-center items-center'>
        <Spinner size={40} />
      </div>
    );
  }

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };
  const closeProfileModal = () => {
    setProfileModalOpen(false);
    setProfileImagePreviewUrl('');
    setSelectedProfileImage(null);
  };

  const handleProfileImageSelected = (event: any) => {
    const blob = new Blob([event.target.files[0]]);
    const blobURL = URL.createObjectURL(blob);
    setProfileImagePreviewUrl(blobURL);
    setSelectedProfileImage(event.target.files[0]);
    openProfileModal();
    event.target.value = null;
  };

  const handleProfileImageUpload = () => {
    upload(selectedProfileImage);
  };

  return (
    <div className='flex flex-col w-[100%]'>
      <Modal
        openModal={openProfileModal}
        closeModal={closeProfileModal}
        show={profileModalOpen}
        title='Update profile photo'
        className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[500px] overflow-hidden text-left align-top  transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <img
          ref={profileInputRef}
          src={profileImagePreviewUrl}
          className='w-full aspect-auto mt-5'
        />
        <div className='pt-4 px-4 flex flex-row-reverse'>
          <Button
            onClick={handleProfileImageUpload}
            disabled={uploading}
            type='submit'
            size='sm'
            text={'Save photo'}
            className='text-white hover:bg-primary-medium'
          />
          <Button
            onClick={closeProfileModal}
            disabled={uploading}
            size='sm'
            type='button'
            text={'Cancel'}
            className='mr-[15px] bg-[#f1f1f1] hover:bg-grey-light text-[#222]'
          />
        </div>
      </Modal>
      <div className='sticky top-0  border-b-[0.5px] border-gray-200 bg-gray-50 w-[100%] px-4 pt-20'>
        <div className=' flex flex-row items-center'>
          <div className='mx-6  overflow-hidden relative group'>
            <input
              type='file'
              onChange={handleProfileImageSelected}
              className=' box-border opacity-0 cursor-pointer  absolute top-0 left-0 right-0 bottom-0 z-10'
            />
            <span className='2xl:w-20 2xl:h-20 xl:w-16 xl:h-16 w-20 h-20 group-hover:border-2 border-candy_yellow  bg-gray-200 rounded-full inline-block relative'>
              {currentUser?.profile_picture_url ? (
                <img
                  src={currentUser.profile_picture_url}
                  className='h-full w-full rounded-full '
                />
              ) : (
                <svg
                  className='h-full w-full rounded-full  text-white'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                </svg>
              )}
              <span
                className='flex items-center group-hover:bg-candy_yellow 
              group-hover:border-candy_yellow justify-center absolute bottom-0 right-0
               2xl:h-8 2xl:w-8 xl:h-6 xl:w-6 w-8 h-8 border border-gray-400 rounded-full bg-white'
              >
                <HiPencil className='2xl:w-5 2xl:h-5 xl:w-4 xl:h-4 w-5 h-5 group-hover:text-white text-gray-400' />
              </span>
            </span>
          </div>
          <div className='flex flex-col'>
            <div className='flex space-x-4  pt-4 items-center'>
              <span className='2xl:text-[30px] xl:text-[25px] text-[30px] font-bold text-gray-800'>
                {!users_info.has(id) ? '' : users_info.get(id).user_name}
              </span>
              <span
                className='border rounded-[5px] text-gray-400 2xl:text-[15px] flex items-center
               xl:text-[13px] text-[15px] 2xl:px-4 xl:px-2 px-4 h-[25px] font-bold'
              >
                {!users_info.has(id)
                  ? ''
                  : users_info.get(id).type === 'AGENT'
                  ? 'You'
                  : users_info.get(id).type}
              </span>
            </div>
            <div className='flex flex-row space-x-2 py-2'>
              <div className='flex flex-row items-center space-x-2'>
                <GiMailbox className='2xl:w-5 2xl:h-5 xl:w-4 xl:h-4 w-5 h-5 text-gray-800' />
                <span
                  className='font-bold 2xl:text-[17px] xl:text-[14px] 
                text-[17px] text-gray-800 2xl:pt-2 cursor-pointer
                 hover:text-candy_yellow hover:underline'
                >
                  {!users_info.has(id)
                    ? ''
                    : users_info.get(id).country === null
                    ? 'Unknown'
                    : users_info.get(id).country +
                      ',' +
                      users_info.get(id).city}
                </span>
              </div>
              <div className='flex flex-row items-center space-x-2'>
                <BsClock className='2xl:w-5 2xl:h-5 xl:w-4 xl:h-4 w-5 h-5 text-gray-800' />
                <span className='font-bold 2xl:text-[17px] xl:text-[14px] text-[17px] text-gray-800 2xl:pt-1'>
                  {!users_info.has(id)
                    ? ''
                    : users_info.get(id).last_seen === null
                    ? 'Unknown'
                    : `${users_info.get(id).last_seen} AM`}
                </span>
              </div>
              <div className='flex flex-row items-center space-x-2'>
                <BiCalendar className='2xl:w-5 2xl:h-5 xl:w-4 xl:h-4 w-5 h-5 text-gray-800' />
                <span className='font-bold 2xl:text-[17px] xl:text-[14px] text-[17px] text-gray-800 2xl:pt-1'>
                  Active in the last hour
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=' flex flex-row w-[100%] p-8 bg-white h-full overflow-y-scroll'>
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <span className='2xl:text-[20px] xl:text-[15px] text-[20px] font-bold text-gray-800 '>
              You
            </span>
            <div className='w-[400px]  border rounded-[7px] px-4 pb-4'>
              <div className='flex justify-between items-center py-4'>
                <span className='2xl:text-[17px] xl:text-[15px] text-[17px] text-gray-800 font-bold'>
                  Public profile
                </span>
                {/* <Button
                  type='button'
                  onClick={!edit ? handleEdit : () => handleUpdateDetails(user)}
                  disabled={id === currentUser?._id ? false : true}
                  text={!edit ? 'Edit' : 'Done'}
                /> */}
              </div>
              <div className='border-b-[0.5px]'></div>
              {!edit ? (
                <div className='flex flex-col mt-3 3xl:mt-4 '>
                  {public_details.map(item => (
                    <div
                      className='flex flex-row mb-2 items-center truncate justify-between'
                      key={item.id}
                    >
                      <div className='flex flex-row truncate'>
                        {item.icon}
                        <p
                          className={`${
                            item.name === null
                              ? 'text-gray-500'
                              : 'text-gray-800'
                          } font-semibold text-[11px] 3xl:text-[13.5px] 2xl:text-[12px] ml-2`}
                        >
                          {item.name}
                        </p>
                        {item.id === 4 ? (
                          <div className='flex space-x-2'>
                            <BsClock className=' ml-3 text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
                            <p className='text-black font-medium text-[11px] 3xl:text-[13.5px] 2xl:text-[12px] first-line:text-xs truncate'>
                              {!users_info.has(id)
                                ? ''
                                : users_info.get(id).last_seen === null
                                ? 'Unknown'
                                : `${users_info.get(id).last_seen} AM`}
                            </p>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex flex-col mt-3 3xl:mt-4 pr-4'>
                  <div className='w-full'>
                    <div className=' flex flex-row items-center py-2'>
                      <UserIcon className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
                      <Input
                        type='text'
                        value={user_name}
                        onChange={e => setName(e.target.value)}
                        className='w-full 2xl:text-[14px] xl:text-[12px] text-[14px] py-1 pl-2 ml-4 border-[0.5px]'
                      />
                    </div>
                    <div className='flex flex-row items-center w-full'>
                      <GoMention className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
                      <Input
                        type='text'
                        value={email}
                        disabled
                        onChange={e => setEmail(e.target.value)}
                        className='w-full 2xl:text-[14px] xl:text-[12px] text-[14px] py-1 pl-2 ml-4 border-[0.5px]'
                      />
                    </div>
                    <div className='flex flex-row truncate my-2'>
                      <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
                      <span className='font-semibold text-gray-800 text-[11px] 3xl:text-[13.5px] 2xl:text-[12px] ml-4'>
                        Active
                      </span>
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex flex-row truncate'>
                        <GiMailbox className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
                        <span className='font-semibold text-gray-800 text-[11px] 3xl:text-[13.5px] 2xl:text-[12px] ml-4'>
                          {!users_info.has(id)
                            ? ''
                            : users_info.get(id).country === null
                            ? 'Unknown'
                            : users_info.get(id).country +
                              ',' +
                              users_info.get(id).city}
                        </span>
                        <div className='flex space-x-2'>
                          <BsClock className=' ml-3 text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
                          <p className='text-black font-medium text-[11px] 3xl:text-[13.5px] 2xl:text-[12px] first-line:text-xs truncate'>
                            {!users_info.has(id)
                              ? ''
                              : users_info.get(id).last_seen === null
                              ? 'Unknown'
                              : `${users_info.get(id).last_seen} AM`}
                          </p>
                        </div>
                      </div>
                      <div className='flex flex-row space-x-2 py-2 items-center ml-[30px]'>
                        <input type='checkbox' />
                        <p className='font-normal text-gray-600 text-[11px] 3xl:text-[13.5px] 2xl:text-[12px]'>
                          Hide location from users
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=' flex flex-row items-center'>
                    <MdOutlineWork className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
                    <Input
                      type='text'
                      value={job_title}
                      onChange={e => setJob(e.target.value)}
                      placeholder='Add your job title'
                      className='w-full 2xl:text-[14px] xl:text-[12px] text-[14px] py-1 pl-2 ml-4 border-[0.5px]'
                    />
                  </div>
                  <div className='flex flex-col py-2 w-full'>
                    <div className='flex flex-row w-full'>
                      <BsFillChatSquareQuoteFill className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
                      <textarea
                        maxLength={160}
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        className='w-full 2xl:text-[14px] xl:text-[12px] text-[14px] py-1 pl-2 ml-4 border-gray-50 rounded border-[0.5px]'
                      />
                    </div>
                    <span className='font-normal text-gray-600 text-[11px] 3xl:text-[13.5px] 2xl:text-[12px] ml-[30px]'>
                      160 characters remaining
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-row truncate'>
                      <BiCalendar className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />
                      <input
                        type='text'
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        className='w-[100%] 2xl:text-[14px] xl:text-[12px] text-[14px] py-1 pl-2 ml-4 
                      hover:border-candy_yellow focus:outline-candy_yellow
                     border-[0.5px] rounded-[7px]
                      2xl:placeholder:text-[12px] xl:placeholder:text-[12px]
                      placeholder:text-[12px]
                      '
                        placeholder='Add a link to your calendar'
                      />
                    </div>
                    <div className='flex flex-row space-x-2 py-2 items-center ml-[30px] '>
                      <input type='checkbox' />
                      <p className='font-normal text-gray-600 text-[11px] 3xl:text-[13.5px] 2xl:text-[12px]'>
                        Hide calendar from users
                      </p>
                    </div>
                  </div>
                  <div className=' flex flex-row items-center'>
                    <RiTwitterFill className='text-gray-600 w-3 h-3 3xl:w-4 3xl:h-4 2xl:h-[14px] 2xl:w-[14px] flex-shrink-0' />

                    <div className=' ml-4 mt-1 border-b border-gray-300 focus-within:border-candy_yellow group hover:border-candy_yellow'>
                      <input
                        type='text'
                        value={twitter_followers}
                        onChange={e => setTwitterFollowers(e.target.value)}
                        className='block w-full border-0 border-b border-transparent
                        text-[11px] 3xl:text-[13.5px] placeholder-candy_yellow 
                        group-hover:border-candy_yellow
                         outline-none pl-1 focus:border-candy_yellow focus:ring-0'
                        placeholder='Add your Twitter'
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='w-[400px] border rounded-[7px] my-4 px-4'>
            <div className='flex pt-2'>
              <span className='2xl:text-[17px] xl:text-[15px] text-[17px] text-gray-800 font-bold'>
                Your account
              </span>
            </div>
            <div className='border-b-[0.5px]'></div>
            <div className='flex flex-col mt-3 3xl:mt-4'>
              {user_details.map(item => (
                <div
                  className='flex flex-row mb-2 items-center truncate justify-between'
                  key={item.id}
                >
                  <div className='flex flex-row truncate'>
                    {item.icon}
                    <p
                      className={`text-gray-500 font-semibold text-[11px] 3xl:text-[13.5px] 2xl:text-[12px] ml-2`}
                    >
                      {item.name}
                    </p>
                    <p className='text-black font-medium text-[11px] 3xl:text-[13.5px] 2xl:text-[12px] first-line:text-xs ml-3 truncate'>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex pt-2'>
              <span className='2xl:text-[17px] xl:text-[15px] text-[17px] text-gray-800 font-bold'>
                Teams
              </span>
            </div>
            <div className='border-b-[0.5px]'></div>
            <div className='flex flex-col mt-3 3xl:mt-4'>
              <div className='flex flex-row my-2 items-center truncate justify-between'>
                <div className='2xl:text-[14px] xl:text-[12px] text-[14px] text-gray-400'>{`${
                  !users_info.has(id) ? 'Unknown' : users_info.get(id).user_name
                } is not a member of any teams`}</div>
                <div
                  onClick={() =>
                    navigate(`${routeNames.dashboard.settings}/teams&roles`)
                  }
                  className='block group py-2 px-2 rounded-[7px] hover:bg-candy_yellow_hover cursor-pointer'
                >
                  <HiPencil className='group-hover:text-candy_yellow text-gray-800 w-3 h-3 3xl:w-4 3xl:h-4 xl:h-5 xl:w-5 2xl:h-5 2xl:w-5 flex-shrink-0' />
                </div>
              </div>
            </div>
          </div>
          {/* space div */}
          <div className='py-4 bg-red-300 invisible'></div>
        </div>
        <div className='flex flex-col w-full ml-4'>
          <span className='font-bold text-gray-800 2xl:text-[16px] xl:text-[14px] text-[16px] 2xl:py-[2.5px] xl:py-0'>
            Your conversations
          </span>
          <div className='flex flex-col items-center justify-center w-full h-[200px] border rounded-[7px]'>
            <span>
              {' '}
              <HiOutlineChatAlt2 className='w-[50px] h-[50px] text-gray-500' />
            </span>
            <span className='2xl:text-lg xl:text-md text-lg font-bold text-gray-500'>
              No conversations
            </span>
            <span className='2xl:text-[16px] xl:text-[14px] text-[16px] text-gray-500'>
              No conversations have been assigned to you
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default observer(AgentProfile);
