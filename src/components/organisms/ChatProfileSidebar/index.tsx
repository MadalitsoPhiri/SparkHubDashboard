import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { ConStore } from '@/state/ConversationStore';
import { User } from '@/types/user.types';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

type ProfileSidebar = {
  id: number;
  name: string;
  email: string;
  contactType: string;
  lastSeen: string;
  city: string;
};

type ChatProfileSidebarProps = {
  profile: ProfileSidebar;
};

export const ProfileSidebarListItem: FC<{
  name: string;
  value: string;
}> = ({ name, value }) => {
  return (
    <div className='flex justify-between items-center w-full'>
      <Text size='md' color='text-bold' weight='medium'>
        {name}
      </Text>
      <Text size='md' color='text-neutral-400'>
        {value}
      </Text>
    </div>
  );
};

const ChatProfileSidebar: FC<ChatProfileSidebarProps> = () => {
  return (
    <div className='p-5 border-l border-border h-full bg-white'>
      <div className='flex flex-col gap-2 border-b border-border pb-7'>
        <Text size='md' weight='medium'>
          Conversation details
        </Text>
        <Text size='md' color='text-neutral-500 '>
          {`ID ${ConStore.selected_conversation_id}`}
        </Text>
      </div>

      <div className='flex flex-col justify-center items-center py-7 gap-4 border-b border-border pb-7'>
        <Avatar size='xl' src='https://placehold.co/400' alt='profile' />
        <div className='text-center'>
          <Text size='lg' weight='medium'>
            {
              (
                ConStore.cons.get(ConStore.selected_conversation_id as string)
                  ?.lead as User
              )?.user_name
            }
          </Text>
          <Text size='md' color='text-neutral-400'>
            {
              (
                ConStore.cons.get(ConStore.selected_conversation_id as string)
                  ?.lead as User
              )?.email
            }
          </Text>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center py-7 gap-4 pb-7'>
        <ProfileSidebarListItem
          name='Type'
          value={
            (
              ConStore.cons.get(ConStore.selected_conversation_id as string)
                ?.lead as User
            )?.contact_type
          }
        />
        <ProfileSidebarListItem
          name='User ID'
          value={ConStore.selected_conversation_id as string}
        />
        <ProfileSidebarListItem name='Last seen' value={'2 hours ago'} />
        <ProfileSidebarListItem
          name='City'
          value={
            (
              ConStore.cons.get(ConStore.selected_conversation_id as string)
                ?.lead as User
            )?.city
          }
        />
      </div>
      <div className='w-full'>
        <Button
          text='See more'
          size='md'
          className='w-full'
          variant='outline'
        />
      </div>
    </div>
  );
};
export default observer(ChatProfileSidebar);
