import { AddCodeSnippetIcon } from '@/components/atoms/Icons/AddCodeSnippetIcon';
import { RequireEmailIcon } from '@/components/atoms/Icons/RequireEmailIcon';
import { SecureDomainsIcon } from '@/components/atoms/Icons/SecureDomainsIcon';
import Accordion from '@/components/molecules/Accordion';
import Domain from '@/components/templates/Domain';
import RequireEmail from '@/components/templates/RequireEmail';
import Snippet from '@/components/templates/Snippet';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const Setup = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const general = [
    {
      Title: 'Add SparkChat to your website',
      Phrase: `Adding this code in your <head> area will load SparkChat Messenger on your website`,
      selected: false,
      Content: Snippet,
      Icon: AddCodeSnippetIcon,
    },
    {
      Title: 'Keep your Widget secure',
      Phrase: 'Set up trusted domains',
      selected: false,
      Content: Domain,
      Icon: SecureDomainsIcon,
    },
    {
      Title: 'Require an email for new conversations',
      Phrase: `So you can always get back to your website visitors`,
      selected: false,
      Content: RequireEmail,
      Icon: RequireEmailIcon,
    },
  ];
  return (
    <div className='rounded-2xl border border-[#E6E8EB] bg-white w-full h-auto overflow-auto p-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded'>
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
export default observer(Setup);
