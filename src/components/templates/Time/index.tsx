import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const Time: FC<any> = ({ startChangeCallback, endChangeCallback, label }) => {
  return (
    <motion.div className='flex flex-row items-center mb-6'>
      <p>{label}</p>

      <motion.div className='flex flex-col items-center ml-4'>
        <p>Start</p>
        <input
          onChange={startChangeCallback}
          className='rounded-lg bg-gray-100 p-2 text-gray-300 text-base outline-borderColor'
          type='time'
          min='00:00'
          max='00:59'
          required
        />
      </motion.div>

      <motion.div className='flex flex-col items-center  ml-4'>
        <p>End</p>
        <input
          onChange={endChangeCallback}
          className='rounded-lg bg-gray-100 p-2 text-gray-300 text-base  outline-borderColor'
          type='time'
          min='00:00'
          max='00:59'
          required
        />
      </motion.div>
    </motion.div>
  );
};
export default observer(Time);
