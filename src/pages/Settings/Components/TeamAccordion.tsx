import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoRocket } from 'react-icons/go';
import AccordionContents from './AccordionContents';

const TeamAccordion = ({ count }: any) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };
  return (
    <motion.div
      className={`rounded-[7px] border ${
        selected ? 'border-secondary' : 'border-border'
      } w-full hover:border-secondary`}
    >
      <div
        onClick={handleClick}
        className={`w-full h-auto px-4 py-4 flex justify-between items-center rounded-lg  hover:cursor-pointer`}
      >
        <div className={` ${selected ? 'hidden' : 'flex flex-row space-x-4'}`}>
          <span className='h-8 w-8 rounded-full overflow-hidden bg-gray-100'>
            <svg
              className='h-full w-full text-gray-300'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
            </svg>
          </span>
          <p className='mt-4 font-light 2xl:text-[15px] xl:text-[13px] text-gray-400'>
            {count} members
          </p>
        </div>
      </div>
      <div
        className={`${
          selected ? 'flex flex-row space-x-4 items-center px-4 pb-4' : 'hidden'
        }`}
      >
        <div className='flex items-center justify-center border hover:border-secondary rounded-[7px] 2xl:w-10 2xl:h-10 xl:w-8 xl:h-8 cursor-pointer'>
          <div>
            <GoRocket />
          </div>
        </div>
        <div>
          <input
            type='text'
            className='w-[110px] font-medium 2xl:text-lg xl:text-md placeholder:text-gray-500 outline-none hover:border-dashed hover:border-b focus:border-dashed focus:border-b '
            placeholder='Untitled Team'
          />
        </div>
      </div>
      <div>
        {selected && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <AccordionContents />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamAccordion;
