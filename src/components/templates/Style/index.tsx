import { FC } from 'react';

import Button from '@/components/atoms/Button';
import { UploadIcon } from '@/components/atoms/Icons/UploadIcon';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { observer } from 'mobx-react-lite';
import { useStyle } from './hooks';

const Style: FC<{ handleCancel: () => void }> = ({ handleCancel }) => {
  const {
    handleHeaderColorInputChange,
    handleBorderColorInputChange,
    handleButtonColorInputChange,
    handleHeaderTextColorInputChange,
    handlePublish,
    uploading,
    handleUpload,
  } = useStyle();

  return (
    <div className='w-full auto flex flex-col h-full '>
      <div className='relative rounded-[4px] h-[152px]  w-full flex flex-col justify-center items-center  border-[2px] border-[#E6E8EB] border-dashed bg-white my-[24px]'>
        <label
          htmlFor='logo'
          className='relative  flex flex-col justify-center items-center  cursor-pointer'
        >
          <UploadIcon />
          <p className='text-[14px] font-[500] text-[#161518] mt-[8px] mb-[6px]'>
            <span className='text-[14px] font-[500] text-[#1068EF]'>
              Upload a logo{' '}
            </span>{' '}
            or drag and drop
          </p>
          <p className='font-[400] text-[12px] text-[#656971]'>
            The resolution of the logo must be 50x100
          </p>
          <input
            type='file'
            id='logo'
            disabled={uploading}
            onChange={handleUpload}
            className='absolute left-0 right-0 w-[20px] invisible'
          />
        </label>
      </div>
      <div className='flex flex-row w-full mb-[24px]'>
        <div className='flex flex-col mt-[15px] mr-[24px] flex-1'>
          <span className='font-[500] text-[14px] leading-[18px] pb-[10px] text-[#656971] text-opacity-90'>
            Background color
          </span>
          <div className='rounded-[4px] border-gray-300 bg-white border-[1px] border-b-[2px] flex  items-center justify-center h-[40px] font-medium p-3'>
            <div className='rounded-full bg-headerBgColor w-[16px] h-[16px] shrink-0 border   mr-[8px]'>
              <input
                onChange={handleHeaderColorInputChange}
                type='color'
                id='head'
                name='head'
                value={WidgetConfigStore.config.value?.colors.header_bg_color}
                className='opacity-0 rounded-full w-full h-full bg-transparent'
              />
            </div>
            <input
              type='text'
              onChange={handleHeaderColorInputChange}
              value={WidgetConfigStore.config.value?.colors.header_bg_color}
              className='w-full h-full outline-none uppercase  border-0  bg-transparent font-[500] text-[14px]'
            />
          </div>
        </div>

        <div className='flex flex-col mt-[15px]  flex-1'>
          <span className='font-[500] text-[14px] leading-[18px] pb-[10px] text-[#656971] text-opacity-90'>
            Header text color
          </span>
          <div className='rounded-[4px] border-gray-300 bg-white border-[1px] border-b-[2px] flex  items-center justify-center h-[40px] font-medium p-3'>
            <div className='rounded-full  bg-headerTextColor w-[16px] h-[16px] shrink-0 border  border-gray-300 mr-[8px]'>
              <input
                onChange={handleHeaderTextColorInputChange}
                type='color'
                id='head'
                name='head'
                value={WidgetConfigStore.config.value?.colors.header_text_color}
                className='opacity-0 rounded-full w-full h-full bg-transparent'
              />
            </div>
            <input
              type='text'
              onChange={handleHeaderTextColorInputChange}
              value={WidgetConfigStore.config.value?.colors.header_text_color}
              className='w-full h-full outline-none uppercase  border-0  bg-transparent font-[500] text-[14px]'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full mb-6'>
        <div className='flex flex-col mt-[15px] mr-[24px] flex-1'>
          <span className='font-[500] text-[14px] leading-[18px] pb-[10px] text-[#656971] text-opacity-90'>
            Border color
          </span>
          <div className='rounded-[4px] border-gray-300 bg-white border-[1px] border-b-[2px] flex  items-center justify-center h-[40px] font-medium p-3'>
            <div className='rounded-full bg-borderColor w-[16px] h-[16px] shrink-0 border   mr-[8px]'>
              <input
                onChange={handleBorderColorInputChange}
                type='color'
                id='head'
                name='head'
                value={WidgetConfigStore.config.value?.colors.border_color}
                className='opacity-0 rounded-full w-full h-full bg-transparent'
              />
            </div>
            <input
              type='text'
              onChange={handleBorderColorInputChange}
              value={WidgetConfigStore.config.value?.colors.border_color}
              className='w-full h-full outline-none uppercase  border-0  bg-transparent font-[500] text-[14px]'
            />
          </div>
        </div>

        <div className='flex flex-col mt-[15px]  flex-1'>
          <span className='font-[500] text-[14px] leading-[18px] pb-[10px] text-[#656971] text-opacity-90'>
            Button color
          </span>
          <div className='rounded-[4px] border-gray-300 bg-white border-[1px] border-b-[2px] flex  items-center justify-center h-[40px] font-medium p-3'>
            <div className='rounded-full   bg-btnColor w-[16px] h-[16px] shrink-0 border  border-gray-300 mr-[8px]'>
              <input
                onChange={handleButtonColorInputChange}
                type='color'
                id='head'
                name='head'
                value={WidgetConfigStore.config.value?.colors.btn_color}
                className='opacity-0 rounded-full w-full h-full bg-transparent'
              />
            </div>
            <input
              type='text'
              onChange={handleButtonColorInputChange}
              value={WidgetConfigStore.config.value?.colors.btn_color}
              className='w-full h-full outline-none uppercase  border-0  bg-transparent font-[500] text-[14px]'
            />
          </div>
        </div>
      </div>
      <div className='flex mt-[28px] w-full justify-end space-x-4'>
        <Button
          type='button'
          text='Cancel'
          size='sm'
          disabled={uploading}
          onClick={handleCancel}
          variant='outline'
        />
        <Button
          type='button'
          disabled={uploading}
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
  );
};
export default observer(Style);
