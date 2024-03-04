/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react-lite';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { useStyle } from '../../Style/hooks';

export const Intro = observer(() => {
  return (
    <div className='flex flex-col w-[100%]'>
      <Text size='sm' color='text-gray-600'>
        {`Welcome to Sparky, your new Conversational Relationship Platform!
             We're excited to help you build better relationships with your customers.
             First, watch a quick video to get an overview of the steps you’ll take to
              set up Sparky for your business, and what you’ll learn along the way.`}
      </Text>

      <div className=' h-[300px] bg-mainGray flex flex-col justify-center items-center rounded-[8px] my-4'>
        <div className='flex justify-center items-center cursor-pointer'>
          <svg
            className='w-[30px] h-[30px] '
            viewBox='-1 0 8 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 11a.5.5 0 0 0 .8.4l6.667-5a.5.5 0 0 0 0-.8L.8.6A.5.5 0 0 0 0 1v10z'
              fill='#5F5F61'
            ></path>
          </svg>
        </div>
      </div>
      <Button text='Continue' />
    </div>
  );
});

export const WidgetCustomize = () => {
  const {
    handleHeaderColorInputChange,
    handleButtonColorInputChange,
    handlePublish,
  } = useStyle();

  const handleHeaderDescriptionTextChange = (e: any) => {
    WidgetConfigStore.updateHeaderTextDescription(e.target.value);
  };
  return (
    <div className='flex flex-col justify-center w-[100%] gap-y-6'>
      <Text size='sm' color='text-gray-600'>{`Your Widget is the key
         way you’ll communicate with your customers. It lets
          anyone start a conversation with you from your app or website.`}</Text>
      <Text size='sm' color='text-gray-600'>
        {`In this step, you’ll customize your
       Widget to fit your brand, and add a 
       friendly intro to make people feel welcome.`}
      </Text>
      <div className='flex flex-col gap-y-4'>
        <span className='font-semibold'>
          <Text size='sm' color='text-gray-600'>
            Choose a background color for your Widget
          </Text>
        </span>
        <div className='rounded-[6px] border-border hover:border-primary border-[1px] flex  items-center py-[5px] px-[11px] w-[130px] font-medium mr-20'>
          <input
            key={WidgetConfigStore.config.value?.colors.header_bg_color}
            value={WidgetConfigStore.config.value?.colors.header_bg_color}
            type='text'
            onChange={handleHeaderColorInputChange}
            className='w-full h-full outline-none uppercase  border-0  mr-2 bg-transparent'
          />
          <div className='rounded-full bg-headerBgColor w-[20px] h-[20px] shrink-0 border border-border'>
            <input
              key={WidgetConfigStore.config.value?.colors.header_bg_color}
              value={WidgetConfigStore.config.value?.colors.header_bg_color}
              onChange={handleHeaderColorInputChange}
              type='color'
              id='head'
              name='head'
              className='opacity-0 rounded-full w-full h-full bg-transparent'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-4'>
        <span className='font-semibold'>
          <Text size='sm' color='text-gray-600'>
            Choose a color for buttons and links
          </Text>
        </span>
        <div className='rounded-[6px] border-border hover:border-primary border-[1px] flex  items-center py-[5px] px-[11px] w-[130px] font-medium mr-20'>
          <input
            type='text'
            key={WidgetConfigStore.config.value?.colors.border_color}
            value={WidgetConfigStore.config.value?.colors.border_color}
            onChange={handleButtonColorInputChange}
            className='w-full h-full outline-none uppercase  border-0  mr-2 bg-transparent'
          />
          <div className='rounded-full bg-btnColor w-[20px] h-[20px] shrink-0 border border-border'>
            <input
              key={WidgetConfigStore.config.value?.colors.btn_color}
              value={WidgetConfigStore.config.value?.colors.btn_color}
              onChange={handleButtonColorInputChange}
              type='color'
              id='head'
              name='head'
              className='opacity-0 rounded-full w-full h-full bg-transparent'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-4'>
        <span className='font-semibold'>
          <Text size='sm' color='text-gray-600'>
            Write a few lines to introduce your team
          </Text>
        </span>
        <textarea
          value={WidgetConfigStore.config.value?.greetings?.header.description}
          onChange={handleHeaderDescriptionTextChange}
          className='outline-none focus:border-blue z-[2]  text-[12px]
           resize-vertical resize-none rounded-[6px] 
           border border-border leading-[20px] py-[6px] px-[12px]'
          rows={3}
          placeholder='Tell people how you can help'
          maxLength={1000}
        />
        <Text size='sm' color='text-gray-600'>
          120 character remaining
        </Text>
      </div>
      <div>
        <Button text='Continue' onClick={handlePublish} />
      </div>
    </div>
  );
};

export const ReplyInbox = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-8 flex-1'>
        <Text size='sm' color='text-gray-600'>
          {`You’ve seen how customers can start a conversation. Now let’s learn how your team can respond from your inbox.`}
        </Text>
        <Text size='sm' color='text-gray-600'>
          {`Your SparkHub inbox is like a communication hub for your business. You can read, manage, assign, and reply to customer conversations – all from one place!`}
        </Text>
        <div>
          <Button text='Continue' />
        </div>
      </div>
      <div
        className='bg-no-repeat h-[250px] flex-1'
        style={{
          backgroundImage:
            "url('https://static.intercomassets.com/ember/assets/images/onboarding/home/steps/reply-in-inbox@1x-c647fb879d76424bf71534a2192895b4.jpg')",
        }}
      ></div>
    </div>
  );
};
