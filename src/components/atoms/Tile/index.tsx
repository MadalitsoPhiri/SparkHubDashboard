import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Text from '@/components/atoms/Text';
import { FC } from 'react';

interface TileProps {
  name: string;
  content: string;
  statistics?: boolean;
  statisticValue?: number;
  borderRight?: boolean;
  borderLeft?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
}

const Tile: FC<TileProps> = ({
  name,
  content,
  statistics = false,
  statisticValue = 0,
  borderRight = false,
  borderLeft = false,
  borderTop = false,
  borderBottom = false,
}) => {
  return (
    <div
      className={`${borderRight && 'border-r border-0'} ${
        borderLeft && 'border-l border-0'
      } ${borderTop && 'border-t border-0'} ${
        borderBottom && 'border-b border-0'
      }  border-border p-4 bg-white min-w-[284px] h-[104px] px-[24px] py-[16px] flex flex-col`}
    >
      <div className='mb-4 font-semibold'>
        <Text
          color='text-gray-400'
          size='xs'
          className='text-[14px] font-medium leading-5'
        >
          {name}
        </Text>
      </div>
      <div className='flex items-center space-x-6'>
        <div className='font-bold'>
          <Text
            size='xl'
            color='text-gray-900'
            className=' font-medium leading-9'
          >
            {content.toLocaleString()}
          </Text>
        </div>
        {statistics && (
          <div
            className={`${
              statisticValue >= 0 ? 'bg-success/10' : 'bg-warning/5'
            } px-[6px]  rounded-[4px] flex items-center space-x-2`}
          >
            <Text
              color={`${statisticValue >= 0 ? 'text-success' : 'text-warning'}`}
              size='xs'
            >
              {statisticValue >= 0 ? '+' : '-'}
              {Math.abs(statisticValue)}%
            </Text>
            <div className='flex flex-col items-center'>
              {' '}
              {/* Wrap icons in this div */}
              {statisticValue >= 0 ? (
                <div className='pt-[8px]'>
                  <Icon icon={Icons.graphUp} color='#0E8157' />
                </div>
              ) : (
                <div className='pt-[8px]'>
                  <Icon icon={Icons.graphDown} color='#F44336' />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Tile;
