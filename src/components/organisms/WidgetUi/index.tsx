import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SparkyHome from './components/SparkyHome';
import SparkyChatArea from './components/SparkyChatArea';
import AllFAQs from './components/AllFAQs';
import { observer } from 'mobx-react-lite';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';

const AppWidget = () => {
  const [isOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(
    WidgetConfigStore.should_show_chat ? 1 : 0,
  );
  const [prevIndex, setPrevIndex] = useState(0);

  const navigate = (index: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };
  const goBack = () => {
    setCurrentIndex(prevIndex);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = {
    navigate,
    goBack,
  };

  const routes = [
    { path: 'home', element: <SparkyHome /> },
    { path: 'chat', element: <SparkyChatArea /> },
    { path: 'allfaqs', element: <AllFAQs /> },
  ];

  useEffect(() => {
    setCurrentIndex(WidgetConfigStore.should_show_chat ? 1 : 0);
  }, [WidgetConfigStore.should_show_chat]);

  return (
    <div className='h-full flex flex-col items-end  justify-end p-[20px]   max-h-[850px] min-h-[400px] overflow-y-hidden'>
      <AnimatePresence>
        {isOpen && (
          <div
            className={`relative rounded-[8px] w-full h-full flex  bg-white flex-1 sm:mb-[20px]  sm:w-[384px] overflow-y-hidden z-10 `}
          >
            <div className='p-[8px] rounded-[8px] fixed right-[24px] top-[20px] sm:hidden flex flex-col justify-center items-center cursor-pointer z-50'>
              <div className='rounded-[8px] absolute bg-black opacity-30 w-full h-full'></div>
              <svg
                className='w-[24px] h-[24px] text-white z-10'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <AnimatePresence>{routes[currentIndex].element}</AnimatePresence>
          </div>
        )}
      </AnimatePresence>
      <div className=' bg-headerBgColor absolute -bottom-0 right-0 m-[20px] sm:m-0 cursor-pointer rounded-full flex sm:static  w-[60px] h-[60px] flex-shrink-0  flex-col justify-center items-center '>
        <svg
          className='w-[32px] h-[32px] text-white'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          ></path>
        </svg>
      </div>
    </div>
  );
};
export default observer(AppWidget);
