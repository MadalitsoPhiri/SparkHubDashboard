import { makeAutoObservable } from 'mobx';

class WorkspaceStore {
  constructor() {
    makeAutoObservable(this);
  }
  public isLoading = false;
  public success = undefined;
  public error = undefined;
  public delete_workspace = {};

  public request = () => {
    this.isLoading = true;
  };

  public setDeleteSuccess = (data: any) => {
    this.isLoading = false;
    this.success = data.payload.response.msg;
    this.delete_workspace = data.payload?.response?.data;
  };
  public setDeleteFailed = (error: any) => {
    this.isLoading = false;
    this.error = error?.payload?.error?.message;
  };

  public setReset = () => {
    this.isLoading = false;
    this.success = undefined;
    this.error = undefined;
    this.delete_workspace = {};
  };
}

export const workspaceStore = new WorkspaceStore();
