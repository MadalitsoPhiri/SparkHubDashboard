import { ChatSuggestionIcon } from '@/components/atoms/Icons/ChatSuggestionIcon';
import { FAQsIcon } from '@/components/atoms/Icons/FAQsIcon';
import { OfficeHoursIcon } from '@/components/atoms/Icons/OfficeHoursIcon';
import Accordion from '@/components/molecules/Accordion';
import ChatSuggestions from '@/components/templates/ChatSuggestions';
import FAQs from '@/components/templates/FAQs';
import OfficeHours from '@/components/templates/OfficeHours';
import { GENERAL_SECTION_NAMES } from '@/constants/index';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const General = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const general = [
    {
      Title: GENERAL_SECTION_NAMES.CHAT_PROMPTS,
      Phrase: 'Suggest a message to your customers',
      selected: false,
      Content: ChatSuggestions,
      Icon: ChatSuggestionIcon,
    },
    {
      Title: GENERAL_SECTION_NAMES.AVAILABILITY,
      Phrase: 'Set default office hours and reply times',
      selected: false,
      Content: OfficeHours,
      Icon: OfficeHoursIcon,
    },
    {
      Title: GENERAL_SECTION_NAMES.FAQ,
      Phrase: 'Set FAQs for your customers',
      selected: false,
      Content: FAQs,
      Icon: FAQsIcon,
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
              Content={
                <item.Content
                  handleCancel={() =>
                    selectedIndex === index
                      ? setSelectedIndex(null)
                      : setSelectedIndex(index)
                  }
                />
              }
              Icon={<item.Icon />}
              payload={{ ...item, index, selected: selectedIndex === index }}
              handleClick={() => {
                const activeItem = selectedIndex === index;

                activeItem ? setSelectedIndex(null) : setSelectedIndex(index);

                if (item.Title === GENERAL_SECTION_NAMES.CHAT_PROMPTS) {
                  WidgetConfigStore.set_should_show_chat(!activeItem);
                } else {
                  WidgetConfigStore.set_should_show_chat(false);
                }
              }}
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
export default observer(General);
