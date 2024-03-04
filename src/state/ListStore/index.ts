import { makeAutoObservable } from 'mobx';

export type List = {
  _id: string;
  name: string;
  description?: string;
  contact_ids: string[];
};

class ListStore {
  constructor() {
    makeAutoObservable(this);
  }

  public lists: List[] = [];
  public list: List | null = null;
  public error: string | null = null;
  public fetchingList = false;

  public setLists(lists: List[]) {
    this.lists = lists;
  }
  public setFetchingList(loading: boolean) {
    this.fetchingList = loading;
  }

  public setActiveList(listName: string) {
    const activeList = this.lists.find(list => list.name === listName) || null;

    this.list = activeList;
  }
}

export const listStore = new ListStore();
