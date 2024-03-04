import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { AuthStore } from '@/state/AuthenticationStore';
import { Tag, tagStore } from '@/state/TagStore';
import { useParams } from 'react-router-dom';
import { SocketResponse } from 'types/socketResponse.type';

export type TagPayload = {
  name: string;
  userId?: string;
};

export const useTag = () => {
  const { id } = useParams<{ id: string }>();
  const createTag = (payload: TagPayload) => {
    tagStore.setIsLoading(true);
    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.CREATE_TAG,
      {
        event_name: SOCKET_EVENT_NAMES.CREATE_TAG,
        data: {
          ...payload,
          userId: id,
        },
      },
      (response: SocketResponse<Tag>) => {
        const copy = [...tagStore.tags];
        tagStore.setTags([...copy, response.data as Tag]);
        tagStore.setIsLoading(false);
      },
    );
  };

  const getTags = (userId: string) => {
    tagStore.setIsLoading(true);

    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.GET_TAGS,
      { event_name: SOCKET_EVENT_NAMES.GET_TAGS, data: { userId } },
      (response: SocketResponse<Tag>) => {
        if (response.data && Array.isArray(response.data)) {
          tagStore.setTags(response.data);
        }
        tagStore.setIsLoading(false);
      },
    );
  };

  const deleteTag = (id: string) => {
    tagStore.setIsLoading(true);
    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.DELETE_TAG,
      { event_name: SOCKET_EVENT_NAMES.DELETE_TAG, data: { id } },
      (response: SocketResponse<Tag>) => {
        if (response.data) {
          const copy = [...tagStore.tags];
          const index = copy.findIndex(item => {
            return item._id === (response.data as Tag)._id;
          });
          copy.splice(index, 1);

          tagStore.setTags(copy);
        }
        tagStore.setIsLoading(false);
      },
    );
  };

  return {
    getTags,
    createTag,
    deleteTag,
  };
};
