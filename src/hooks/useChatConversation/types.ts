import { CONVERSATION_STATUS } from 'types/conversation.types';

export interface ConversationStatusUpdate {
  status: string;
  conversation_id: string | undefined;
}
