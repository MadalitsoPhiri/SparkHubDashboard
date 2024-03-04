import Notification from '@/assets/sounds/notification-sound.mp3';
import { axiosInstancePrivate } from '@/config/axios';
import { useAuth } from '@/hooks/useAuth';
import UploadWorker from '@/services/workers/upload.worker?worker';
import { ActivityLog, activityLogStore } from '@/state/ActivityLogStore';
import { AuthStore } from '@/state/AuthenticationStore';
import { ConStore } from '@/state/ConversationStore';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import { UPLOAD_STATUS, USERTYPE } from '../constants';
import { User } from '@/types/user.types';
import { faviconString } from '../helpers';
import { CONVERSATION_STATUS, Conversation } from '@/types/conversation.types';
import { useChatConversation } from '@/hooks/useChatConversation';

export const useApp = () => {
  const { refreshToken, refreshSocketToken, retryEvents } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [worker, setWorker] = useState(new UploadWorker());
  const [playActive] = useSound(Notification, {
    volume: 0.1,
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(false),
  });
  const refreshingTokenRef = useRef<any>(null);
  const currentUserRef = useRef<any>(null);
  let requestInterceptor: number;
  let responseInterceptor: number;
  useEffect(() => {
    if (AuthStore.refreshing_token !== refreshingTokenRef.current) {
      refreshingTokenRef.current = AuthStore.refreshing_token;
    }

    if (AuthStore.currentUser !== currentUserRef.current) {
      currentUserRef.current = AuthStore.currentUser;
    }
  }, [AuthStore.refreshing_token, AuthStore.currentUser]);

  useEffect(() => {
    const conversations = Array.from(ConStore.cons.values());
    const atleastOneUnread = conversations.findIndex((con: Conversation) => {
      return (
        !(
          (con.last_message?.sender as User)?.type === USERTYPE.AGENT &&
          (con.last_message?.sender as User)?.verified &&
          (con.last_message?.sender as User)?.user_name
            .toLowerCase()
            .includes('sparky')
        ) &&
        (con.last_message?.sender as User)?._id !==
          AuthStore.currentUser?._id &&
        !con.last_message?.seen &&
        con.status === CONVERSATION_STATUS.OPEN
      );
    });

    const unreadConversations = conversations.filter((con: any) => {
      return (
        !(
          (con.last_message?.sender as User)?.type === USERTYPE.AGENT &&
          (con.last_message?.sender as User)?.verified &&
          (con.last_message?.sender as User)?.user_name
            .toLowerCase()
            .includes('sparky')
        ) &&
        (con.last_message?.sender as User)?._id !==
          AuthStore.currentUser?._id &&
        !con.last_message?.seen &&
        con.status === CONVERSATION_STATUS.OPEN
      );
    });

    ConStore.update_unread_conversations(unreadConversations.length);

    let link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconString(atleastOneUnread >= 0);
  }, [
    ConStore.cons,
    ConStore.reRenderConversationList,
    ConStore.reRenderMessages,
  ]);
  useEffect(() => {
    if (ConStore.play_notification && !isPlaying) {
      playActive();
      ConStore.set_play_notification(false);
    }
  }, [ConStore.play_notification]);
  useEffect(() => {
    requestInterceptor = axiosInstancePrivate.interceptors.request.use(
      (config: any) => {
        config.headers.authorization =
          'Bearer ' + AuthStore?.currentUser?.access_token;
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );

    responseInterceptor = axiosInstancePrivate.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const originalRequest = { ...error.config };
        if (
          (error.response.status === 401 || error.response.status === 403) &&
          !originalRequest._retry
        ) {
          const returnTokenAfterRefresh = async () => {
            let intervalId: string | number | NodeJS.Timeout | undefined;

            // eslint-disable-next-line @typescript-eslint/ban-types
            return new Promise((resolve: Function) => {
              intervalId = setInterval(() => {
                if (!refreshingTokenRef.current) {
                  try {
                    resolve(currentUserRef.current?.access_token);
                  } catch (err) {
                    resolve();
                  }
                }
              }, 100);
            }).then(result => {
              clearInterval(intervalId);
              return result;
            });
          };

          const requestAccessTokenRefresh = async () => {
            return refreshToken();
          };

          originalRequest._retry = true;

          const refreshedAccessToken = refreshingTokenRef.current
            ? await returnTokenAfterRefresh()
            : await requestAccessTokenRefresh();

          originalRequest.headers.authorization =
            'Bearer ' + refreshedAccessToken;

          return axiosInstancePrivate(originalRequest).then(res => {
            return res;
          });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstancePrivate.interceptors.request.eject(requestInterceptor);
      axiosInstancePrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const onMessageHandler = (payload: any) => {
    const parsed_payload = JSON.parse(payload.data);
    if (parsed_payload.event_name === 'upload_progress') {
      ConStore.updateUploadProgress({
        progress: parsed_payload.progress,
        file_id: parsed_payload.id,
      });
    } else if (parsed_payload.event_name === 'upload_complete') {
      worker.terminate();
      setWorker(new UploadWorker());
      ConStore.updateUploadState({
        progress: 0,
        uploading: false,
        file_id: null,
        cancel_upload: false,
      });
      ConStore.updateFileAttachmentState({
        file_id: parsed_payload.file_id,
        url: parsed_payload.data.url,
        status: UPLOAD_STATUS.COMPLETED,
      });
    } else if (parsed_payload.event_name === 'auth_error') {
      refreshToken();
    } else if (parsed_payload.event_name === 'refreshed_token') {
      refreshSocketToken(parsed_payload.response.data);
    }
  };
  const onErrorHandler = () => {
    //...
  };

  useEffect(() => {
    if (ConStore.upload_queue.length && !ConStore.upload_state.uploading) {
      const temp_file = ConStore.upload_queue[0];
      ConStore.updateUploadState({
        file: temp_file,
        progress: 0,
        uploading: true,
        file_id: temp_file.id,
        cancel_upload: ConStore.upload_state.cancel_upload,
      });
      worker.postMessage({
        event_name: 'file_upload',
        file: [temp_file],
        token: AuthStore?.currentUser?.access_token,
        file_id: temp_file.id,
      });

      ConStore.dequeueUpload();
    }
  }, [ConStore.upload_queue, worker, ConStore.upload_state.uploading]);

  useEffect(() => {
    if (worker) {
      worker.removeEventListener('message', onMessageHandler);
      worker.removeEventListener('error', onErrorHandler);
      worker.addEventListener('error', onErrorHandler);
      worker.addEventListener('message', onMessageHandler);
    }

    return () => {
      worker.removeEventListener('message', onMessageHandler);
      worker.removeEventListener('error', onErrorHandler);
    };
  }, [worker]);

  useEffect(() => {
    if (worker && ConStore.upload_state.cancel_upload) {
      worker.terminate();
      setWorker(new UploadWorker());
      ConStore.updateUploadState({
        file: null,
        progress: 0,
        uploading: false,
        file_id: null,
        cancel_upload: false,
      });
    }
  }, [ConStore.upload_state.cancel_upload]);

  useEffect(() => {
    if (AuthStore.socket) {
      const { get_open_conversations, get_closed_conversations } =
        useChatConversation();

      get_open_conversations({
        channel: 'CHAT',
      });
      get_closed_conversations({
        channel: 'CHAT',
      });
      ConStore.set_selected_conversation_id(null);
    }
    AuthStore.socket?.on('connect', () => {
      //...
    });

    AuthStore.socket?.on('connect_error', err => {
      if (err.message === 'Forbidden') {
        //
      }

      AuthStore.socket?.on('error_warning', () => {
        //...
      });

      return () => AuthStore.socket?.disconnect();
    });

    AuthStore.socket?.on('auth_error', () => {
      if (!refreshingTokenRef.current) {
        refreshToken();
      }
    });

    AuthStore.socket?.on('typing_status', payload => {
      ConStore.update_typing_status(payload);
    });
    AuthStore.socket?.on('retry_events', data => {
      AuthStore.socket?.emit('ack_retry_events', {
        event_name: 'ack_retry_events',
        data: null,
      });
      retryEvents(data);
    });
    AuthStore.socket?.on('read_receipts', response => {
      ConStore.set_read_receipts(response.data);
    });
    AuthStore.socket?.on('new_message', data => {
      if (data?.data) {
        ConStore.add_new_message({ msg: data.data, status: 'default' });

        ConStore.set_play_notification(true);
      }
    });

    AuthStore.socket?.on('new_conversation', data => {
      if (data?.data) {
        ConStore.add_new_conversation(data.data);
        ConStore.set_play_notification(true);
      }
    });

    AuthStore.socket?.on('onConfig', config => {
      WidgetConfigStore.addConfig(config);
    });

    AuthStore.socket?.on('user_online_info', user_info => {
      if (user_info.data) {
        AuthStore.update_user_online_status(user_info.data);
      }
    });

    AuthStore.socket?.on('user_lead_info', user_info => {
      if (user_info.data) {
        AuthStore.update_user_info(user_info.data);
      }
    });

    AuthStore.socket?.on(
      'new_activity_log',
      (response: { data: ActivityLog; error: string | null }) => {
        if (response.data) {
          activityLogStore.setActivityLogs([
            response.data,
            ...activityLogStore.activityLogs,
          ]);
        }
      },
    );
  }, [AuthStore.socket]);

  // useEffect(() => {
  //   anonymousNamespaceSocket?.on(
  //     'update_landing_page_company_data',
  //     payload => {
  //       dispatch(updateSummary(payload.context));
  //       dispatch(updateFavicon(payload.favicon));
  //       dispatch(updateColor(payload.color));
  //       dispatch(updatePromptSuggestionList(payload.promptSuggestionList));
  //       dispatch(
  //         updateConversationStarterList(payload.conversationStarterList),
  //       );
  //       dispatch(updateIsLoading(false));
  //     },
  //   );

  //   anonymousNamespaceSocket?.on(
  //     'update_landing_page_conversation',
  //     payload => {
  //       const newMessage = { content: payload.completion, role: 'assistant' };
  //       dispatch(updateIsTyping(false));
  //       dispatch(updateConversation(newMessage));
  //     },
  //   );
  // }, [anonymousNamespaceSocket]);
};
