import { AuthStore } from '@/state/AuthenticationStore';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequireEmail from './RequireEmail';

const SparkyChatArea = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [conversationIndex] = useState(null);
  const [toolbarExpanded] = useState(false);
  const [radioInput, setRadioInput] = useState({
    hours: false,
    always: false,
    never: false,
  });
  const workspace_name =
    AuthStore.user_workspace_info?.active_workspace?.workspace?.company_name;

  const widgetConfig = WidgetConfigStore.config.value;

  useEffect(() => {
    scrollToBottom();
  }, []);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleToolbarExpansion = () => null;

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const requireEmail = JSON.parse(
      localStorage.getItem('requireEmail') as string,
    );
    if (requireEmail) {
      setRadioInput(requireEmail);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', () => {
      setRadioInput(JSON.parse(localStorage.getItem('requireEmail') as string));
    });
  });

  return (
    <div className='relative flex flex-col flex-1 w-full h-full bg-white overflow-y-hidden'>
      <div className='flex-1 flex flex-col overflow-y-hidden'>
        {/* toolbar */}
        <div
          className={`bg-headerBgColor py-[12px] px-[8px] flex flex-row flex-shrink-0`}
        >
          {/* back button */}
          <div
            onClick={handleBack}
            className='px-[12px] py-[24px] flex justify-center items-center cursor-pointer h-0 hover:bg-[#0000002d]  rounded-[8px]'
          >
            <svg
              className='w-[28px] h-[28px] text-white'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                className='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>

          <div
            onClick={handleToolbarExpansion}
            className={`${
              !toolbarExpanded && 'hover:bg-[#0000002d]'
            } rounded-[8px] px-[8px] cursor-pointer ml-[8px] `}
          >
            <AnimatePresence>
              {!toolbarExpanded ? (
                <motion.div className='flex flex-row items-center justify-center '>
                  <div className='relative flex flex-row py-[8px]  justify-center items-center'>
                    <div className='bg-gray-500 w-[32px] h-[32px] flex flex-row justify-center items-center flex-shrink-0  rounded-full'>
                      <svg
                        className='w-[16px] h-[16px] text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <motion.div
                    className='ml-[10px]'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'tween' }}
                  >
                    <p className='text-white  text-[16px] leading-[24px] font-light'>
                      {workspace_name}
                    </p>
                    <div className='flex flex-row justify-start items-center'>
                      <svg
                        className='w-[16px] h-[16px] text-gray-100 mr-[4px]'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        ></path>
                      </svg>
                      <p className='text-gray-100 text-[14px] leading-[20px] font-light'>
                        {widgetConfig?.availability.reply_time}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className='flex flex-col pb-[8px]'
                  initial={{ height: 0 }}
                  animate={{ height: '180px' }}
                  transition={{ type: 'tween' }}
                  exit={{ height: 0 }}
                >
                  <p className='text-white  text-[20px] leading-[28px] font-light my-[8px]'>
                    Sparky
                  </p>
                  <p className='text-[#ffffffc7] font-light text-[14px] leading-[20px] mb-[16px]'>
                    Sparky helps you make personalized cannabis recommendations.
                  </p>
                  <div>
                    <motion.div
                      className='flex flex-row mb-[16px]'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: 'tween', delay: 0.2 }}
                    >
                      <div className='mr-[16px] flex flex-row -space-x-10'>
                        <div className='bg-red-500 h-[56px] w-[56px] rounded-full border-4  border-[#602E9E]'></div>
                        <div className='bg-green-500 h-[56px] w-[56px] rounded-[9999px] border-4  border-[#602E9E]'></div>
                        <img
                          src='https://scontent.flun1-1.fna.fbcdn.net/v/t1.6435-9/39500132_10155573310807401_2542865486727610368_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEm7xlGIvoPy-vPuTYQQcwd1CQcxXR2lHTUJBzFdHaUdE13lgeOOMBVodwGBoY-GaNGLMD27Oh1fRcIQ_yyGOz6&_nc_ohc=4R2AYO8JjY4AX8kTjkO&_nc_ht=scontent.flun1-1.fna&oh=b5037090e4d50eb00979a37aff2600fa&oe=61718E5E'
                          className='bg-black  h-[56px] w-[56px] rounded-[9999px]  border-4  border-[#602E9E]'
                        />
                      </div>
                      <div>
                        <p className='text-[#ffffffc7] text-[14px] leading-[20px] font-light'>
                          Our usual reply time
                        </p>
                        <div className='flex flex-row justify-start items-center'>
                          <svg
                            className='w-[16px] h-[16px] text-white  mr-[8px]'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                            ></path>
                          </svg>
                          <p className='text-white text-[14px] leading-[20px] font-semibold'>
                            {widgetConfig?.availability.reply_time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* chat messages */}
        <div className='overflow-y-auto w-full flex-1 flex flex-col  '>
          {conversationIndex === null ? (
            <div className='flex flex-col items-end justify-end h-full px-[26px] py-[26px]'>
              <div className='group rounded-[8px] p-[10px] bg-transparent  mb-[8px] '>
                <p className='text-[#a7a5aa]  text-[14px] leading-[20px] text-right'>
                  {widgetConfig?.greetings.chat_area_greeting_text}
                </p>
              </div>
              <div
                onClick={() => null}
                className='group rounded-[8px] p-[10px] bg-mainHoverColor mb-[8px] hover:bg-headerBgColor cursor-pointer'
              >
                <p className='text-headerBgColor group-hover:text-white  text-[14px] leading-[20px]'>
                  {widgetConfig?.chat_suggestions.suggestion1}
                </p>
              </div>

              <div
                onClick={() => null}
                className='group rounded-[8px] p-[10px] bg-mainHoverColor mb-[8px] hover:bg-headerBgColor cursor-pointer'
              >
                <p className='text-headerBgColor group-hover:text-white  text-[14px] leading-[20px]'>
                  {widgetConfig?.chat_suggestions.suggestion2}
                </p>
              </div>

              <div
                onClick={() => null}
                className='group rounded-[8px] p-[10px] bg-mainHoverColor  mb-[8px] hover:bg-headerBgColor cursor-pointer'
              >
                <p className='text-headerBgColor group-hover:text-white text-[14px] leading-[20px]'>
                  {widgetConfig?.chat_suggestions.suggestion3}
                </p>
              </div>
              <div ref={bottomRef} />
            </div>
          ) : (
            <div className='flex flex-col items-end  h-full overscroll-y-auto overflow-x-hidden px-[26px] py-[26px]'>
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>
      {/* Require email */}
      {radioInput.never ? null : <RequireEmail />}
      <AnimatePresence>
        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{ type: 'tween', duration: 0.3, ease: 'anticipate' }}
          exit={{ y: '300' }}
          className='flex flex-row w-full border-t border-gray-200 py-[18px] pl-7 pr-5 flex-shrink-0'
        >
          <input
            disabled
            className='flex-1 outline-none text-[16px] mr-[16px] bg-[#ffffff]'
            type='text'
            placeholder='Send a message..'
          />
          <button
            id='sendButton'
            className='flex-shrink-0 mr-[8px] rounded-full pointer-events-none'
          >
            <svg
              className='w-[20px] h-[20px]  text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
              ></path>
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default observer(SparkyChatArea);
