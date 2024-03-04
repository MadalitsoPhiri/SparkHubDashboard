import ConversationList from '../../organisms/ConversationList';
import ChatArea from '../../organisms/ChatArea';
import ConversationProfilePanel from '../../organisms/ConversationProfilePanel';
import { motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import NoConversations from '../NoConversations';
import NoConversationSelected from '../NoConversationSelected';
import { ConStore } from '@/state/ConversationStore';
import Spinner from '@/components/atoms/Spinner';
import { observer } from 'mobx-react-lite';
import { useChatConversation } from '@/hooks/useChatConversation';

export interface MainChatUiProps {
  title: 'Chat' | 'Email' | 'SMS' | 'Messenger' | 'Whatsapp';
  conversationChannel?: 'CHAT' | 'EMAIL' | 'SMS' | 'MESSENGER' | 'WHATSAPP';
  showLeftPanel?: boolean;
}
const MainChatUi: FC<MainChatUiProps> = props => {
  const { get_open_conversations, get_closed_conversations } =
    useChatConversation();
  useEffect(() => {
    get_open_conversations({
      channel: props.conversationChannel
        ? props.conversationChannel
        : props.title.toUpperCase(),
    });
    get_closed_conversations({
      channel: props.conversationChannel
        ? props.conversationChannel
        : props.title.toUpperCase(),
    });
    ConStore.set_selected_conversation_id(null);
  }, [ConStore.sorted_by, props.conversationChannel]);

  return (
    <motion.div
      layout
      className='z-10 flex flex-row w-full h-full max-h-[94vh] overflow-hidden  shadow-xl border border-gray-20 bg-[#edeff2]'
    >
      <ConversationList {...props} />
      {ConStore.fetching_conversations ||
      ConStore.fetching_closed_conversations ? (
        <div className='flex justify-center items-center h-full w-full'>
          <Spinner size={40} color='#033EB5' />
        </div>
      ) : ConStore.open_conversations.length > 0 ? (
        ConStore.selected_conversation_id ? (
          <>
            <ChatArea />
            {props.showLeftPanel && <ConversationProfilePanel />}
          </>
        ) : (
          <NoConversationSelected />
        )
      ) : (
        <NoConversations />
      )}
    </motion.div>
  );
};
export default observer(MainChatUi);
