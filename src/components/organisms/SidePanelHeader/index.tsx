import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { SidePanelHeaderProps } from './types';
import { useSidePanelHeader } from './hooks';
import { capitalizeFirstLetter } from '@/utils/index';
import { ConStore } from '@/state/ConversationStore';
import { CONVERSATION_SORT } from '@/constants/index';

const SidePanelHeader: FC<SidePanelHeaderProps> = ({ title }) => {
  const { renderIcon, handleSortChange } = useSidePanelHeader();
  return (
    <motion.div className='w-full  flex flex-row justify-between items-center py-3'>
      <div className=' w-full flex flex-row space-x-2'>
        <div className='w-full flex items-center justify-between mb-2'>
          <div className='flex items-center space-x-2'>
            <div className='border border-[#E6E6E6] h-8 w-8 rounded-md flex items-center justify-center'>
              {renderIcon(title)}
            </div>
            <p className='text-[16px] font-semibold'>
              {capitalizeFirstLetter(title)}
            </p>
          </div>
          <div>
            <svg
              onClick={handleSortChange}
              width='16'
              height='13'
              viewBox='0 0 16 13'
              className={`${
                ConStore.sorted_by === CONVERSATION_SORT.OLDEST
                  ? 'rotate-180'
                  : ''
              } cursor-pointer`}
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.53125 2.375H9.84375C10.1992 2.375 10.4727 2.10156 10.4727 1.71875C10.4727 1.36328 10.1992 1.0625 9.84375 1.0625H8.53125C8.14844 1.0625 7.875 1.36328 7.875 1.71875C7.875 2.10156 8.14844 2.375 8.53125 2.375ZM8.53125 5.875H11.5664C11.9219 5.875 12.2227 5.60156 12.2227 5.21875C12.2227 4.86328 11.9219 4.5625 11.5664 4.5625H8.53125C8.14844 4.5625 7.875 4.86328 7.875 5.21875C7.875 5.60156 8.14844 5.875 8.53125 5.875ZM15.0664 11.5625H8.53125C8.14844 11.5625 7.875 11.8633 7.875 12.2188C7.875 12.6016 8.14844 12.875 8.53125 12.875H15.0664C15.4219 12.875 15.7227 12.6016 15.7227 12.2188C15.7227 11.8633 15.4492 11.5625 15.0664 11.5625ZM8.53125 9.375H13.3164C13.6719 9.375 13.9727 9.10156 13.9727 8.71875C13.9727 8.36328 13.6719 8.0625 13.3164 8.0625H8.53125C8.14844 8.0625 7.875 8.36328 7.875 8.71875C7.875 9.10156 8.14844 9.375 8.53125 9.375ZM5.63281 8.9375L4.15625 10.5508V1.30859C4.15625 0.925781 3.85547 0.625 3.5 0.625C3.11719 0.625 2.84375 0.925781 2.84375 1.30859V10.5508L1.33984 8.9375C1.20312 8.80078 1.03906 8.74609 0.875 8.74609C0.710938 8.74609 0.546875 8.80078 0.410156 8.91016C0.136719 9.15625 0.136719 9.56641 0.382812 9.83984L2.98047 12.6836C3.22656 12.957 3.69141 12.957 3.9375 12.6836L6.53516 9.83984C6.78125 9.56641 6.78125 9.15625 6.50781 8.91016C6.28906 8.66406 5.87891 8.69141 5.63281 8.9375Z'
                fill='#222124'
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default observer(SidePanelHeader);
