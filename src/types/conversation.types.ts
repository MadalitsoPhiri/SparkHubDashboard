import { Message } from './message.type';
import { Tags } from './tags.types';
import { User } from './user.types';
import { Workspace } from './workspace.type';

export enum CONVERSATION_STATUS {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  SNOOZED = 'SNOOZED',
}
export interface Conversation {
  _id?: string;
  id?: string;
  workspace: Workspace | string;
  root_account: User | string;
  type: string;
  channel: string;
  created_by: User | string;
  assigned_to: User[] | string[] | null;
  lead: User | string | null;
  participants: [User] | [string];
  admins: [User] | [string];
  status: CONVERSATION_STATUS;
  title: string | null;
  last_message: Message | null;
  tags: Tags[] | string[];
  updatedAt: string;
  updating_convo?: boolean;
  selected?: boolean;
  messages?: Map<string, Message>;
  fetched_messages?: boolean;
  fetching_messages?: boolean;
  attachments?: any[];
  sending_message?: boolean;
  typing?: boolean;
  attachments_uploaded?: boolean;
}
