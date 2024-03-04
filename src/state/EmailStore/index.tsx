import { observable, action, makeObservable } from 'mobx';

export interface EmailState {
  isLoading: boolean;
  success: boolean;
  error: any;
  data: any;
}

export class EmailStore {
  state: EmailState = {
    isLoading: false,
    success: false,
    error: undefined,
    data: undefined,
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      requesting: action,
      requestEmailSuccess: action,
      requestEmailFailed: action,
      requestReset: action,
    });
  }

  requesting() {
    this.state.isLoading = true;
    this.state.error = {};
  }

  requestEmailSuccess(response: any) {
    this.state.isLoading = false;
    this.state.error = undefined;
    this.state.success = true;
    this.state.data = response;
  }

  requestEmailFailed(error: any) {
    this.state.isLoading = false;
    this.state.success = false;
    this.state.error = error;
  }

  requestReset() {
    this.state.success = false;
    this.state.error = undefined;
    this.state.data = undefined;
  }
}

export const emailStore = new EmailStore();
