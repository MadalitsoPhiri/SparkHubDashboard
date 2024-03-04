import { motion } from 'framer-motion';
import { FC, useState } from 'react';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { observer } from 'mobx-react-lite';
import { getInitialsFromName } from '@/utils/index';
import { AuthStore } from '@/state/AuthenticationStore';
import { USERTYPE } from '@/constants/index';
import { User } from 'types/user.types';

TimeAgo.addLocale(en);
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const loadingContainer = {
  width: '1.3rem',
  height: '1rem',
  display: 'flex',
  justifyContent: 'space-around',
};

const loadingCircle = {
  display: 'block',
  width: '0.25rem',
  height: '0.25rem',
  backgroundColor: 'black',
  borderRadius: '50%',
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '50%',
  },
  end: {
    y: '150%',
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
};

interface TypingStatusProps {
  data: User;
}
const TypingStatus: FC<TypingStatusProps> = ({ data }) => {
  const [img1Loaded, setImg1Loaded] = useState(false);

  return (
    <div
      className={`flex  ${'flex-row'} justify-start  group items-start cursor-pointer m-4`}
    >
      <div className='shrink-0 mr-2 mt-4'>
        <div
          className={`rounded-full bg-[#6652A9] flex flex-row justify-center items-center w-8 h-8   ${
            img1Loaded ? 'hidden' : 'block'
          }`}
        >
          <p className='text-xs font-medium text-white'>
            {!AuthStore.users_info.has(data._id)
              ? getInitialsFromName(data.user_name)
              : getInitialsFromName(
                  AuthStore.users_info.get(data._id).user_name,
                )}
          </p>
        </div>
        <div
          className={`flex flex-row items-center shrink-0 ${
            img1Loaded ? 'w-10 h-10 2xl:w-10 2xl:h-10' : ''
          }`}
        >
          <img
            className={`rounded-full noselect  ${
              img1Loaded ? 'block' : 'hidden'
            }`}
            onError={() => setImg1Loaded(false)}
            onLoad={() => setImg1Loaded(true)}
            src={data?.profile_picture_url}
          />
        </div>
      </div>
      <div
        className={`flex flex-col mt-4  ${
          data?.type === USERTYPE.CLIENT ? 'items-start' : 'items-end'
        }   mr-2`}
      >
        <p
          className={`py-2 px-3 bg-sideBarColor rounded-md text-[11px] 2xl:text-[13px] font-medium break-words`}
        >
          <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial='start'
            animate='end'
          >
            {[...Array(3)].map((_, index) => {
              return (
                <motion.span
                  key={index}
                  style={loadingCircle}
                  variants={loadingCircleVariants}
                  transition={loadingCircleTransition}
                />
              );
            })}
          </motion.div>
        </p>
      </div>
    </div>
  );
};
export default observer(TypingStatus);
