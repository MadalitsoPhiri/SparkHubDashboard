import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Text from '@/components/atoms/Text';
import { useState } from 'react';
import Accordion from './accordion';
import AccordionItem from './accordionItem';
import { Intro, ReplyInbox, WidgetCustomize } from './content/firstAccordion';
import {
  AddWidgetToWebsite,
  HowToUse,
  InviteTeammate,
  SecureWidget,
  SetOfficeHours,
} from './content/secondAccordion';
import { ManageSocialMedia, RouteEmails } from './content/thirdAccordion';

export const QuickStart = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [active, setActive] = useState(-1);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const handleActive = (activeIndex: number) => {
    setActive(active === activeIndex ? -1 : activeIndex);
  };

  const data = [
    {
      title: 'Get to know Sparky',
      step: '3 Steps left',
      time: 'about 4 min',
      icon: <Icon icon={Icons.hand_shake} size={30} color='blue' />,
      content: [
        {
          title: `See what you'll be able to do with Sparky`,
          position: '1',
          content: <Intro />,
        },
        {
          title: 'Customize and Preview your Chat Widget',
          position: '2',
          content: <WidgetCustomize />,
        },
        {
          title: 'Send a reply from your Inbox',
          position: '3',
          content: <ReplyInbox />,
        },
      ],
    },
    {
      title: 'Get ready to chat with your customers',
      step: '5 Steps left',
      time: 'about 45 min',
      icon: <Icon icon={Icons.chat} size={30} color='blue' />,
      content: [
        {
          title: 'See how to get the most out of your Widget',
          position: '1',
          content: <HowToUse />,
        },
        {
          title: 'Add chat to your website',
          position: '2',
          content: <AddWidgetToWebsite />,
        },
        {
          title: 'Keep SparkChat secure',
          position: '3',
          content: <SecureWidget />,
        },
        {
          title: 'Set expectations with office hours and reply time',
          position: '4',
          content: <SetOfficeHours />,
        },
        {
          title: 'Invite your teammates to join you in SparkHub',
          position: '5',
          content: <InviteTeammate />,
        },
      ],
    },
    {
      title: 'Set up your Inbox to manage your conversations',
      time: 'about 6 min',
      step: '2 Steps left ',
      icon: <Icon icon={Icons.inbox_fill} size={30} color='blue' />,
      content: [
        {
          title: 'Route emails to your Sparky Inbox',
          position: '1',
          content: <RouteEmails />,
        },
        {
          title: 'Manage social media conversations in your Inbox',
          position: '2',
          content: <ManageSocialMedia />,
        },
      ],
    },
  ];

  return (
    <div className='bg-white border border-[#E6E6E6] rounded-[4px]'>
      <div className='font-medium leading-normal p-6 '>
        <Text color='text-black' size='md'>
          Your quick start guide
        </Text>
      </div>
      <div className='p-[20px]'>
        {data.map((item, index) => (
          <Accordion
            key={index}
            content={item.content.map((content, activeIndex) => (
              <AccordionItem
                key={activeIndex}
                title={content.title}
                position={content.position}
                content={content.content}
                sub_is_open={active === activeIndex}
                toggle={() => handleActive(activeIndex)}
              />
            ))}
            title={item.title}
            icon={item.icon}
            time={item.time}
            step={item.step}
            is_open={activeIndex === index}
            toggle={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
