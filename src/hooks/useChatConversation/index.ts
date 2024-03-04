import {
  CONVERSATION_SORT,
  CONVERSATION_STATUS,
  USERTYPE,
} from '@/constants/index';
import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { AuthStore } from '@/state/AuthenticationStore';
import { ConStore } from '@/state/ConversationStore';
import { convertToAttachmentEntity } from '@/utils/index';
import { ConversationStatusUpdate } from './types';

export const useChatConversation = () => {
  const get_open_conversations = (filter = {}) => {
    const sorted_by = ConStore.sorted_by === CONVERSATION_SORT.LATEST ? -1 : 1;
    ConStore.set_fetching_conversations(true);

    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_CONVERSATIONS,
      {
        event_name: SOCKET_EVENT_NAMES.GET_CONVERSATIONS,
        data: {
          page: 1,
          size: 10,
          status: CONVERSATION_STATUS.OPEN,
          sort: sorted_by,
          ...filter,
        },
      },
      (response: any) => {
        if (response.error) {
          //...
        } else {
          ConStore.get_conversations_successful(response.data);
          ConStore.set_fetching_conversations(false);
        }
      },
    );
  };

  const get_more_open_conversations = (contactId = null) => {
    const lastOpenConversationResponse = ConStore.lastOpenConversationResponse;
    const sorted_by = ConStore.sorted_by === CONVERSATION_SORT.LATEST ? -1 : 1;

    ConStore.set_fetching_more_open_conversations(true);

    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_CONVERSATIONS,
      {
        event_name: SOCKET_EVENT_NAMES.GET_CONVERSATIONS,
        data: {
          page: lastOpenConversationResponse?.page
            ? lastOpenConversationResponse.page + 1
            : 1,
          size: 10,
          status: CONVERSATION_STATUS.OPEN,
          sort: sorted_by,
          contactId: contactId,
        },
      },
      (response: any) => {
        if (response.error) {
          // error fetching conversations
          ConStore.set_fetching_more_open_conversations(false);
        } else {
          ConStore.get_more_open_conversations_successful(response.data);
          ConStore.set_fetching_more_open_conversations(false);
        }
      },
    );
  };

  const get_more_closed_conversations = (contactId = null) => {
    const lastClosedConversationResponse =
      ConStore.lastClosedConversationResponse;
    ConStore.set_fetching_more_closed_conversations(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_CONVERSATIONS,
      {
        event_name: SOCKET_EVENT_NAMES.GET_CONVERSATIONS,
        data: {
          page: lastClosedConversationResponse?.page
            ? lastClosedConversationResponse.page + 1
            : 1,
          size: 10,
          status: CONVERSATION_STATUS.CLOSED,
          contactId: contactId,
        },
      },
      (response: any) => {
        if (response.error) {
          // error fetching conversations
          ConStore.set_fetching_more_closed_conversations(false);
        } else {
          ConStore.get_more_closed_conversations_successful(response.data);
          ConStore.set_fetching_more_closed_conversations(false);
        }
      },
    );
  };

  const get_closed_conversations = (filter = {}) => {
    ConStore.set_closed_fetching_conversations(true);

    const lastClosedConversationResponse =
      ConStore.lastClosedConversationResponse;

    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_CONVERSATIONS,
      {
        event_name: SOCKET_EVENT_NAMES.GET_CONVERSATIONS,
        data: {
          page: lastClosedConversationResponse?.page
            ? lastClosedConversationResponse.page + 1
            : 1,
          size: 10,
          status: CONVERSATION_STATUS.CLOSED,
          ...filter,
        },
      },
      (response: any) => {
        if (response.error) {
          // error fetching conversations
        } else {
          ConStore.get_closed_conversations_successful(response.data);
          ConStore.set_closed_fetching_conversations(false);
        }
      },
    );
  };

  const update_conversation_status = (update: ConversationStatusUpdate) => {
    ConStore.set_updating_convo({
      conversation_id: update.conversation_id,
      updating: true,
    });
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.UPDATE_CON_STATUS,
      { event_name: SOCKET_EVENT_NAMES.UPDATE_CON_STATUS, data: update },
      (response: any) => {
        if (response.data) {
          ConStore.update_conversation({ conversation: response.data });
        }

        ConStore.set_updating_convo({
          conversation_id: update.conversation_id,
          updating: false,
        });
      },
    );
  };

  const send_read_receipts = (conversation_id: string) => {
    const messages: any[] =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      Array.from(ConStore.cons.get(conversation_id)?.messages.values()).filter(
        (msg: any) => {
          if (
            !(
              msg.sender.type === USERTYPE.AGENT &&
              !msg.sender.verified &&
              msg.sender.user_name.toLowerCase().includes('sparky')
            ) &&
            msg.sender._id !== AuthStore.currentUser?._id &&
            !msg.seen
          ) {
            return true;
          }
        },
      ) || [];

    if (messages.length) {
      AuthStore.socket?.emit(
        'read_receipts',
        {
          event_name: 'read_receipts',
          data: { messages },
        },
        (response: any) => {
          if (response.data) {
            ConStore.set_read_receipts(response.data);
          }
        },
      );
    }
  };

  const get_messages = (conversation_id: string) => {
    ConStore.set_fetching_messages({ conversation_id, is_fetching: true });
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_MESSAGES,
      {
        event_name: SOCKET_EVENT_NAMES.GET_MESSAGES,
        data: { conversation_id },
      },
      (response: any) => {
        ConStore.add_messages({ conversation_id, messages: response.data });
      },
    );
  };

  const get_user_info = (id: string) => {
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_USER_INFO,
      { event_name: SOCKET_EVENT_NAMES.GET_USER_INFO, data: { id } },
      (response: any) => {
        // dispatch(set_updating_user_info(false));
        if (response.data) {
          AuthStore.update_user_info(response.data);
        }
      },
    );
  };

  const set_typing = (payload: any) => {
    ConStore.set_typing_status(payload);
    AuthStore.socket?.emit('set_typing_status', {
      event_name: 'set_typing_status',
      data: payload,
    });
  };

  const send_message = (conversation_id: string, msg: any) => {
    ConStore.set_is_sending_message({
      conversation_id,
      is_sending: true,
    });
    const attachments = ConStore.cons.get(conversation_id)?.attachments ?? [];

    const final_attachments = attachments.map(attachment =>
      convertToAttachmentEntity(attachment),
    );

    ConStore.add_new_message({
      msg: { ...msg, attachments: final_attachments },
      status: 'sending',
    });
    ConStore.clearAttachments({ conversationId: conversation_id });
    //send socket message here

    AuthStore.socket?.emit(
      'new_message',
      {
        event_name: 'new_message',
        data: {
          conversation_id,
          text: msg.content.text,
          attachments: final_attachments,
        },
      },
      (response: any) => {
        ConStore.update_sent_message({
          old_id: msg._id,
          msg: response.data,
          conversation_id,
        });
      },
    );
  };
  return {
    get_open_conversations,
    get_closed_conversations,
    get_more_closed_conversations,
    get_more_open_conversations,
    update_conversation_status,
    send_read_receipts,
    get_messages,
    get_user_info,
    set_typing,
    send_message,
  };
};
