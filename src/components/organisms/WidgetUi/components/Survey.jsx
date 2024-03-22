import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import InfoCard from './InfoCard';
import { useOffers } from '@/hooks/useOffers';
import { OffersStore } from '@/state/OffersStore';

const SurveyPreview = () => {
  const { get_surveys } = useOffers();
  useEffect(() => {
    get_surveys();
  }, []);

  return (
    <motion.div
      className=' flex flex-col py-1'
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'tween', duration: 0.4 }}
    >
      {OffersStore.survey?.survey.map(
        (item, index) =>
          item.is_active && (
            <InfoCard key={index}>
              <div className='flex flex-col p-4'>
                <span className='font-semibold mb-[12px]  text-[16px] leading-[24px]"'>
                  {item?.headline}
                </span>
                <span className='mb-4 text-[14px]'>{item?.description}</span>
                {item?.options?.map((option, index) => (
                  <button
                    className={`border-btnColor rounded-[6px] border-2 flex flex-row justify-center items-center px-[28px] py-[10px] my-1`}
                    key={index}
                  >
                    <p
                      className={` text-btnColor ml-[12px] font-semibold text-[16px] leading-[20px]`}
                    >
                      {option.title}
                    </p>
                  </button>
                ))}
              </div>
            </InfoCard>
          ),
      )}
    </motion.div>
  );
};
export default observer(SurveyPreview);
