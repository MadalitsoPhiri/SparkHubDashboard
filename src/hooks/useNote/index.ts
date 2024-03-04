import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { AuthStore } from '@/state/AuthenticationStore';
import { Note, noteStore } from '@/state/NoteStore';
import { SocketResponse } from 'types/socketResponse.type';

export type NotePayload = {
  lead_id: string;
  note: string;
};

export const useNote = () => {
  const getNotes = (contactId: string | undefined) => {
    noteStore.setLoading(true);

    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.GET_LEAD_NOTES,
      {
        event_name: SOCKET_EVENT_NAMES.GET_LEAD_NOTES,
        data: { id: contactId },
      },
      (response: SocketResponse<Note>) => {
        if (response.data && Array.isArray(response.data)) {
          noteStore.setNotes(response.data);
        }
        noteStore.setLoading(false);
      },
    );
  };

  const deleteNote = (id: string) => {
    noteStore.setLoading(true);
    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.DELETE_LEAD_NOTE,
      { event_name: SOCKET_EVENT_NAMES.DELETE_LEAD_NOTE, data: { id } },
      (response: SocketResponse<Note>) => {
        if (response.data) {
          const copy = [...noteStore.notes];
          const index = copy.findIndex(item => {
            return item._id === (response.data as Note)._id;
          });
          copy.splice(index, 1);

          noteStore.setNotes(copy);
        }
        noteStore.setLoading(false);
      },
    );
  };

  const createNote = (payload: NotePayload) => {
    noteStore.setLoading(true);
    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.CREATE_LEAD_NOTE,
      {
        event_name: SOCKET_EVENT_NAMES.CREATE_LEAD_NOTE,
        data: { lead_id: payload.lead_id, note: payload.note },
      },
      (response: SocketResponse<Note>) => {
        const copy = [...noteStore.notes];
        noteStore.setNotes([...copy, response.data as Note]);
        noteStore.setLoading(false);
      },
    );
  };

  const editNote = (payload: Partial<NotePayload> & { id: string }) => {
    noteStore.setLoading(true);
    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.UPDATE_LEAD_NOTE,
      {
        event_name: SOCKET_EVENT_NAMES.UPDATE_LEAD_NOTE,
        data: { id: payload.id, note: payload.note },
      },
      (response: SocketResponse<Note>) => {
        if (response.data) {
          const copy = [...noteStore.notes];
          const index = copy.findIndex(item => {
            return item._id === (response.data as Note)._id;
          });
          copy.splice(index, 1, response.data as Note);

          noteStore.setNotes(copy);
        }
        noteStore.setLoading(false);
      },
    );
  };

  return {
    getNotes,
    editNote,
    createNote,
    deleteNote,
  };
};
