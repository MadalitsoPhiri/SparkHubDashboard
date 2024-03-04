import { AuthStore } from '@/state/AuthenticationStore';
import { OffersStore } from '@/state/OffersStore';

export const useOffers = () => {
  const create_advert = (payload: any) => {
    OffersStore.set_is_adding_advert(true);
    AuthStore.socket?.emit(
      'create_advert',
      { event_name: 'create_advert', data: payload },

      (response: any) => {
        OffersStore.set_is_adding_advert(false);

        if (response.data) {
          OffersStore.add_advert(response.data);
        }
      },
    );
  };

  const remove_advert = (id: string, index: number) => {
    OffersStore.set_is_fetching_advert(true);

    AuthStore.socket?.emit(
      'remove_advert',
      { event_name: 'remove_advert', data: id },
      (response: any) => {
        OffersStore.set_is_fetching_advert(false);

        if (response.data) {
          OffersStore.delete_advert(index);
        }
      },
    );
  };

  const edit_advert = (payload: any) => {
    OffersStore.set_is_fetching_survey(true);

    AuthStore.socket?.emit(
      'edit_advert',
      { event_name: 'edit_advert', data: payload },
      (response: any) => {
        OffersStore.set_is_fetching_survey(false);

        if (response.data) {
          OffersStore.set_edit_advert(response.data);
        }
      },
    );
  };

  const get_adverts = () => {
    OffersStore.set_is_fetching_advert(true);
    AuthStore.socket?.emit(
      'get_adverts',
      { event_name: 'get_adverts' },
      (response: any) => {
        OffersStore.set_is_fetching_advert(false);

        if (response.data) {
          OffersStore.set_advert(response.data);
        }
      },
    );
  };

  // survey thunks
  const create_survey = (payload: any) => {
    OffersStore.set_is_adding_survey(true);
    AuthStore.socket?.emit(
      'create_survey',
      { event_name: 'create_survey', data: payload },
      (response: any) => {
        OffersStore.set_is_adding_survey(false);
        if (response.data) {
          OffersStore.add_survey(response.data);
        }
      },
    );
  };

  const remove_survey = (id: string, index: number) => {
    OffersStore.set_is_fetching_survey(true);

    AuthStore.socket?.emit(
      'remove_survey',
      { event_name: 'remove_survey', data: { id } },
      (response: any) => {
        OffersStore.set_is_fetching_survey(false);

        if (response.data) {
          OffersStore.delete_survey(index);
        }
      },
    );
  };

  const active_survey = (
    id: string,
    workspace_id: string,
    widgetId: string,
    is_active: boolean,
    index: number,
  ) => {
    OffersStore.set_is_fetching_survey(true);

    AuthStore.socket?.emit(
      'set_active_survey',
      {
        event_name: 'set_active_survey',
        data: { id, workspace_id, widgetId, is_active },
      },
      (response: any) => {
        OffersStore.set_is_fetching_survey(false);

        if (response.data) {
          OffersStore.update_is_active({ index, survey: response.data });
        }
      },
    );
  };
  const edit_survey = (payload: any) => {
    OffersStore.set_is_fetching_survey(true);
    AuthStore.socket?.emit(
      'edit_survey',
      { event_name: 'edit_survey', data: payload },
      (response: any) => {
        OffersStore.set_is_fetching_survey(false);

        if (response.data) {
          OffersStore.set_edit_survey(response.data);
        }
      },
    );
  };
  const get_survey = (id: string) => {
    OffersStore.set_is_fetching_survey(true);
    AuthStore.socket?.emit(
      'get_survey',
      { event_name: 'get_survey', data: id },
      (response: any) => {
        OffersStore.set_is_fetching_survey(false);

        if (response.data) {
          OffersStore.set_survey(response.data);
        }
      },
    );
  };

  const get_surveys = () => {
    OffersStore.set_is_fetching_survey(true);
    AuthStore.socket?.emit(
      'get_surveys',
      { event_name: 'get_surveys' },
      (response: any) => {
        OffersStore.set_is_fetching_survey(false);

        if (response.data) {
          OffersStore.set_survey(response.data);
        }
      },
    );
  };

  return {
    get_surveys,
    get_survey,
    edit_survey,
    active_survey,
    remove_survey,
    create_survey,
    get_adverts,
    edit_advert,
    create_advert,
    remove_advert,
  };
};
