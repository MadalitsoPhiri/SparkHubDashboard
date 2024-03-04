import Text from '@/components/atoms/Text';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import routeNames from '@/routes/routeNames';
import { useNavigate } from 'react-router-dom';

export const SparkPreview = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-white border-t border-[#E6E6E6] py-2 rounded-tl-[8px] h-full pb-[50px]'>
      <div className='flex flex-col justify-center items-center'>
        {/* Main header */}
        <div className='w-full h-8 flex-col justify-center items-center gap-4 flex'>
          <div className='w-full justify-between items-center  inline-flex p-6 mt-6'>
            <div className='font-medium leading-normal'>
              <Text color='text-black' size='md'>
                SparkChat Preview
              </Text>
            </div>
            <div
              onClick={() => {
                navigate(
                  `${routeNames.dashboard.configurations}/styling?list=Styling`,
                );
              }}
              className='bg-[#FBFCFD] cursor-pointer px-3 py-1.5  rounded-[4px] shadow-sm border border-border justify-center items-center gap-2 flex'
            >
              <Text color='text-black' size='sm'>
                Configuration
              </Text>
            </div>
          </div>
        </div>

        {/* Main container */}
        <div className='border border-border rounded-2xl bg-white pb-[150px] mt-10'>
          <div className='w-full px-6 pt-6 h-[300px] bg-headerBgColor rounded-tl-2xl rounded-tr-2xl'>
            <div className=' flex-col justify-start items-start gap-8 flex'>
              <div className='font-semibold'>
                <Text size='md' color='text-white'>
                  SparkHub
                </Text>
              </div>
              <div className='flex-col justify-start items-start flex'>
                <div className='w-[414px] text-white text-2xl font-medium leading-9'>
                  {WidgetConfigStore.config.value.greetings.header.main}
                </div>
                <Text size='sm' color='text-headerTextColor'>
                  {WidgetConfigStore.config.value.greetings.header.description}
                </Text>

                <div className='w-full p-6  mt-16 bg-white rounded-lg shadow-inner border border-border'>
                  <div className=' h-7 flex-col justify-start items-start gap-2 flex'>
                    <Text
                      size='md'
                      className='text-black font-medium leading-7'
                    >
                      Spark another conversation
                    </Text>
                  </div>

                  <Text
                    size='md'
                    className='text-black font-medium leading-normal'
                  >
                    Our usual replay time
                  </Text>

                  <Text
                    size='sm'
                    className='text-zinc-500 font-medium leading-tight'
                  >
                    {WidgetConfigStore.config.value?.availability?.reply_time}
                  </Text>

                  <div className='px-4 py-2.5 mt-4 bg-white rounded-[99px] shadow border border-borderColor justify-center items-center gap-2 inline-flex'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='25'
                      height='25'
                      viewBox='0 0 256 256'
                      className='text-borderColor'
                    >
                      <path
                        fill='currentColor'
                        d='m222.88 115.69l-168-95.88a14 14 0 0 0-20 16.85l31 90.48v.07a2.11 2.11 0 0 1 0 1.42l-31 90.64A14 14 0 0 0 48 238a14.11 14.11 0 0 0 6.92-1.83l167.92-96.07a14 14 0 0 0 0-24.41Zm-5.95 14L49 225.73a1.87 1.87 0 0 1-2.27-.22a1.92 1.92 0 0 1-.56-2.28L76.7 134H136a6 6 0 0 0 0-12H76.78L46.14 32.7A2 2 0 0 1 49 30.25l168 95.89a1.93 1.93 0 0 1 1 1.74a2 2 0 0 1-1.07 1.78Z'
                      />
                    </svg>

                    <div className='font-medium leading-tight'>
                      <Text size='sm' color='text-borderColor'>
                        Send us a message
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
