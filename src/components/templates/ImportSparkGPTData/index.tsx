import Button from '@/components/atoms/Button';
import { UploadIcon } from '@/components/atoms/Icons/UploadIcon';
import Spinner from '@/components/atoms/Spinner';
import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { AuthStore } from '@/state/AuthenticationStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const Tabs = [
  { title: 'Website' },
  { title: 'Knowledge Base' },
  { title: 'Google Docs' },
  { title: 'Pdf' },
];
const ImportSparkGPTData = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [websiteUrl, setWebSiteUrl] = useState('');
  const [context, setContext] = useState<any>(null);
  const [importing_website, set_importing_website] = useState(false);

  const [googleDocsUrl, setGoogleDocsUrl] = useState('');
  const [importing_doc, set_importing_doc] = useState(false);

  const [loading, set_loading] = useState(true);
  const handleSelect = (index: number) => {
    setSelectedTabIndex(index);
  };

  const handle_update = () => {
    set_importing_website(true);
    AuthStore.socket?.emit(
      'import_website_data',
      {
        event_name: 'import_website_data',
        payload: { url: websiteUrl.trim() },
      },
      (response: any) => {
        set_importing_website(false);
        setContext(response.context);
      },
    );
  };
  useEffect(() => {
    set_loading(true);
    AuthStore.socket?.emit(
      'get_context',
      {
        event_name: 'get_context',
      },
      (response: any) => {
        set_loading(false);

        if (response.context.website_url)
          setWebSiteUrl(response.context.website_url);
        setGoogleDocsUrl(response.context.google_docs_url);
        setContext(response.context);
      },
    );
  }, []);
  if (loading) {
    return (
      <div className='flex items-center justify-center mb-4'>
        <Spinner size={25} color='#033EB5' />
      </div>
    );
  }
  return (
    <div className='w-full'>
      <div className='w-full flex flex-row'>
        {Tabs.map((item, index) => {
          return (
            <div
              className={`${
                selectedTabIndex === index ? 'bg-gray-150' : ''
              } p-2 flex flex-row  items-center justify-center flex-1`}
              key={index}
              onClick={() => handleSelect(index)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z'
                />
              </svg>

              <p className='text-[14px] leading-[20px] text-black font-semibold'>
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
      {selectedTabIndex === 0 && (
        <div className='w-full border border-1 border-gray-300 rounded-md p-4 flex flex-col mt-4'>
          <p className='text-gray-500 font-medium mb-2'>Website URL</p>
          <div className='rounded-[4px] border-gray-300 bg-white border-[1px] border-b-[2px] flex  items-center justify-center h-[40px] font-medium p-3'>
            <input
              key={'importing_website'}
              type='text'
              disabled={importing_website}
              onChange={e => setWebSiteUrl(e.target.value)}
              value={websiteUrl}
              className='w-full h-full outline-none  border-0  bg-transparent font-[500] text-[14px]'
            />
          </div>
          <div className='flex mt-[28px] w-full justify-end space-x-4'>
            <Button
              type='button'
              disabled={
                importing_website || context?.website_url === websiteUrl
              }
              onClick={handle_update}
              loading={importing_website}
              text={
                importing_website
                  ? context?.website_url
                    ? 'Updating website'
                    : 'Importing website'
                  : context?.website_url
                  ? 'Update'
                  : 'Import'
              }
              loadingText='Importing'
              size='sm'
              className='bg-[#1068EF]'
            />
          </div>
        </div>
      )}

      {selectedTabIndex === 1 && (
        <div className='w-full border border-1 border-gray-300 rounded-md p-4 flex flex-col mt-4'>
          <p className='text-gray-500 font-medium mb-2'>Knowledge Base URL</p>
          <div className='rounded-[4px] border-gray-300 bg-white border-[1px] border-b-[2px] flex  items-center justify-center h-[40px] font-medium p-3'>
            <input
              key={''}
              type='text'
              onChange={() => null}
              value={''}
              className='w-full h-full outline-none border-0 bg-transparent font-[500] text-[14px]'
            />
          </div>
          <div className='flex mt-[28px] w-full justify-end space-x-4'>
            <Button
              type='button'
              text='Cancel'
              size='sm'
              disabled={false}
              onClick={() => null}
              variant='outline'
            />
            <Button
              type='button'
              disabled={false}
              onClick={() => null}
              loading={false}
              text={'Import Knowledge Base'}
              loadingText='Saving'
              size='sm'
              className='bg-[#1068EF]'
            />
          </div>
        </div>
      )}

      {selectedTabIndex === 2 && (
        <div className='w-full border border-1 border-gray-300 rounded-md p-4 flex flex-col mt-4'>
          <p className='text-gray-500 font-medium mb-2'>Google Docs URL</p>
          <div className='rounded-[4px] border-gray-300 bg-white border-[1px] border-b-[2px] flex  items-center justify-center h-[40px] font-medium p-3'>
            <input
              key={'google_docs'}
              type='text'
              disabled={importing_doc}
              onChange={e => setGoogleDocsUrl(e.target.value)}
              value={googleDocsUrl}
              className='w-full h-full outline-none border-0 bg-transparent font-[500] text-[14px]'
            />
          </div>
          <div className='flex mt-[28px] w-full justify-end space-x-4'>
            <Button
              type='button'
              disabled={importing_doc}
              onClick={() => {
                set_importing_doc(true);
                AuthStore?.socket?.emit(
                  SOCKET_EVENT_NAMES.IMPORT_GOOGLE_DOC,
                  {
                    event_name: SOCKET_EVENT_NAMES.IMPORT_GOOGLE_DOC,
                    payload: { url: googleDocsUrl.trim() },
                  },
                  () => {
                    set_importing_doc(false);
                  },
                );
              }}
              loading={false}
              text={'Import Google Docs'}
              loadingText='Saving'
              size='sm'
              className='bg-[#1068EF]'
            />
          </div>
        </div>
      )}

      {selectedTabIndex === 3 && (
        <div className='w-full border border-1 border-gray-300 rounded-md p-4 flex flex-col mt-4'>
          <p className='text-gray-500 font-medium '>Upload Pdf</p>
          <div className='relative rounded-[4px] pt-10 pb-8  w-full flex flex-col justify-center items-center  border-[2px] border-[#E6E8EB] border-dashed bg-white my-2'>
            <label
              htmlFor='logo'
              className='relative  flex flex-col justify-center items-center  cursor-pointer'
            >
              <UploadIcon />
              <p className='text-[14px] font-[500] text-[#161518] mt-[8px] mb-[6px]'>
                <span className='text-[14px] font-[500] text-[#1068EF]'>
                  Upload a Pdf{' '}
                </span>{' '}
                or drag and drop
              </p>

              <input
                type='file'
                id='logo'
                disabled={false}
                onChange={() => null}
                className='absolute left-0 right-0 w-[20px] invisible'
              />
            </label>
          </div>
          <div className='flex mt-2 w-full justify-end space-x-4'>
            <Button
              type='button'
              text='Cancel'
              size='sm'
              disabled={false}
              onClick={() => null}
              variant='outline'
            />
            <Button
              type='button'
              disabled={false}
              onClick={() => null}
              loading={false}
              text={'Import Pdf'}
              loadingText='Saving'
              size='sm'
              className='bg-[#1068EF]'
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default observer(ImportSparkGPTData);
