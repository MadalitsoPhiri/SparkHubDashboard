import { FC, InputHTMLAttributes } from 'react';

interface ConfigInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

const ConfigInput: FC<ConfigInputProps> = ({
  label,
  placeholder,
  type,

  ...props
}) => {
  return (
    <div>
      {label && (
        <label className='block text-gray-400 text-md bold mb-2 font-medium'>
          {label}
        </label>
      )}

      <input
        {...props}
        type={type}
        className='placeholder:text-placeholder text-[14px] leading-[20px] h-[40px] border mb-2 rounded-[4px] border-gray-300 bg-white border-b-[2px] flex items-center justify-center font-medium px-[12px] outline-none w-full'
        placeholder={placeholder}
      />
    </div>
  );
};
export default ConfigInput;
