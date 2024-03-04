import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import {
  ATTACHMENT_TYPE,
  BASE_URL,
  CONVERSATION_STATUS,
  USERTYPE,
} from '../constants';
import { ConStore } from '@/state/ConversationStore';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { AuthStore } from '@/state/AuthenticationStore';

import { ActivityLog } from '@/state/ActivityLogStore';
import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { User } from '@/types/user.types';

export const generate_socket_instance = (token: string) => {
  return io(BASE_URL, {
    extraHeaders: {
      Type: USERTYPE.AGENT,
      Authorization: token, // WARN: this will be ignored in a browser
    },
    withCredentials: true,
  });
};

export const capitalizeFirstLetter = (text: string) => {
  const arr = text.split(' ');

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(' ');
};

export const getAttachmentType = (attachment: any) => {
  if (attachment.type.includes('image')) {
    return ATTACHMENT_TYPE.IMAGE;
  } else if (attachment.type.includes('audio')) {
    return ATTACHMENT_TYPE.AUDIO;
  } else if (attachment.type.includes('video')) {
    return ATTACHMENT_TYPE.VIDEO;
  } else {
    return ATTACHMENT_TYPE.FILE;
  }
};
export const convertToAttachmentEntity = (attachment: any) => {
  const result = {
    type: getAttachmentType(attachment.file),
    attachment_url: attachment.url,
    attachment_name: attachment.file.name,
    backup_url: URL.createObjectURL(attachment.file),
  };
  return result;
};
export const process_retry_event = (
  event_name: string,
  response: any,
  data: any,
) => {
  switch (event_name) {
    case SOCKET_EVENT_NAMES.GET_CONVERSATIONS:
      if (data.status === CONVERSATION_STATUS.OPEN) {
        ConStore.get_conversations_successful(response.data.conversations);
      } else if (CONVERSATION_STATUS.CLOSED) {
        ConStore.get_closed_conversations_successful(
          response.data.conversations,
        );
      }
      break;
    case SOCKET_EVENT_NAMES.GET_MESSAGES:
      ConStore.add_messages({
        conversation_id: response.data[0].conversation,
        messages: response.data,
      });

      break;
    case SOCKET_EVENT_NAMES.GET_CONFIG:
      WidgetConfigStore.addConfig(response.data);
      break;
    case SOCKET_EVENT_NAMES.UPDATE_CONFIG:
      WidgetConfigStore.finishPublishLoading();
      break;
    case SOCKET_EVENT_NAMES.UPDATE_USER_INFO:
      AuthStore.update_user_info(response.data);
      break;
    case SOCKET_EVENT_NAMES.GET_USER_INFO:
      if (response.data) {
        AuthStore.update_user_info(response.data);
      }
      break;

    default:
      return null;
  }
};
export const getInitialsFromName = (name: string) => {
  const nameArray = name?.split(' ') ? name?.split(' ') : [];
  if (!name) return '';
  if (nameArray?.length >= 2) {
    const FirstLetter = nameArray[0][0];
    const SecondLetter = nameArray[1][0];
    return FirstLetter?.toUpperCase() + SecondLetter?.toUpperCase();
  } else {
    const lastLetterIndex = nameArray[0].length - 1;
    const FirstLetter = nameArray[0][0];
    const SecondLetter = nameArray[0][lastLetterIndex];
    return FirstLetter?.toUpperCase() + SecondLetter?.toUpperCase();
  }
};

export const generate_message = (
  conId: string,
  text: string,
  user: User | null,
  lead?: string | User | null | undefined,
) => {
  const MessageId = uuid();

  return {
    _id: MessageId,
    content: {
      text,
      payload: {},
    },
    sender: user,
    lead,
    conversation: conId,
    createdAt: new Date(),
    seen: false,
    is_prompt: false,
    prompt: null,
    status: 'sending',
  };
};

export const generateRandomID = () => {
  return uuid();
};

export const formatBytes = (bytes: any, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const formatActivityData = (activityLog: ActivityLog[]) => {
  const groupedData = {} as Record<string, ActivityLog[]>;

  activityLog.forEach(item => {
    const createdAt = new Date(item.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (!groupedData[createdAt]) {
      groupedData[createdAt] = [];
    }

    groupedData[createdAt].push(item);
  });

  const result = Object.keys(groupedData).map(date => ({
    title: date,
    data: groupedData[date],
  }));

  return result;
};