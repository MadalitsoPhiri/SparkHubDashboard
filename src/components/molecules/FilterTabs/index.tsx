import React from 'react';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import ToolTip from '@/components/atoms/Tooltip';

export interface FilterTabOption {
  id: number;
  title: string;
  icon?: React.ReactNode;
  type?: 'button' | 'tab';
  disabled?: boolean;
  mt?: number;
}

interface FilterProps {
  options: FilterTabOption[];
  activeTab: number;
  mt?: number;
  onChange: (id: number) => void;
  handleButtonClick?: () => void;
}

const FilterTabs: React.FC<FilterProps> = ({
  options,
  activeTab,
  mt,
  onChange,
  handleButtonClick,
}) => {
  return (
    <div className='w-full flex items-center gap-2 z-[99999 !important]'>
      {options.map(option =>
        option.type === 'button' ? (
          <Button
            text={option.title}
            key={option.id}
            fullHeight
            onClick={handleButtonClick}
          />
        ) : (
          <div
            key={option.id}
            onClick={() => !option.disabled && onChange(option.id)}
            style={{ marginTop: `${mt}px` }}
            className={`${
              option.disabled
                ? 'bg-white cursor-not-allowed'
                : activeTab === option.id
                ? 'bg-gray-25 hover:bg-opacity-50'
                : 'bg-white hover:bg-[#033496] hover:bg-opacity-5'
            } border border-border rounded cursor-pointer flex items-center justify-center py-1.5  px-5 flex-1`}
          >
            {option.icon && <span className='mr-2'>{option.icon}</span>}
            {option.disabled ? (
              <div style={{ zIndex: 99999 }}>
                <ToolTip title='Coming soon'>
                  <Text
                    color='text-lightBlack'
                    size='sm'
                    weight='medium'
                    className='overflow-hidden whitespace-no-wrap truncate'
                  >
                    {option.title}
                  </Text>
                </ToolTip>
              </div>
            ) : (
              <Text
                color='text-lightBlack'
                size='sm'
                weight='medium'
                className='overflow-hidden whitespace-no-wrap truncate'
              >
                {option.title}
              </Text>
            )}
          </div>
        ),
      )}
    </div>
  );
};

export default FilterTabs;
