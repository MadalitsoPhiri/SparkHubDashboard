import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import Button from '@/components/atoms/Button';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import ConfigInput from '@/components/atoms/ConfigInput';

const ChatSuggestions: FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const { publish } = useWidgetConfig();

  const handlePublish = () => {
    publish();
  };

  const handleSuggestionChange1 = (e: any) => {
    WidgetConfigStore.updateChatSuggestion1(e.target.value);
  };
  const handleSuggestionChange2 = (e: any) => {
    WidgetConfigStore.updateChatSuggestion2(e.target.value);
  };

  const handleSuggestionChange3 = (e: any) => {
    WidgetConfigStore.updateChatSuggestion3(e.target.value);
  };

  return (
    WidgetConfigStore.config.value && (
      <div className=''>
        <div className={` flex flex-col`}>
          <p className='mb-[8px] text-[#656971] text-[14px] font-[500] leading-[20px]'>
            Chat Prompt 1
          </p>
          <div className='flex flex-col w-full mb-6'>
            <ConfigInput
              maxLength={120}
              type='text'
              value={
                WidgetConfigStore.config.value.chat_suggestions.suggestion1
              }
              onChange={handleSuggestionChange1}
              placeholder='Enter suggestion'
            />
          </div>
          <p className='mb-[8px] text-[#656971] text-[14px] font-[500] leading-[20px]'>
            Chat Prompt 2
          </p>
          <div className='flex flex-col w-full mb-6'>
            <ConfigInput
              maxLength={120}
              type='text'
              value={
                WidgetConfigStore.config.value.chat_suggestions.suggestion2
              }
              onChange={handleSuggestionChange2}
              placeholder='Enter suggestion'
            />
          </div>

          <p className='mb-[8px] text-[#656971] text-[14px] font-[500] leading-[20px]'>
            Chat Prompt 3
          </p>
          <div className='flex flex-col w-full mb-6'>
            <ConfigInput
              maxLength={120}
              type='text'
              value={
                WidgetConfigStore.config.value.chat_suggestions.suggestion3
              }
              onChange={handleSuggestionChange3}
              placeholder='Enter suggestion'
            />
          </div>
        </div>
        <div className='flex mt-[28px] w-full justify-end space-x-4'>
          <Button
            type='button'
            text='Cancel'
            onClick={handleCancel}
            variant='outline'
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
      </div>
    )
  );
};
export default observer(ChatSuggestions);
