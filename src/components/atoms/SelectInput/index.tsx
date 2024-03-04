import { forwardRef } from 'react';
import Spinner from '../Spinner';

export type SelectInputOption = {
  label: string;
  value: string;
};

export interface SelectInputProps
  extends React.HTMLAttributes<HTMLSelectElement> {
  error?: string;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  name?: string;
  label?: string;
  options: SelectInputOption[];
  loading?: boolean;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({
    className,
    error,
    disabled,
    value,
    name,
    onChange,
    label,
    options,
    placeholder,
    loading,
  }) => {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className='flex flex-row justify-between'>
          <p className='block text-md font-medium text-gray-400 mb-1'>
            {label}
          </p>
        </div>
        <div
          className={`relative flex flex-row items-center rounded-md border`}
        >
          <select
            id='select_input_time_zone'
            name={name}
            disabled={disabled}
            value={value}
            onChange={onChange}
            className={`relative flex items-center border rounded-[4px!important] space-x-2 text-md px-2  py-2 w-full outline-none
      ${error ? 'border-warning' : 'border-gray-50'} 
      `}
          >
            <option value=''>{placeholder}</option>

            {options.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
          {loading && (
            <div className='mr-3 absolute right-2'>
              <Spinner size={13} color={'rgb(107 114 128 / 1)'} />
            </div>
          )}
        </div>
        {error && <p className='my-1 text-red-500 text-xs'>{error}</p>}
      </div>
    );
  },
);
