import { makeAutoObservable } from 'mobx';

export type Tag = {
  _id: string;
  name: string;
  userId: string;
};

class TagStore {
  constructor() {
    makeAutoObservable(this);
  }
  public tags: Tag[] = [];
  public isLoading = false;
  public error: string | null = null;

  public setIsLoading(state: boolean): void {
    this.isLoading = state;
  }

  public setTags(tags: Tag[]): void {
    this.tags = tags;
  }

  public getTags(): Tag[] | string[] {
    return this.tags;
  }
}

export const tagStore = new TagStore();
