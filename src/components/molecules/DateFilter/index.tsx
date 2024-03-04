import Text from '@/components/atoms/Text';
import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
const DateFilter = () => {
  return (
    <div className='flex bg-[#e6e8eb] rounded-[4px] px-[8px] py-[2px] space-x-1 items-center cursor-pointer'>
      <div className='pt-1'>
        <Icon icon={Icons.clockOutline} />
      </div>
      <Text color='black' size='xs'>
        Last 30 days
      </Text>
      <div className='pt-2 pl-2'>
        <Icon icon={Icons.arrowDown} color='black' />
      </div>
    </div>
  );
};
export default DateFilter;
