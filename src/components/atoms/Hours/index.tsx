import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Text from '@/components/atoms/Text';
const Hours = () => {
  return (
    <div className='flex space-x-4 items-center my-[20px]'>
      {/* days */}
      <div className='font-semibold  space-x-2 bg-mainGray group flex justify-between cursor-pointer items-center px-2  mb-2 border border-transparent shadow-sm rounded-[6px]'>
        <Text size='sm'>Weekdays</Text>
        <span className='flex items-center mt-2'>
          <Icon icon={Icons.arrowDown} size={20} />
        </span>
      </div>
      {/* from */}
      <div className='font-semibold  space-x-2 bg-mainGray group flex justify-between cursor-pointer items-center px-2  mb-2 border border-transparent shadow-sm rounded-[6px]'>
        <Text size='sm'>9:00 am</Text>
        <span className='flex items-center mt-2'>
          <Icon icon={Icons.arrowDown} size={20} />
        </span>
      </div>
      {/* to */}
      <Text size='md'>to</Text>
      <div className='font-semibold  space-x-2 bg-mainGray group flex justify-between cursor-pointer items-center px-2  mb-2 border border-transparent shadow-sm rounded-[6px]'>
        <Text size='sm'>5:00 pm</Text>
        <span className='flex items-center mt-2'>
          <Icon icon={Icons.arrowDown} size={20} />
        </span>
      </div>
      {/* delete icon */}
      <div className='cursor-pointer'>
        <Icon icon={Icons.delete} size={20} />
      </div>
    </div>
  );
};
export default Hours;
