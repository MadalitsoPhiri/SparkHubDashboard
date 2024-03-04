import { fetchRequestWithToken } from '@/config/axios';
import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { notify } from '@/helpers/index';
import routeNames from '@/routes/routeNames';
import { AuthStore } from '@/state/AuthenticationStore';
import { workspaceStore } from '@/state/WorkSpaceStore';
import { SocketResponse } from '@/types/socketResponse.type';
import { UserWorkspaceInfo, Workspace } from '@/types/workspace.type';
import { useState } from 'react';

type WorkspacePayload = {
  company_size: string | null;
  workspace_name: string | null;
  timezone: string | null;
};

export const useWorkspace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const switchWorkspace = (workspace: Workspace) => {
    AuthStore.set_switching_workspace(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.SWITCH_WORKSPACE,
      {
        event_name: SOCKET_EVENT_NAMES.SWITCH_WORKSPACE,
        data: { workspace },
      },
      (response: SocketResponse<UserWorkspaceInfo>) => {
        if (response.data) {
          AuthStore.set_user_workspace_info(response.data as UserWorkspaceInfo);
          AuthStore.set_switching_workspace(false);
          window.location.reload();
        }
      },
    );
  };

  const createWorkspace = (data: WorkspacePayload) => {
    setIsLoading(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.CREATE_WORKSPACE,
      {
        event_name: SOCKET_EVENT_NAMES.CREATE_WORKSPACE,
        data,
      },
      (response: SocketResponse<Workspace>) => {
        if (response.data) {
          setIsLoading(false);
          window.location = routeNames.dashboard.home as unknown as Location;
        }
      },
    );
  };

  const updateWorkspace = (data: Partial<WorkspacePayload>) => {
    setIsLoading(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.UPDATE_WORKSPACE,
      {
        event_name: SOCKET_EVENT_NAMES.UPDATE_WORKSPACE,
        data,
      },
      (response: SocketResponse<Workspace>) => {
        if (response.data) {
          notify('success', 'Workspace updated successfully');
          AuthStore.update_workspace_in_active_workspace(response.data);
        } else if (response.error) {
          notify('error', response.error);
        }
        setIsLoading(false);
      },
    );
  };

  return {
    isLoading,
    switchWorkspace,
    createWorkspace,
    updateWorkspace,
  } as const;
};

export const deleteWorkspace = async (_id: any) => {
  workspaceStore.request();
  try {
    const response = await fetchRequestWithToken({
      url: `/api/auth/delete_workspace/${_id}`,
      method: 'DELETE',
    });
    workspaceStore.setDeleteSuccess(response);
  } catch (error) {
    workspaceStore.setDeleteFailed(error);
  }
};
