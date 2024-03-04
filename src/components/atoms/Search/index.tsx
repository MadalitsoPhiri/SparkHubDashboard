import { FC, InputHTMLAttributes } from 'react';
import { IoIosSearch } from 'react-icons/io';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  transparent?: boolean;
  showCommand?: boolean;
}

const Search: FC<SearchBarProps> = ({
  placeholder,
  transparent,
  showCommand = true,
  ...props
}) => {
  return (
    <div
      className={`relative w-full rounded-[6px]  p-1 flex flex-1  overflow-hidden ${
        transparent
          ? 'bg-transparent border-[1px] border-border'
          : 'bg-gray-150'
      } `}
    >
      <input
        {...props}
        type='text'
        placeholder={placeholder}
        className={`h-full placeholder:text-black placeholder:text-opacity-70 py-1 font-normal text-md pl-7 w-full rounded-md focus:outline-none focus:border focus:border-none
        ${transparent ? 'bg-transparent' : 'bg-gray-150'}
        `}
      />
      <div className='absolute top-0 bottom-0 flex items-center pl-1 pointer-events-none'>
        <IoIosSearch size={16} color='#000000' className='w-5 h-5' />
      </div>
      {showCommand && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-2 space-x-2'>
          <div className=' h-[20px] w-[23px] bg-darkGray rounded-[4px]  px-1 flex items-center justify-center cursor-pointer'>
            ⌘
          </div>
          <div className=' h-[20px] w-[23px] bg-darkGray rounded-[4px]  px-2 flex items-center justify-center cursor-pointer'>
            K
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
