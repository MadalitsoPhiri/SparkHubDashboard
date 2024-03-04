import { AddCodeSnippetIcon } from '@/components/atoms/Icons/AddCodeSnippetIcon';
import { FAQsIcon } from '@/components/atoms/Icons/FAQsIcon';
import Accordion from '@/components/molecules/Accordion';
import ImportSparkGPTData from '@/components/templates/ImportSparkGPTData';
import SparkGPT from '@/components/templates/SparkGPT';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const SparkGPTPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const sparkGPT = [
    {
      Title: 'Configure GPT for your SparkChat',
      Phrase: `Upgrade your chat to the cutting-edge with SparkGPT's advanced language capabilities and personalized responses.`,
      selected: false,
      Content: SparkGPT,
      Icon: FAQsIcon,
    },
    {
      Title: 'Import Data to SparkGPT',
      Phrase: `Turn your website , help center or documents into a knowledge hub of summaries, visions etc.`,
      selected: false,
      Content: ImportSparkGPTData,
      Icon: AddCodeSnippetIcon,
    },
  ];
  return (
    <div className='rounded-2xl border border-[#E6E8EB] bg-white w-full h-auto overflow-auto p-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded'>
      {sparkGPT.map((item, index: number) => {
        const isLastItem = sparkGPT.length - 1 === index;
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
export default observer(SparkGPTPage);
