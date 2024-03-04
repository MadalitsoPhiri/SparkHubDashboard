import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';

const InfoCard: FC<any> = ({ children }) => {
  return (
    <motion.div
      className='rounded-[8px] shadow-lg bg-white w-full  mb-4'
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'tween', duration: 0.4 }}
    >
      <div className='border border-t-none rounded-[6px] h-full'>
        {children}
      </div>
    </motion.div>
  );
};
export default observer(InfoCard);
