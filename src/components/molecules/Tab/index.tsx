import React, { FC, ReactNode, useState } from 'react';

interface TabProps {
  height?: number;
  onTabChange: (index: number) => void;
  children?: ReactNode;
}

interface TabPanelProps {
  children?: ReactNode;
  title: string;
  disabled?: boolean;
}

const Tab: FC<TabProps> = ({ height, children, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber + 1);
    onTabChange(tabNumber);
  };

  return (
    <div>
      <div
        className={`w-full h-${height} bg-gray-100 p-[2px] rounded-[8px] flex-1`}
      >
        <div className='flex items-center'>
          {React.Children.map(children, (child: any, index) => {
            const isActive = index + 1 === activeTab;
            const tabPanel = child;

            return (
              <div
                onClick={() =>
                  !tabPanel.props.disabled && handleTabClick(index)
                }
                className={`flex-1 flex-nowrap ${
                  tabPanel.props.disabled
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <span
                  className={`${
                    isActive
                      ? 'bg-white shadow border border-black border-opacity-20'
                      : ''
                  } cursor-pointer flex items-center justify-center text-center p-2 rounded-[7px] w-[100%]`}
                >
                  <p className='text-[12px] font-medium leading-4'>
                    {tabPanel.props.title}
                  </p>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {React.Children.map(children, (child: any, index: number) => {
          const tabPanel = child;

          if (index + 1 === activeTab) {
            return tabPanel.props.children;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const TabPanel: FC<TabPanelProps> = ({ children }) => {
  return <div className='flex justify-center items-center'>{children}</div>;
};

export { Tab, TabPanel };
