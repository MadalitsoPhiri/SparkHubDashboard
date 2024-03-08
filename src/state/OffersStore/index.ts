import { makeAutoObservable } from 'mobx';

class OffersState {
  advert = {
    isLoading: false,
    fetching_adverts: false,
    advert: [] as any[],
  };
  survey: {
    isLoading: boolean;
    fetching_surveys: boolean;
    survey: Array<any>;
  } = {
    isLoading: false,
    fetching_surveys: false,
    survey: [],
  };
  constructor() {
    makeAutoObservable(this);
  }
  set_is_adding_advert(payload: any) {
    this.advert.isLoading = payload;
  }
  set_is_fetching_advert(payload: any) {
    this.advert.fetching_adverts = payload;
  }
  add_advert(payload: any) {
    if (payload != undefined) {
      this.advert.advert.push(payload as never);
    }
  }
  delete_advert(payload: any) {
    if (payload != undefined) {
      const index = payload;
      if (index != undefined) {
        this.advert.advert.splice(index, 1);
      }
    }
  }

  set_edit_advert(payload: any) {
    if (payload != undefined) {
      const update = this.advert.advert.findIndex(
        (value: any) => value._id == payload._id,
      );
      if (update !== -1) {
        this.advert.advert[update] = payload as never;
      }
    }
  }

  set_advert(payload: any) {
    if (payload != undefined) {
      this.advert.advert = payload;
    }
  }

  // survey socket

  set_is_adding_survey(payload: any) {
    this.survey.isLoading = payload;
  }
  set_is_fetching_survey(payload: any) {
    this.survey.fetching_surveys = payload;
  }
  add_survey(payload: any) {
    if (payload != undefined) {
      this.survey.survey.push(payload as never);
    }
  }

  delete_survey(payload: any) {
    if (payload != undefined) {
      const index = payload;
      if (index != undefined) {
        this.survey.survey.splice(index, 1);
      }
    }
  }

  update_is_active(payload: any) {
    if (payload != undefined) {
      const { index, survey } = payload;
      if (index != undefined && survey) {
        const active = this.survey.survey.find(
          (value: any) => value.is_active === true,
        );
        if (active) {
          active.is_active = false;
        }
        this.survey.survey[index] = survey;
      }
    }
  }
  set_edit_survey(payload: any) {
    if (payload != undefined) {
      const active = this.survey.survey.findIndex(
        value => value._id == payload._id,
      );
      if (active !== -1) {
        this.survey.survey[active] = payload;
      }
    }
  }

  set_survey(payload: any) {
    if (payload != undefined) {
      this.survey.survey = payload;
    }
  }
}

export const OffersStore = new OffersState();
