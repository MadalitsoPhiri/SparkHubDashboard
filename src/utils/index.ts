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

export const getHexLuminance = (hexString: string) => {
  const color =
    hexString.charAt(0) === '#' ? hexString.substring(1, 7) : hexString;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  // converting to grayscale btw
  return r * 0.299 + g * 0.587 + b * 0.114;
};

export const hexToRGB = (hexString: string) => {
  const color =
    hexString.charAt(0) === '#' ? hexString.substring(1, 7) : hexString;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB

  return [r, g, b] as const;
};

export const luminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const getContrastRatio = (color1: string, color2: string) => {
  const lum1 = luminance(...hexToRGB(color1));
  const lum2 = luminance(...hexToRGB(color2));

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

export const pickTextColorBasedOnBgColorAdvanced = (
  bgColor: string,
  lightColor: string,
  darkColor: string,
) => {
  return getHexLuminance(bgColor) > 186 ? darkColor : lightColor;
};

export const pickHeaderTextcolor = (
  headerTextColor: string,
  bgColor: string,
  lightColor: string,
  darkColor: string,
) => {
  const contrastRatio = getContrastRatio(headerTextColor, bgColor);

  // Compare luminances
  if (contrastRatio > 4.3) {
    // User picked colours have good contrast use headerTextColor
    return headerTextColor;
  } else {
    return pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor);
  }
};

export const setCSSVariables = () => {
  if (WidgetConfigStore.config.value) {
    document.documentElement.style.setProperty(
      '--header-bg-color',
      WidgetConfigStore.config.value.colors.header_bg_color,
    );
    document.documentElement.style.setProperty(
      '--header-text-color',
      WidgetConfigStore.config.value.colors.header_text_color,
    );
    document.documentElement.style.setProperty(
      '--header-text-color-actual',
      pickHeaderTextcolor(
        WidgetConfigStore.config.value.colors.header_text_color,
        WidgetConfigStore.config.value.colors.header_bg_color,
        '#FFFFFF',
        '#000000',
      ),
    );
    document.documentElement.style.setProperty(
      '--chevron-color',
      pickTextColorBasedOnBgColorAdvanced(
        WidgetConfigStore.config.value.colors.header_bg_color,
        '#FFFFFF',
        '#000000',
      ),
    );
    document.documentElement.style.setProperty(
      '--border-color',
      WidgetConfigStore.config.value.colors.border_color,
    );
    document.documentElement.style.setProperty(
      '--btn-color',
      WidgetConfigStore.config.value.colors.btn_color,
    );
    document.documentElement.style.setProperty(
      '--btn-txt-color',
      pickTextColorBasedOnBgColorAdvanced(
        WidgetConfigStore.config.value.colors.btn_color,
        '#FFFFFF',
        '#000000',
      ),
    );
    document.documentElement.style.setProperty(
      '--main-hover-color',
      `${WidgetConfigStore.config.value.colors.header_bg_color}20`,
    );
  }
};
