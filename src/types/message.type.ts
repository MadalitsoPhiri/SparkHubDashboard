import { MESSAGE_TYPE } from '../constants';
import { Conversation } from './conversation.types';
import { Tags } from './tags.types';
import { User } from './user.types';

export interface Attachments {
  type: string;
  attachment_name: string | null;
  attachment_url: string | null;
}

export interface Prompt {
  title: string;

  submitted: boolean;

  value: string;
}

export interface Content {
  text: string;
  payload: any;
}

export interface Message {
  _id?: string;
  conversation: Conversation | string;
  status?: string;
  sender: User | string;

  type: MESSAGE_TYPE;

  content: Content | null;
  attachments: Attachments[];
  prompt: Prompt;

  seen: boolean;

  tags: Tags[] | string[];

  deletedAt: Date;

  createdAt: Date;
}
