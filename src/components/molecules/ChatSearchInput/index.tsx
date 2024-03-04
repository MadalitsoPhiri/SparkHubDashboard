/* eslint-disable @typescript-eslint/ban-ts-comment */
import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import { observer } from 'mobx-react-lite';
import { FC, InputHTMLAttributes, ReactNode } from 'react';

interface ChatSearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
}
const ChatSearchInput: FC<ChatSearchInputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  className,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label className='block text-gray-400 text-[14px]'>{label}</label>
      )}
      <div
        className={`'relative flex items-center border rounded-[6px] space-x-2 text-md h-[32px] px-2 w-full focus:border
      ${error ? 'border-warning' : 'border-[#DFE1E6]'} 
      `}
      >
        {leftIcon && leftIcon}
        <input
          {...props}
          className={
            className
              ? className
              : ` outline-none  focus:border-secondary text-[14px] w-full bg-transparent `
          }
        />
        {error && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <Icon icon={Icons.exclamation} size={16} color='#F44336' />
          </div>
        )}
      </div>
      {error && <small className='text-warning text-sm mt-1'>{error}</small>}
      {hint && <small className='text-gray-400 text-sm mt-1'>{hint}</small>}
    </div>
  );
};
export default observer(ChatSearchInput);
