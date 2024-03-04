import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import { FC } from 'react';

type Sender = {
  id: number;
  name: string;
  avatar?: string;
};

export type Message = {
  id: string;
  sender: Sender;
  timestamp: string;
  message: string;
};

interface MessageProps {
  message: Message;
  senderBG: string;
  receiverBG: string;
}

const Message: FC<MessageProps> = ({ message, senderBG, receiverBG }) => {
  const isMe =
    message.sender.id === 1 ||
    message.sender.id === 3 ||
    message.sender.id === 9 ||
    message.sender.id === 6 ||
    message.sender.id === 4 ||
    message.sender.id === 8;
  return (
    <div className={`flex ${isMe ? 'justify-start' : 'justify-end'} mb-3`}>
      {message.sender && message.sender.avatar && (
        <div className='flex-none mt-4'>
          <Avatar size='lg' src={message.sender.avatar} alt='profile' />
        </div>
      )}
      <div className={`flex flex-col ${message.sender ? 'ml-2 gap-y-1' : ''}`}>
        {message.sender && (
          <Text size='sm' color='text-gray-500' weight='medium'>
            {message.sender.name}
          </Text>
        )}
        <div
          className={`p-[12px] rounded-[4px] ${
            isMe
              ? `bg-${receiverBG} border text-black justify-end border-border shadow-sm`
              : `bg-${senderBG} text-white justify-end`
          }`}
        >
          <Text size='md'>{message.message}</Text>
        </div>
        {!message.sender && message.timestamp && (
          <div className='flex flex-row-reverse mt-1'>
            <div className='flex items-center space-x-2'>
              <Icon icon={Icons.checkMark} size={13} color='gray-50' />
              <Text size='sm' color='gray-100'>
                {message.timestamp}
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
