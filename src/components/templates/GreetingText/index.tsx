import Button from '@/components/atoms/Button';
import ConfigInput from '@/components/atoms/ConfigInput';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const GreetingText: FC<{ handleCancel: () => void }> = ({ handleCancel }) => {
  const { publish } = useWidgetConfig();
  const handlePublish = () => {
    publish();
  };
  const handleHeaderMainTextChange = (e: any) => {
    WidgetConfigStore.updateHeaderTextMain(e.target.value);
  };
  const handleHeaderDescriptionTextChange = (e: any) => {
    WidgetConfigStore.updateHeaderTextDescription(e.target.value);
  };

  const handleChatAreaGreetingTextChange = (e: any) => {
    WidgetConfigStore.updateChatAreaGreetingText(e.target.value);
  };

  return (
    WidgetConfigStore.config.value && (
      <div className=''>
        <form className=''>
          <h4 className='mb-[8px] mt-[8px] font-[500] text-[14px] leading-[24px] text-[#222]'>
            Greeting
          </h4>
          <p className='mb-[8px] text-[#656971] text-[14px] font-[500] leading-[20px]'>
            Say hi to your customers when they open the Widget.
          </p>
          <div className='w-[100%] mb-[24px]'>
            <ConfigInput
              maxLength={40}
              type='text'
              value={WidgetConfigStore.config.value?.greetings?.header.main}
              onChange={handleHeaderMainTextChange}
            />
            <p className='text-[#898D94] text-[12px] leading-[16px] font-[400] tracking-tighter '>
              40 character max
            </p>
          </div>

          <h4 className='mb-[8px] mt-[8px] font-[500] text-[14px] leading-[24px] text-[#222]'>
            Team intro
          </h4>
          <p className='mb-[8px] text-[#656971] text-[14px] font-[500] leading-[20px] tracking-tighter '>
            Introduce your team and say how you can help your customer.
          </p>
          <div className='flex flex-col w-full mb-[24px]'>
            <ConfigInput
              maxLength={120}
              type='text'
              value={
                WidgetConfigStore.config.value?.greetings?.header.description
              }
              onChange={handleHeaderDescriptionTextChange}
              placeholder='Tell people how you can help'
              className=' border-gray-300 bg-white  border-b-[2px] '
            />

            <p className='text-[#898D94] text-[12px] leading-[16px] tracking-tighter  font-[400] pt-[2px]'>
              120 character max
            </p>
          </div>

          <h4 className='mb-[8px]  font-[500] text-[14px] leading-[24px] text-[#222]'>
            Chat area greeting.
          </h4>
          <p className='mb-[8px] text-[#656971] text-[14px] font-[500] leading-[20px] tracking-tighter '>
            Introduce your team and say how you can help your customer.
          </p>
          <div className='flex flex-col w-full'>
            <ConfigInput
              maxLength={120}
              type='text'
              value={
                WidgetConfigStore.config.value?.greetings
                  ?.chat_area_greeting_text
              }
              onChange={handleChatAreaGreetingTextChange}
              placeholder='Tell people how you can help'
            />
            <p className='tracking-tighter text-[#898D94] text-[12px] leading-[16px] font-[400] pt-[2px]'>
              120 character max
            </p>
          </div>

          <div className='flex mt-[28px] w-full justify-end space-x-4'>
            {' '}
            <Button
              variant='outline'
              type='button'
              text='Cancel'
              onClick={handleCancel}
              size='sm'
            />
            <Button
              type='button'
              onClick={handlePublish}
              loading={WidgetConfigStore.config.style?.loading}
              text={
                WidgetConfigStore.config.style?.loading
                  ? 'Saving'
                  : 'Save and set live'
              }
              loadingText='Saving'
              size='sm'
              className='bg-[#1068EF]'
            />
          </div>
        </form>
      </div>
    )
  );
};
export default observer(GreetingText);
