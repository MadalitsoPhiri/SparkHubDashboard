import empty from '@/assets/images/placeholder.svg';
import { FC } from 'react';
type EmptyListProps = {
  listName?: string;
  title?: string;
  subTitle?: string;
  height?: string;
};
const EmptyList: FC<EmptyListProps> = ({
  listName,
  title,
  subTitle,
  height,
}) => {
  return (
    <div
      style={{ height: height }}
      className={`w-full flex flex-col justify-center items-center  border-t border-border`}
    >
      <p className='text-black text-center  text-[16px] leading-6'>
        {title} {listName}
      </p>
      <p className='text-center  text-[16px] leading-6 text-[#656971] mb-2'>
        {subTitle} {listName}
      </p>
      <img src={empty} alt='empty list' className='w-[450px]' />
    </div>
  );
};
export default EmptyList;
