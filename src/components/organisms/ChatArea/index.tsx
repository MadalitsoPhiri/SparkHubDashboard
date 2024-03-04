import React, { useEffect, useRef, useState } from 'react';
import { ConStore } from '@/state/ConversationStore';
import { AuthStore } from '@/state/AuthenticationStore';
import Spinner from '@/components/atoms/Spinner';
import { useChatConversation } from '@/hooks/useChatConversation';
import MessageBubble from '@/components/molecules/MessageBubble';
import { Message } from 'types/message.type';
import MessageInput from '@/components/molecules/MessageInput';
import TypingStatus from '@/components/molecules/TypingStatus';
import { observer } from 'mobx-react-lite';
import { User } from '@/types/user.types';

const ChatArea = () => {
  const { send_read_receipts, get_messages, get_user_info } =
    useChatConversation();
  const [current_conversation_messages, set_current_conversation_messages] =
    useState<Map<string, Message> | null | undefined>(null);
  const [finalList, setFinalList] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  const sort = (x: Message, y: Message) => {
    return new Date(x?.createdAt).valueOf() - new Date(y?.createdAt).valueOf();
  };

  useEffect(() => {
    if (
      ConStore.selected_conversation_id &&
      ConStore.cons.has(ConStore.selected_conversation_id)
    ) {
      const con = ConStore.cons.get(ConStore.selected_conversation_id);

      if (!con?.fetched_messages) {
        get_messages(ConStore.selected_conversation_id);
      }

      set_current_conversation_messages(con?.messages);
      ConStore.setReRenderMessages(true);
    }
    scrollToBottom();
  }, [ConStore.selected_conversation_id]);

  useEffect(() => {
    if (
      ConStore.selected_conversation_id &&
      ConStore.cons.has(ConStore.selected_conversation_id)
    ) {
      const con = ConStore.cons.get(ConStore.selected_conversation_id);
      if (con?.fetched_messages) {
        set_current_conversation_messages(con.messages);
        ConStore.setReRenderMessages(true);
      }

      scrollToBottom();
    }
  }, [ConStore.cons, ConStore.selected_conversation_id]);

  useEffect(() => {
    if (
      ConStore.selected_conversation_id &&
      ConStore.cons.has(ConStore.selected_conversation_id) &&
      ConStore.reRenderMessages
    ) {
      const con = ConStore.cons.get(ConStore.selected_conversation_id);
      setFinalList(Array.from(con?.messages?.values() ?? []));
      ConStore.setReRenderMessages(false);
    }
  }, [ConStore.reRenderMessages]);

  useEffect(() => {
    scrollToBottom();
    //TODO:invoke function to send read receipts here
    if (ConStore.selected_conversation_id)
      send_read_receipts(ConStore.selected_conversation_id);
  }, [finalList]);

  return (
    <div className=' w-full h-full  flex flex-col p-[24px] '>
      {/* <ChatAreaHeader /> */}
      <div className='w-full h-full min-h-0 flex flex-col bg-white rounded-2xl'>
        <div className='flex flex-col  flex-1 h-full w-full overflow-y-auto pb-0 p-[24px]   scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded min-h-0'>
          {ConStore.cons.get(ConStore.selected_conversation_id as string)
            ?.fetching_messages ||
          !current_conversation_messages ||
          ConStore.cons.get(ConStore.selected_conversation_id as string)
            ?.updating_convo ? (
            <div className='flex justify-center items-center h-full w-full'>
              <Spinner size={40} color='#033EB5' />
            </div>
          ) : (
            finalList.sort(sort).map((item, index) => {
              const isLastBubble = finalList.length - 1 === index;
              let isSameSender = false;
              if (index !== 0) {
                isSameSender =
                  (finalList[index - 1].sender as User)._id ===
                  (item.sender as User)._id;
              }

              return (
                <MessageBubble
                  key={index}
                  messageData={item}
                  isLastBubble={isLastBubble}
                  isSameSender={isSameSender}
                />
              );
            })
          )}
          <div ref={bottomRef} />
          {/*eslint-disable-next-line no-prototype-builtins*/}
          {ConStore.conversation_typing_status?.hasOwnProperty(
            ConStore.selected_conversation_id
              ? ConStore.selected_conversation_id
              : '',
          ) && (
            <div className=' w-full  flex flex-col'>
              {Object.entries(
                ConStore.conversation_typing_status[
                  ConStore.selected_conversation_id
                    ? ConStore.selected_conversation_id
                    : ''
                ],
              ).map(([key, value]: any) => {
                if (value.status && AuthStore.users_info.has(key)) {
                  return (
                    <TypingStatus
                      data={AuthStore.users_info.get(key)}
                      key={key + value}
                    />
                  );
                } else {
                  // get user info here
                  if (!AuthStore.users_info.has(key)) get_user_info(key);
                }
              })}
            </div>
          )}
        </div>
        <MessageInput />
      </div>
    </div>
  );
};

export default observer(ChatArea);
