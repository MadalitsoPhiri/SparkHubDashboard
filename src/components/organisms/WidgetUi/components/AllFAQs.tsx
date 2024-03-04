import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import Spinner from '@/components/atoms/Spinner';
import { observer } from 'mobx-react-lite';

const AllFAQs = () => {
  const navigate = useNavigate();
  const { get_faqs } = useWidgetConfig();
  const handleBack = () => {
    navigate(-1);
  };

  const Accordion = ({
    question,
    answer,
  }: {
    question: string;
    answer: string;
  }) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div>
        <div className='bg-white border-x-0 border-b-0 border-t w-full'>
          <div
            className={`flex flex-row py-3 px-4 items-center space-x-4 cursor-pointer text-gray-500`}
            onClick={() => setIsActive(!isActive)}
          >
            <div
              className={
                isActive
                  ? 'text-red-500 font-bold text-[20px]'
                  : 'text-gray-500 font-bold text-[20px]'
              }
            >
              {isActive ? '−' : '+'}
            </div>
            <div className='text-[15px] font-[600] text-btnColor '>
              {question}
            </div>
          </div>
          {isActive && (
            <div
              className='py-3 px-4 space-x-4 text-gray-500 '
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (WidgetConfigStore.faq.faqs.length === 0) get_faqs();
  }, []);

  return (
    <div className='relative flex flex-col flex-1 w-full h-full bg-white overflow-y-hidden'>
      <div className='flex-1 flex flex-col overflow-y-hidden'>
        {/* toolbar */}
        <div
          className={`z-10 bg-headerBgColor py-[12px] px-[8px] flex flex-row flex-shrink-0 items-center`}
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
          <div className=' text-[20px] text-center ml-[100px]'>
            <p className='text-btnTextColor font-semibold'>{`FAQ's`}</p>
          </div>
        </div>
        <div className='overflow-y-auto p-[16px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded h-full'>
          {WidgetConfigStore.faq.faqs.length > 0 ? (
            <motion.div
              className='border-borderColor border-t-2 rounded-[6px] shadow-lg bg-white w-full  mb-4'
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 0.4 }}
            >
              <div className='border border-t-none rounded-[6px] h-full'>
                {WidgetConfigStore.faq.faqs.map(
                  ({ question, answer }, index) => (
                    <Accordion
                      question={question}
                      answer={answer}
                      key={index}
                    />
                  ),
                )}
              </div>
            </motion.div>
          ) : WidgetConfigStore.faq.fetching_faqs ? (
            <div className=' flex justify-center w-full h-full'>
              <Spinner
                size={50}
                color={WidgetConfigStore.config?.value?.colors?.header_bg_color}
              />
            </div>
          ) : (
            <div className=' text-gray-500 flex flex-col justify-center items-center w-full h-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-10 w-10'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <h1 className='text-gray-500 break-words text-semibold'>
                Oops! it appears you are at the wrong place.
              </h1>
              <h1 className='text-gray-500'>No FAQs found!</h1>
              <button
                onClick={handleBack}
                className='py-2 px-4 bg-btnColor text-btnTextColor rounded-lg mt-4'
              >
                go back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default observer(AllFAQs);
