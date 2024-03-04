import { User } from '@/types/user.types';
import { UserWorkspaceInfo } from '@/types/workspace.type';
import { generate_socket_instance } from '@/utils/index';
import { makeAutoObservable } from 'mobx';
import { ISocket } from './types';

export class AuthenticationStore {
  constructor() {
    makeAutoObservable(this);
  }
  isLoading = true;
  loading = false;
  refreshing_token = false;
  signing_up = false;
  currentUser: User | null = null;
  users_info = new Map();
  users_online_info = new Map();
  user_info_updating = false;
  user_workspace_info: UserWorkspaceInfo = {} as UserWorkspaceInfo;
  switching_workspace = false;
  registered: boolean | null = null;
  socket: ISocket | null = null;
  upload_state = {
    progress: 0.0,
    uploading: false,
    file: null,
    cancel_upload: false,
    file_id: null,
  };
  errors = {
    login: null,
    signup: null,
    refresh: null,
  };
  error: string | null = null;

  requestLogin() {
    this.isLoading = true;
    this.errors = {
      login: null,
      signup: null,
      refresh: null,
    };
  }

  setUserAndSocket(response: any) {
    this.isLoading = false;
    this.currentUser = response.data.user;
    this.user_workspace_info = response.data.user_workspace_info;
    this.socket = generate_socket_instance(response.data.user.access_token);
  }

  setIsLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setLoginError(error: any) {
    this.isLoading = false;
    this.errors.login = error;
  }

  setError(error: any) {
    this.isLoading = false;
    this.error = error;
  }

  resetUploadState() {
    this.upload_state = {
      progress: 0.0,
      uploading: false,
      file: null,
      cancel_upload: false,
      file_id: null,
    };
  }
  cancelCurrentAttachmentsUpload() {
    this.upload_state.cancel_upload = true;
  }
  updateUploadState(payload: any) {
    const {
      file,
      progress,
      uploading,
      cancel_upload = false,
      file_id,
    } = payload;
    this.upload_state = {
      progress,
      uploading,
      file: file,
      cancel_upload,
      file_id,
    };
  }
  set_switching_workspace(payload: any) {
    if (payload != undefined) {
      this.switching_workspace = payload;
    }
  }
  set_user_workspace_info(payload: UserWorkspaceInfo) {
    this.user_workspace_info = payload;
  }
  add_workspace_integration(payload: any) {
    if (payload != undefined) {
      this.user_workspace_info?.active_workspace.workspace.integrations.push(
        payload,
      );
    }
  }
  requestSignup() {
    this.signing_up = true;
    this.errors = {
      login: null,
      signup: null,
      refresh: null,
    };
  }
  requestSignupSuccess(response: any) {
    this.isLoading = false;
    this.registered = true;
    this.currentUser = response.data.user;
    this.user_workspace_info = response.data.user_workspace_info;

    this.socket = generate_socket_instance(response.data.user.access_token);
  }
  requestSignupFailed(payload: any) {
    this.signing_up = false;
    this.errors.signup = payload;
    this.registered = false;
  }
  requestResetSignupSuccess() {
    this.registered = false;
  }
  requestRefreshToken(payload: any) {
    this.isLoading = payload;
    this.refreshing_token = true;
    this.errors = {
      login: null,
      signup: null,
      refresh: null,
    };
  }
  requestRefreshTokenSuccess(response: any) {
    this.isLoading = false;
    this.refreshing_token = false;
    this.currentUser = response.data.user;
    this.user_workspace_info = response.data.user_workspace_info;
    if (this.socket === null || this.socket.io._readyState === 'closed')
      this.socket = generate_socket_instance(response.data.user.access_token);
  }
  requestRefreshTokenFailed(payload: any) {
    this.isLoading = false;
    this.errors.refresh = payload;
    this.refreshing_token = false;
    this.currentUser = null;
  }

  requestLogout() {
    this.isLoading = true;
  }
  requestLogoutSuccess() {
    if (this.socket != null) this.socket.disconnect();
    this.socket = null;
    this.currentUser = null;
    this.registered = null;
    this.errors = {
      login: null,
      signup: null,
      refresh: null,
    };
    this.isLoading = false;
  }
  requestLogoutFailed() {
    this.isLoading = false;
  }
  clearState() {
    if (this.socket != null) this.socket.disconnect();
    this.socket = null;
    this.currentUser = null;
    this.registered = null;
    this.errors = {
      login: null,
      signup: null,
      refresh: null,
    };
    this.isLoading = false;
  }
  add_user_info(payload: any) {
    const { _id } = payload;
    if (_id) {
      this.users_info.set(_id, payload);
    }
  }
  update_user_online_status(payload: any) {
    const { _id } = payload;
    if (_id) {
      this.users_online_info.set(_id, payload);
    }
  }
  update_user_info(payload: any) {
    const { _id } = payload;
    if (_id) {
      this.user_info_updating = false;
      this.users_info.set(_id, payload);
    }
  }
  update_active_workspace(payload: any) {
    if (payload) {
      this.user_workspace_info.active_workspace = payload;
    }
  }
  update_workspace_in_active_workspace(payload: any) {
    if (payload) {
      this.user_workspace_info.active_workspace.workspace = payload;
    }
  }
  add_workspace_success(payload: any) {
    if (payload) {
      this.user_workspace_info.workspaces.push(payload);
    }
  }
  set_updating_user_info(payload: any) {
    if (payload !== undefined) {
      this.user_info_updating = payload;
    }
  }
}
export const AuthStore = new AuthenticationStore();
