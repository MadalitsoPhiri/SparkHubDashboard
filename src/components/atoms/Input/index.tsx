import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input: FC<InputProps> = ({
  label,
  error,
  placeholder,
  type,
  hint,
  className,
  containerClassName = 'w-full',
  ...props
}) => {
  return (
    <div className={`${containerClassName} `}>
      {label && (
        <label className='block text-gray-400 text-md mb-1 mt-6'>{label}</label>
      )}
      <div
        className={`${className}  flex items-center border rounded-[4px] space-x-2 text-md px-2 py-2 w-full focus:border relative
      ${error ? 'border-warning' : 'border-gray-50'} 
      `}
      >
        {props.leftIcon && props.leftIcon}
        <input
          {...props}
          type={type}
          className={`bg-gray-200 outline-none  focus:border-secondary flex-1 bg-transparent `}
          placeholder={placeholder}
        />
        {error && (
          <div className='absolute right-0 top-[10%] pointer-events-none'>
            <Icon icon={Icons.exclamation} size={25} color='#F44336' />
          </div>
        )}
      </div>
      {error && <small className='text-warning text-sm mt-1'>{error}</small>}
      {hint && <small className='text-gray-400 text-sm mt-1'>{hint}</small>}
    </div>
  );
};
export default Input;
