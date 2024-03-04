import Avatar from '@/components/atoms/Avatar';
import React from 'react';

interface MTabProps {
  name: string;
  time: string;
  src: string | undefined;
  message: string;
  online: boolean;
}

const MTab: React.FC<MTabProps> = ({ name, time, message, online, src }) => {
  return (
    <div className=' px-3 py-1.5 rounded-md justify-start items-center gap-x-3 gap-y-6 inline-flex'>
      <div className='flex-none'>
        <Avatar src={src as string} alt={name} size='lg' />
      </div>
      <div className='grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex'>
        <div className='self-stretch justify-between items-center gap-1 inline-flex'>
          <div className='justify-start items-center gap-2 flex'>
            <div className='text-neutral-800 text-md font-medium leading-tight'>
              {name}
            </div>
            {online && (
              <div className='w-2 h-2 bg-green-600 rounded-full'></div>
            )}
          </div>
          <div className='text-right text-blue-950 text-xs font-medium leading-none'>
            {time}
          </div>
        </div>
        <div className='self-stretch text-zinc-600 text-md font-normal  tracking-tight'>
          {message}
        </div>
      </div>
    </div>
  );
};

export default MTab;
