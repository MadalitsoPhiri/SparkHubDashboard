import { makeAutoObservable } from 'mobx';

class SideBarStore {
  constructor() {
    makeAutoObservable(this);
  }

  public open = false;
  public menuOpened = false;

  public setOpen(open: boolean) {
    this.open = open;
  }

  public openMenu() {
    this.menuOpened = !this.menuOpened;
  }
}

export const sideBarStore = new SideBarStore();
