import Button from '@/components/atoms/Button';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

type IntegrationListItemProps = {
  icon: string;
  title: string;
  phrase: string;
  isLast: boolean;
  isConnected: boolean;
  handleClick: () => void;
  loading: boolean;
};

const IntegrationListItem: FC<IntegrationListItemProps> = ({
  icon,
  title,
  phrase,
  isLast,
  isConnected,
  handleClick,
  loading,
}) => {
  return (
    <div
      className={`${isLast ? ' border-b-0 my-1' : 'border-b my-2'} bg-white`}
    >
      <div
        className={`flex flex-row items-center justify-between px-4 h-[60px]`}
      >
        <div className='flex flex-row items-center space-x-[10px]'>
          <div className='ml-[5px] w-[40px] h-[40px]'>
            <img src={icon} alt='logo' />
          </div>
          <div className='flex flex-col'>
            <h3
              className={`group-hover:text-primary-medium text-[14px] font-[600] leading-[20px] text-[#222] text-opacity-90`}
            >
              {title}
            </h3>
            <p className='text-[14px] leading-[20px] text-[#222] text-opacity-80'>
              {phrase}
            </p>
          </div>
        </div>
        <div className='flex gap-3'>
          <Button
            disabled={isConnected}
            text={!isConnected ? 'Connect' : 'Connected'}
            onClick={handleClick}
            loading={loading}
            className={`disabled:bg-success`}
          />
        </div>
      </div>
    </div>
  );
};
export default observer(IntegrationListItem);
