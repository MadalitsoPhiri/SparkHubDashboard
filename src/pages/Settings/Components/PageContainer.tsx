import { observer } from 'mobx-react-lite';

const PageContainer = ({ children, title, groupName, className }: any) => {
  return (
    <div
      className='flex flex-col w-full h-full overflow-hidden
      rounded-[16px] shadow 
         bg-white'
    >
      <div className='flex flex-row items-center pt-12 sticky-top  z-[99999] px-11'>
        <h1 className='text-[24px] leading-[36px] font-[500]'>{title}</h1>
        <span className='text-[24px] leading-[36px] font-[500] text-gray-400 mx-1'>
          for
        </span>
        <h1 className='text-[24px] leading-[36px] font-[500] text-gray-400'>
          {groupName}
        </h1>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};
export default observer(PageContainer);
