import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { notify } from '@/helpers/index';
import { AuthStore } from '@/state/AuthenticationStore';
import { teamMateStore } from '@/state/TeammateStore';
import { SocketResponse } from '@/types/socketResponse.type';
import { Invitation, TeamMate } from '@/types/teammate.types';
import { useNavigate } from 'react-router-dom';

export const useTeammate = () => {
  const navigate = useNavigate();
  const sendTeamMateInvite = (emails: any) => {
    teamMateStore.clearEmails();
    teamMateStore.setSendingInvite(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.INVITE_TEAMMATES,
      { event_name: SOCKET_EVENT_NAMES.INVITE_TEAMMATES, data: { emails } },
      (response: { invitations: Invitation[]; error: string | null }) => {
        if (!response.invitations) {
          notify('error', response?.error ?? 'Something went wrong');
        }
        if (response.invitations) {
          teamMateStore.addInvite(response.invitations);
          navigate(-2);
        }
        teamMateStore.setSendingInvite(false);
      },
    );
  };

  const resendInvite = (email: string) => {
    teamMateStore.setSendingInvite(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.RESEND_INVITE,
      { event_name: SOCKET_EVENT_NAMES.RESEND_INVITE, data: { email } },
      (response: { status: number }) => {
        if (response.status === 200) {
          teamMateStore.setSendingInvite(false);
          notify('success', 'Invite resent successfully');
        } else {
          teamMateStore.setSendingInvite(false);
          notify('error', 'Something went wrong');
        }
      },
    );
  };

  const deleteInvite = (inviteId: string) => {
    teamMateStore.setSendingInvite(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.DELETE_INVITE,
      {
        event_name: SOCKET_EVENT_NAMES.DELETE_INVITE,
        data: { invite_id: inviteId },
      },
      (response: { status: number; data: { _id: string } }) => {
        if (response.status === 200) {
          const deletedInviteId = response.data._id;
          const copyOfInvites = [...teamMateStore.invites];
          const inviteIndex = teamMateStore.invites.findIndex(
            invite => invite._id === deletedInviteId,
          );
          copyOfInvites.splice(inviteIndex, 1);
          teamMateStore.setInvites(copyOfInvites);

          notify('success', 'Invite deleted successfully');
        } else {
          notify('error', 'Something went wrong');
        }
        teamMateStore.setSendingInvite(false);
      },
    );
  };

  const deleteTeamMate = (userId: string) => {
    teamMateStore.setSendingInvite(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.DELETE_TEAMMATE,
      {
        event_name: SOCKET_EVENT_NAMES.DELETE_TEAMMATE,
        data: { userId },
      },
      (response: { status: number; data: { _id: string } }) => {
        if (response.status === 200) {
          const deletedInviteId = response.data._id;
          const copyOfTeammates = [...teamMateStore.teamMates];
          const teammateIndex = teamMateStore.invites.findIndex(
            teammate => teammate._id === deletedInviteId,
          );
          copyOfTeammates.splice(teammateIndex, 1);
          teamMateStore.setInvites(copyOfTeammates);

          notify('success', 'Invite deleted successfully');
        } else {
          notify('error', 'Something went wrong');
        }
        teamMateStore.setSendingInvite(false);
      },
    );
  };

  const getTeamMates = () => {
    teamMateStore.setFetchingTeamMates(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_TEAMMATES,
      { event_name: SOCKET_EVENT_NAMES.GET_TEAMMATES, data: null },
      (response: SocketResponse<TeamMate[]>) => {
        if (response.data) {
          teamMateStore.setTeamMates(response.data);
        }
        teamMateStore.setFetchingTeamMates(false);
      },
    );
  };
  const getInvites = () => {
    teamMateStore.setFetchingInvites(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_INVITES,
      { event_name: SOCKET_EVENT_NAMES.GET_INVITES, data: null },
      (response: any) => {
        if (response.data) {
          teamMateStore.setInvites(response.data);
        }
        teamMateStore.setFetchingInvites(false);
      },
    );
  };

  return {
    sendTeamMateInvite,
    getTeamMates,
    getInvites,
    resendInvite,
    deleteTeamMate,
    deleteInvite,
  } as const;
};
