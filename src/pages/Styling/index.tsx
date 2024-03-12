import { observer } from 'mobx-react-lite';
import Style from '../../components/templates/Style';
import StylesIcon from '@/components/atoms/Icons/StylesIcon';
import { GreetingIcon } from '@/components/atoms/Icons/GreetingIcon';
import Accordion from '@/components/molecules/Accordion';
import GreetingText from '@/components/templates/GreetingText';
import { useState } from 'react';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';

const Styling = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const styling = [
    {
      Title: 'SparkChat Design',
      Phrase: `Customize SparkChat's design to fit your brand`,
      selected: false,
      Content: Style,
      Icon: StylesIcon,
    },
    {
      Title: 'Set your welcome message',
      Phrase: 'Introduce your team',
      selected: false,
      Content: GreetingText,
      Icon: GreetingIcon,
    },
  ];
  return (
    <div className='rounded-2xl border border-[#E6E8EB] bg-white w-full h-auto overflow-auto px-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded'>
      {styling.map((item, index: number) => {
        const isLastItem = styling.length - 1 === index;
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

                WidgetConfigStore.set_should_show_chat(false);
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
export default observer(Styling);
