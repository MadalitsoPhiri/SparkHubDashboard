import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { AuthStore } from '@/state/AuthenticationStore';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';

export const useWidgetConfig = () => {
  const publish = async () => {
    WidgetConfigStore.publishLoading();

    if (WidgetConfigStore.old_brand_logo_url) {
      const splitUpURL = WidgetConfigStore.old_brand_logo_url.split(
        '/',
      ) as string[];
      const file_name = splitUpURL[splitUpURL.length - 1];

      await new Promise((resolve, reject) => {
        AuthStore.socket?.emit(
          SOCKET_EVENT_NAMES.DELETE_FILE,
          {
            event_name: SOCKET_EVENT_NAMES.DELETE_FILE,
            data: {
              file_name,
            },
          },
          (val: any) => {
            if (val.error) {
              reject(val);
            } else {
              WidgetConfigStore.resetOldBrandLogo();
              resolve(val);
            }
          },
        );
      });
    }

    const payload = WidgetConfigStore.config.value;

    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.UPDATE_CONFIG,
      { event_name: SOCKET_EVENT_NAMES.UPDATE_CONFIG, data: payload },
      () => {
        WidgetConfigStore.finishPublishLoading();
      },
    );
  };

  const get_spark_gpt_question_list = () => {
    WidgetConfigStore.set_fetching_spark_gpt_question(true);

    AuthStore.socket?.emit(
      'get_spark_gpt_question_list',
      { event_name: 'get_spark_gpt_question_list', data: null },
      (response: any) => {
        WidgetConfigStore.set_fetching_spark_gpt_question(false);

        if (response.error) {
          return;
        }

        WidgetConfigStore.add_spark_gpt_question_list(response.data);
      },
    );
  };

  const get_widget_config = () => {
    WidgetConfigStore.set_fetching(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_CONFIG,
      {
        event_name: SOCKET_EVENT_NAMES.GET_CONFIG,
        data: { widget_id: null },
      },
      (response: any) => {
        if (response) {
          if (response.data) {
            WidgetConfigStore.addConfig(response.data);
            // set_loading(false)
            WidgetConfigStore.set_fetching(false);
          }
        }
      },
    );
  };

  const get_faqs = () => {
    WidgetConfigStore.set_fetching_faq(true);
    AuthStore.socket?.emit(
      'get_faqs',
      { event_name: 'get_faqs', data: null },
      (response: any) => {
        WidgetConfigStore.set_fetching_faq(false);
        if (response.data) {
          WidgetConfigStore.add_faqs(response.data);
        }
      },
    );
  };

  const create_spark_gpt_question = (payload: any) => {
    WidgetConfigStore.set_is_adding_spark_gpt_question(true);

    AuthStore.socket?.emit(
      'add_spark_gpt_question',
      { payload: payload },
      (response: any) => {
        WidgetConfigStore.set_is_adding_spark_gpt_question(false);

        if (response.error) {
          return;
        }
        WidgetConfigStore.add_spark_gpt_question(response.data);

        WidgetConfigStore.set_add_editing(false);
      },
    );
  };

  const create_faq = (payload: any) => {
    WidgetConfigStore.set_is_adding_faq(true);
    AuthStore.socket?.emit(
      'add_faq',
      { event_name: 'add_faq', data: payload },
      (response: any) => {
        WidgetConfigStore.set_is_adding_faq(false);

        if (response.data) {
          WidgetConfigStore.add_faq(response.data);
          WidgetConfigStore.set_add_editing(false);
        }
      },
    );
  };

  return {
    publish,
    get_widget_config,
    get_faqs,
    create_faq,
    get_spark_gpt_question_list,
    create_spark_gpt_question,
  };
};
