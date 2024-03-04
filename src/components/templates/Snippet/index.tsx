import Button from '@/components/atoms/Button';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { useState } from 'react';

export default function Snippet() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(
      WidgetConfigStore.config.value?.code_snippet as string,
    );
    setIsCopied(true);
  };

  return (
    WidgetConfigStore.config.value && (
      <div className='flex flex-col bg-white rounded-[8px] p-[16px] border border-border'>
        <span
          className={`${
            isCopied ? 'text-success' : 'text-[#222] text-opacity-80'
          } font-[400] text-[13px] leading-[20px]`}
        >
          {isCopied ? 'Copied!' : 'Copy this link'}
        </span>

        <div className='bg-[#FBFCFD] flex flex-row border border-border mt-[10px] py-[10px] px-[12px] rounded-[4px] mb-[40px]'>
          <input
            type='text'
            className='bg-[#FBFCFD] font-[400] text-[13px] leading-[20px] text-[#222] text-opacity-100 w-[100%] px-[20px] py-[3px] '
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
      </div>
    )
  );
}
