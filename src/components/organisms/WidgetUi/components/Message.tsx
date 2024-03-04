import React, { FC } from 'react';
import { format } from 'timeago.js';
import { motion } from 'framer-motion';
import InputPrompt from './InfoPrompt';
import { observer } from 'mobx-react-lite';

const Message: FC<any> = ({ msg, index, dataSet }) => {
  const lastIndex = dataSet.length - 1;
  const currentIndex = index;

  return msg.sender != 'client' ? (
    msg.isPrompt && msg.prompt.type === 'UserCredential' ? (
      <InputPrompt
        title={msg.prompt.cred}
        lastIndex={lastIndex}
        currentIndex={currentIndex}
        msg={msg}
      />
    ) : (
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ type: 'tween' }}
        className='w-full flex flex-col items-start mb-5'
      >
        <div className='w-full mb-[8px] flex flex-row overflow-x-hidden items-end'>
          {lastIndex == currentIndex && (
            <div className='bg-gray-500 w-[32px] h-[32px] flex flex-row justify-center items-center flex-shrink-0 mr-[12px] mb-[20px] rounded-full'>
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
          )}
          <div className='flex flex-col flex-1 w-full'>
            <p className=' text-[14px] leading-[20px] text-black flex-1 px-[16px] py-[16px] bg-[#e6e4e7] rounded-md  break-words max-w-[85%] mb-[4px]'>
              {msg.text}
            </p>
            {lastIndex == currentIndex && (
              <p className='text-[13px]  leading-[18px] font-light text-gray-700'>
                {msg.sender} • {format(msg.date)}.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    )
  ) : msg.sender === 'client' &&
    msg.isPrompt &&
    msg.prompt.type === 'UserCredential' ? (
    <InputPrompt
      title={msg.prompt.cred}
      lastIndex={lastIndex}
      currentIndex={currentIndex}
      msg={msg}
    />
  ) : (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ type: 'tween' }}
      className='w-full flex flex-col items-end mb-[20px]'
    >
      <p className='text-[14px] leading-[20px] text-white px-[16px] py-[16px] bg-bgColor rounded-[6px] max-w-[90%] break-words mb-[4px]'>
        {msg.text}
      </p>
      {lastIndex == currentIndex && (
        <p className='text-[13px] leading-[18px] font-light text-gray-700'>
          {msg.status === 'sent'
            ? `${format(msg.date)} • ${
                msg.read === false ? 'not seen yet' : 'seen'
              }`
            : msg.status}
        </p>
      )}
    </motion.div>
  );
};
export default observer(Message);
