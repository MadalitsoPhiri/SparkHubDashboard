import { useEffect, useState } from 'react';
import { useChatConversation } from '@/hooks/useChatConversation';
import { AuthStore } from '@/state/AuthenticationStore';
import { CONVERSATION_STATUS, Conversation } from '@/types/conversation.types';
import { User } from '@/types/user.types';

export const useConversationListItem = (data: Conversation) => {
  const [img1Loaded, setImg1Loaded] = useState(false);
  const { update_conversation_status } = useChatConversation();

  const handleCloseConversation = () => {
    update_conversation_status({
      conversation_id: data?._id,
      status: CONVERSATION_STATUS.CLOSED,
    });
  };

  useEffect(() => {
    if (!AuthStore.users_online_info.has((data?.lead as User)?._id)) {
      AuthStore.socket?.emit(
        'get_user_online_info',
        {
          event_name: 'get_user_online_info',
          data: { id: (data?.lead as User)?._id },
        },
        (response: any) => {
          if (response.data) {
            AuthStore.update_user_online_status(response.data);
          }
        },
      );
    }
    // cache conversation users
    if (!AuthStore.users_info.has((data?.lead as User)?._id)) {
      AuthStore.add_user_info(data?.lead);
    }

    data?.assigned_to?.map(item => {
      if (!AuthStore.users_info.has((item as User)?._id)) {
        AuthStore.add_user_info(item);
      }
    });
  }, [AuthStore.users_info]);
  return { img1Loaded, setImg1Loaded, handleCloseConversation };
};
