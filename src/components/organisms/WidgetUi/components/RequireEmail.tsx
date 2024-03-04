import React from 'react';
import { motion } from 'framer-motion';

const RequireEmail = () => {
  return (
    <motion.div
      className='border-borderColor  border-t-2 rounded-[6px] shadow-lg bg-white  mb-[16px] mx-5'
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'tween', duration: 0.4 }}
    >
      <div className='border border-t-none  rounded-[6px] flex flex-col px-[24px] py-[26px]'>
        <p className='font-semibold mb-[12px]  text-[16px] leading-[24px] capitalize'>
          Email address
        </p>
        <div className='w-full flex flex-row h-[40px]'>
          <input
            id='searchInput'
            type='text'
            className='focus:bg-white bg-gray-50 pl-[16px] border border-gray-300 rounded-l-[4px] flex-1 h-full  outline-none shadow-inner text-[16px] leading-[20px]'
            placeholder='Enter your email address'
          />
          <div className='bg-btnColor w-[40px] h-full rounded-r-[4px] flex justify-center items-center cursor-pointer flex-shrink-0'>
            <svg
              className='w-[24px] h-[24px] text-white'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default RequireEmail;
