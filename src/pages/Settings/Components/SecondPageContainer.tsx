import { BookOpenIcon } from '@heroicons/react/outline';

import Button from '@/components/atoms/Button';

const SecondPageContainer = ({
  children,
  title,
  groupName,
  className,
  linkTitle,
  link = false,
  btnTile,
  handleClick,
  customFieldScreen,
}: any) => {
  return (
    <div
      className='flex flex-col w-full h-full overflow-hidden
      rounded-[16px] shadow  bg-white'
    >
      <div className='px-11 pt-12 sticky-top  z-[99999]'>
        <div className='flex flex-row-reverse'>
          {link && !customFieldScreen && (
            <div className='flex space-x-2 py-1'>
              <span>
                <BookOpenIcon className='2xl:h-5 2xl:w-5 xl:w-4 xl:h-4 text-secondary' />
              </span>
              <span className='2xl:text-[15px] xl:text-[12px] text-secondary cursor-pointer hover:underline hover:decoration-solid'>
                {linkTitle}
              </span>
            </div>
          )}
        </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row items-center'>
            <h1 className='text-[24px] leading-[36px] font-[500]'>{title}</h1>
            {!customFieldScreen && (
              <>
                <span className='text-[24px] leading-[36px] font-[500] text-gray-400 mx-1'>
                  for
                </span>
                <h1 className='text-[24px] leading-[36px]  font-[500] text-gray-400'>
                  {groupName}
                </h1>
              </>
            )}
          </div>
          <div>
            <Button text={btnTile} onClick={handleClick} />
          </div>
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};
export default SecondPageContainer;
