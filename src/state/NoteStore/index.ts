import { makeAutoObservable } from 'mobx';

export type Note = {
  _id: string;
  note: string;
};

class NoteStore {
  constructor() {
    makeAutoObservable(this);
  }

  public notes: Note[] = [];
  public selectedNotes: Note | null = null;
  public error: string | null = null;
  public loading = false;

  public setNotes(notes: Note[]) {
    this.notes = notes;
  }

  public setSelectedNotes(selectedNotes: Note | null) {
    this.selectedNotes = selectedNotes;
  }

  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  public setError(error: string | null) {
    this.error = error;
  }
}

export const noteStore = new NoteStore();
