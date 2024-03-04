import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Button from '@/components/atoms/Button';
import Hours from '@/components/atoms/Hours';
import Text from '@/components/atoms/Text';
import Modal from '@/components/atoms/modal';
import { useState } from 'react';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';

export const HowToUse = () => {
  return (
    <div className='flex flex-col w-[100%]'>
      <Text size='sm' color='text-gray-600'>
        {`Now that you've customized your Widget, you're ready to start chatting with
         your customers so you can build better relationships with them. See how to get started by watching this video.`}
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
      <Button text='Watch Video' />
      <div className='w-[100%] px-[20px] py-[15px] bg-mainGray mt-[25px] rounded-[6px] flex justify-between'>
        <div className='flex items-center'>
          <span className='font-semibold mr-[10px]'>
            <Text size='sm'>Need help deciding how to set up your Widget?</Text>
          </span>
          <Text size='xs'>Share this step with a teammate</Text>
        </div>
        <div className='flex items-center cursor-pointer bg-[#FBFCFD] px-3 py-1.5  rounded-[4px] shadow-sm border border-border'>
          <span className='mr-[5px]'>
            <Icon icon={Icons.plus} size={16} />
          </span>
          <span className='font-[500]'>
            <Text size='sm'>Invite teammate</Text>
          </span>
        </div>
      </div>
    </div>
  );
};

export const AddWidgetToWebsite = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      WidgetConfigStore.config.value?.code_snippet as string,
    );
    setIsCopied(true);
  };
  return (
    <div className='flex flex-col w-[100%]'>
      <Text
        size='sm'
        color='text-gray-600'
      >{`Setting up the Widget for visitors lets you chat with people when they're on your website.`}</Text>

      <div className='bg-[#FBFCFD] flex flex-row border border-border mt-[10px] py-[5px] px-[8px] rounded-[4px] '>
        <input
          type='text'
          className='bg-[#FBFCFD] font-[400] text-[13px] leading-[20px] text-[#222] text-opacity-100 w-[100%]  '
          value={WidgetConfigStore.config.value.code_snippet}
          disabled
        />
        <Button
          text={isCopied ? 'Copied' : 'Copy'}
          size='sm'
          variant='outline'
          onClick={handleCopyClick}
        />
      </div>
      <div className='w-[100%] px-[20px] py-[15px] bg-mainGray mt-[25px] rounded-[6px] flex justify-between'>
        <div className='flex items-center'>
          <span className='font-semibold mr-[10px]'>
            <Text size='sm'>Need help?</Text>
          </span>
          <Text size='xs'>Ask a teammate to complete this step</Text>
        </div>
        <div className='flex items-center bg-[#FBFCFD] cursor-pointer px-3 py-1.5  rounded-[4px] shadow-sm border border-border'>
          <span className='mr-[5px]'>
            <Icon icon={Icons.plus} size={16} />
          </span>
          <span className='font-[500]'>
            <Text size='sm'>Invite teammate</Text>
          </span>
        </div>
      </div>
    </div>
  );
};

export const SecureWidget = () => {
  return (
    <div className='flex flex-col w-[100%]'>
      <Text
        size='sm'
        color='text-gray-600'
      >{`Identity verification helps ensure conversations
         between you and your users are kept private, and that one person can't 
         impersonate another. We strongly encourage all
         SparkHub customers to set up and enable identity verification.`}</Text>
      <div className='pt-2'>
        <Button text='Continue' />
      </div>
    </div>
  );
};

export const SetOfficeHours = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className='flex flex-col'>
      <div className='flex items-center font-semibold space-x-1 mb-6'>
        <Text size='sm'>Office Hours For</Text>
        <Text size='sm' color='text-gray-400'>
          SparkHub
        </Text>
      </div>
      <Text size='sm'>
        Set up office hours for your workspace to manage customer expectations
        and internal workflows.
      </Text>
      <div className='my-2 font-semibold'>
        <Text size='sm'>Default office hours</Text>
      </div>
      <Text size='sm'>
        Conversations default to these hours unless you use assignment rules to
        direct them to a team with custom office hours.
      </Text>
      <div
        onClick={openModal}
        className='my-4 p-2 border border-border hover:border-blue rounded-[6px] flex cursor-pointer space-x-4'
      >
        <div className='font-bold'>
          <Icon icon={Icons.clockOutline} color='blue' />
        </div>
        <div className='flex flex-col gap-y-1'>
          <span className='font-semibold'>
            <Text size='sm'>Weekdays 9am - 5pm</Text>
          </span>
          <Text size='sm' color='text-gray-400'>
            Canada
          </Text>
        </div>
      </div>
      <Modal
        show={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title='Edit default office hours'
        className='z-[10000] inline-block py-6 my-8 w-[500px] overflow-hidden text-left align-top transition-all transform bg-white shadow-xl rounded-[6px]'
      >
        <div className='px-4'>
          <Text
            size='sm'
            color='text-gray-400'
          >{`Hours are set in your workspace’s timezone,
                   Canada. If you don’t specify hours here, we will
                   default to an always-on (24/7) schedule.`}</Text>
          <Hours />
        </div>
        <div className='border border-border border-b-0'></div>
        <div className='pt-4 px-4 flex flex-row-reverse'>
          <div>
            <Button text='Save' />
          </div>
          <div className='mr-4'>
            <Button
              text='Cancel'
              onClick={closeModal}
              className='bg-white border border-border text-[#000000]'
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const InviteTeammate = () => {
  return (
    <div className='w-full flex flex-col  justify-between'>
      <div className='flex flex-col '>
        <Text
          size='sm'
          color='text-gray-600'
        >{`Now that you’re talking with customers, it’s time to bring in the rest of your team to help.`}</Text>
        <Text
          size='sm'
          color='text-gray-600'
        >{`Start by inviting your teammates — you can always add more later too.`}</Text>
        <div className='my-6'>
          <Button text='Continue' />
        </div>
      </div>
      <div className="bg-[url('https://static.intercomassets.com/ember/assets/images/onboarding/home/steps/invite-teammates@1x-dc79367d33ddcb99538578a007bce6d9.jpg')]   h-[250px] w-[400px]  bg-no-repeat"></div>
    </div>
  );
};
