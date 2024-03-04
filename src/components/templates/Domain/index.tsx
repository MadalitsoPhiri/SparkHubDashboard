/* eslint-disable no-unsafe-optional-chaining */
import Button from '@/components/atoms/Button';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const Domain = () => {
  const [name, setName] = useState('');
  const { publish } = useWidgetConfig();
  const handleKeyUp = (e: any) => {
    if (name.trim() !== '') {
      e.preventDefault();
      const domain = name.trim();
      if (domain) {
        WidgetConfigStore.updateAllowedOrigins([
          ...(WidgetConfigStore.config.value?.allowed_origins as string[]),
          domain,
        ]);
      }
      setName('');
    }
  };

  const handlePublish = (e: any) => {
    handleKeyUp(e);
    publish();
  };

  const removeDomain = (indexToRemove: any) => {
    WidgetConfigStore.updateAllowedOrigins([
      ...(WidgetConfigStore.config.value?.allowed_origins as string[])?.filter(
        (_: any, index: number) => index !== indexToRemove,
      ),
    ]);
  };

  const handleDomainTextChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    WidgetConfigStore.config.value && (
      <div className='flex flex-col mt-1'>
        <p className='font-medium text-md text-opacity-80 mb-2'>
          List your trusted domains
        </p>
        <p className='font-normal text-[#656971] text-md text-opacity-80 mb-2'>
          SparkChat will only show on these domains
        </p>

        <div className='flex items-center w-full min-h-[40px] px-3 py-2.5 bg-white rounded-[4px] focus-within:border focus-within:border-secondary border border-zinc-200 '>
          {WidgetConfigStore.config.value.allowed_origins?.map(
            (domain: any, index: number) => (
              <span
                key={index}
                className='w-auto h-[25px] flex items-center justify-between space-x-1 rounded-[4px]
             mt-0 mr-[8px] ml-0
            bg-[#f1f1f1] text-[#222] px-2'
              >
                <p className='text-[11px]'>{domain}</p>
                <svg
                  onClick={() => removeDomain(index)}
                  className={`w-4 h-4 text-[#222] cursor-pointer `}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            ),
          )}
          <textarea
            onChange={handleDomainTextChange}
            value={name}
            onKeyUp={e => (e.code === 'Space' ? handleKeyUp(e) : null)}
            onKeyDown={e => {
              if (e.code === 'Enter' && !e.shiftKey) {
                e.preventDefault();
              }
            }}
            className='w-full flex-1 h-[30px] pt-1 px-0 pb-0 placeholder:text-slate-400 text-black text-md font-medium outline-none resize-none'
            placeholder='Enter domains'
          />
        </div>
        <p className='font-normal text-[12px] text-gray-500 my-2'>
          List your trusted domains and subdomains. SparkChat will appear on all
          pages and domains
        </p>
        <div className='mt-4 mb-1 items-center flex justify-end space-x-4'>
          <Button type='button' text='Cancel' size='sm' variant='outline' />
          <Button
            onClick={handlePublish}
            loading={WidgetConfigStore.config.style?.loading}
            text={
              WidgetConfigStore.config.style?.loading
                ? 'Saving'
                : 'Save and set live'
            }
            loadingText='Saving'
            className='bg-[#1068EF]'
            size='sm'
          />
        </div>
      </div>
    )
  );
};
export default observer(Domain);
