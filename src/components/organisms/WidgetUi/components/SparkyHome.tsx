import { useEffect } from 'react';
import InfoCard from './InfoCard';
import { motion } from 'framer-motion';
import AskSparky from './AskSparky';
import SparkConversation from './SparkConversation';
import FAQs from './FAQs';
import Advertisement from './Advertisements';
import SurveyPreview from './Survey';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const SparkyHome = () => {
  const conversationCount = 0;
  const navigate = useNavigate();
  const handleSendMesage = () => {
    navigate(1);
  };

  useEffect(() => {
    //
  }, []);

  return (
    WidgetConfigStore.config.value && (
      <motion.div
        className='relative flex flex-1 w-full h-full bg-white overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -200 }}
      >
        <div className='bg-headerBgColor absolute h-[300px] w-full'></div>
        <div className='bg-transparent w-full h-full z-10 overflow-y-auto py-[16px] small-scrollbar '>
          <div className='bg-transparent w-full  mb-[16px] p-[20px]'>
            {WidgetConfigStore.config.value.images.brand_logo_url &&
            WidgetConfigStore.config.value.images.brand_logo_url !== '' ? (
              <div className='flex justify-center items-center w-[100px] h-[100px] mb-[16px]'>
                <img
                  src={WidgetConfigStore.config.value.images.brand_logo_url}
                  alt='logo goes here'
                  className='flex-none'
                />
              </div>
            ) : (
              <svg
                className='w-[32px] h-[32px] mb-[16px] text-[#FDD518]'
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
            )}

            <p className='text-headerTextColor font-normal text-[20px] mb-[16px]'>
              {WidgetConfigStore.config.value.greetings.header.main}
            </p>
            <p className='text-headerTextColor font-extralight text-[13px]'>
              {WidgetConfigStore.config.value.greetings.header.description}
            </p>
          </div>

          {conversationCount > 0 && (
            <InfoCard>
              <div className='w-full'>
                <p className='text-base mt-[24px] mb-[12px] mx-[24px]'>
                  Continue the conversation
                </p>
              </div>
            </InfoCard>
          )}
          {/* <!-- Spark a conversation component --> */}
          {conversationCount < 3 ? (
            <div className='px-[16px]'>
              <SparkConversation handleSendMesage={handleSendMesage} />
            </div>
          ) : null}

          {/* <!-- ask sparky component --> */}
          <div className='px-[16px] sr-only'>
            <AskSparky />
          </div>

          {/* Survey component */}
          <div className='px-[16px]'>
            <SurveyPreview />
          </div>
          {/* Advertisement Preview component */}
          <Advertisement />

          {/* FAQs Preview component */}
          <div className='px-[16px]'>
            <FAQs />
          </div>
        </div>
      </motion.div>
    )
  );
};
export default observer(SparkyHome);
