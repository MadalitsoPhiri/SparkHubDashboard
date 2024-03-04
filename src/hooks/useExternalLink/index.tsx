import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { notify } from '@/helpers/index';
import { AuthStore } from '@/state/AuthenticationStore';
import { externalLinkStore } from '@/state/ExternalLinkStore';
import { ExternalLink } from '@/types/external_link.type';
import { SocketResponse } from '@/types/socketResponse.type';

export type ExternalLinkPayload = {
  link: string;
  userId: string;
};

export const useExternalLink = () => {
  const createExternalLink = (data: ExternalLinkPayload) => {
    externalLinkStore.setLoading(true);
    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.CREATE_USER_EXTERNAL_LINK,
      {
        event_name: SOCKET_EVENT_NAMES.CREATE_USER_EXTERNAL_LINK,
        data,
      },
      (response: SocketResponse<ExternalLink>) => {
        if (response.error) {
          notify('error', response.error);
          return;
        } else if (response.data) {
          const copy = [...externalLinkStore.externalLinks];
          externalLinkStore.setExternalLinks([...copy, response.data]);
        }
        externalLinkStore.setLoading(false);
      },
    );
  };

  const getUserExternalLinks = (userId: string) => {
    externalLinkStore.setLoading(true);
    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.GET_USER_EXTERNAL_LINKS,
      {
        event_name: SOCKET_EVENT_NAMES.GET_USER_EXTERNAL_LINKS,
        data: {
          userId,
        },
      },
      (response: SocketResponse<ExternalLink[]>) => {
        if (response.error) {
          notify('error', response.error);
          return;
        } else if (response.data) {
          externalLinkStore.setExternalLinks(response.data);
        }
        externalLinkStore.setLoading(false);
      },
    );
  };

  return {
    createExternalLink,
    getUserExternalLinks,
  };
};
