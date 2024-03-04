import { MarketIcon } from '@/components/atoms/Icons/MarketIcon';
import { SurveyIcon } from '@/components/atoms/Icons/SurveyIcon';
import Accordion from '@/components/molecules/Accordion';
import AdUploads from '@/components/templates/AdUploads';
import Survey from '@/components/templates/Survey';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const Offers = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const general = [
    {
      Title: 'Add Survey',
      Phrase: `Get quick response from your visitors`,
      selected: false,
      Content: Survey,
      Icon: SurveyIcon,
    },
    {
      Title: 'Advertise',
      Phrase: 'Add products and services you want show your customers',
      selected: false,
      Content: AdUploads,
      Icon: MarketIcon,
    },
  ];
  return (
    <div className='rounded-2xl border border-[#E6E8EB] bg-white w-full h-auto overflow-auto px-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded'>
      {general.map((item, index: number) => {
        const isLastItem = general.length - 1 === index;
        return (
          <>
            <Accordion
              key={index}
              Content={<item.Content />}
              Icon={<item.Icon />}
              payload={{ ...item, index, selected: selectedIndex === index }}
              handleClick={() =>
                selectedIndex === index
                  ? setSelectedIndex(null)
                  : setSelectedIndex(index)
              }
            />
            {!isLastItem && (
              <div className='border border-[#ECEDF0] w-full h-[1px]'></div>
            )}
          </>
        );
      })}
    </div>
  );
};
export default observer(Offers);
