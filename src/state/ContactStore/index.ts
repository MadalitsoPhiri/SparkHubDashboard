import { User } from '@/types/user.types';
import { makeAutoObservable } from 'mobx';

class ContactStore {
  constructor() {
    makeAutoObservable(this);
  }

  public contacts: User[] = [];
  public recentViewContacts: User[] = [];
  public myContacts: User[] = [];
  public contact: User | null = null;
  public selectedContact: User | null = null;
  public error: string | null = null;
  public fetchingContact = false;
  public creatingContact = false;
  public updatingContact = false;
  public fetchUser = false;

  public setContacts(contacts: User[]) {
    this.contacts = contacts;
  }

  public setFetchingContact(loading: boolean) {
    this.fetchingContact = loading;
  }

  public setCreating(creating: boolean) {
    this.creatingContact = creating;
  }

  public setFetchingUser(loading: boolean) {
    this.fetchUser = loading;
  }
  public setUpdatingContact(loading: boolean) {
    this.updatingContact = loading;
  }
  public setContact(contact: User | null) {
    this.contact = contact;
  }

  public setError(error: string | null) {
    this.error = error;
  }

  public setRecentViewContacts(contacts: User[]) {
    this.recentViewContacts = contacts;
  }

  public setMyContacts(contacts: User[]) {
    this.myContacts = contacts;
  }
}

export const contactStore = new ContactStore();
