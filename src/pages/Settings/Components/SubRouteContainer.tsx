import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const SubRouteContainer = ({
  children,
  headerTitle,
  btnTitle,
  handleClick,
  handleBack,
  className,
  loading,
  proceedBtnDisabled,
  cancelBtnDisabled,
}: any) => {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      className=' z-10 flex flex-col w-full h-full overflow-hidden
      rounded-[16px] shadow bg-white py-10'
    >
      <div className='relative px-8 2xl:py-10 xl:py-8 sticky-top'>
        <div
          className={`flex ${loading ? 'pointer-events-none' : ''}`}
          onClick={handleBack}
        >
          <div className='flex space-x-1 py-1 cursor-pointer'>
            <span className='2xl:text-[15px] xl:text-[12px] text-gray-500 font-bold'>
              All teammates
            </span>
            <span>
              <ChevronRightIcon className='2xl:h-5 2xl:w-5 xl:w-4 xl:h-4 text-gray-500' />
            </span>
          </div>
        </div>
        {/* Buttons */}
        <div className='flex flex-row justify-between'>
          <span className='font-bold 2xl:text-lg xl:text-md'>
            {headerTitle}
          </span>
          <div className='space-x-4 flex'>
            <Button
              disabled={cancelBtnDisabled || loading}
              onClick={() => navigate(-1)}
              text='Cancel'
              variant='outline'
            />

            <Button
              onClick={handleClick}
              disabled={proceedBtnDisabled || loading}
              text={btnTitle}
              className={`${
                proceedBtnDisabled || loading ? 'bg-opacity-[40%]' : ''
              }`}
            />
          </div>
        </div>
      </div>
      <div></div>
      <div className={className}>{children}</div>
    </motion.div>
  );
};
export default SubRouteContainer;
