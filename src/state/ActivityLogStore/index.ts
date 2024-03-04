import { User } from '@/types/user.types';
import { makeAutoObservable } from 'mobx';

export enum ActivityLogType {
  CALL = 'Call',
  EMAIL = 'Email',
  TASK = 'Task',
  NOTE = 'Note',
  CHAT = 'Chat',
}

export enum ActivityLogAction {
  CREATED = 'Created',
  UPDATED = 'Updated',
  DELETED = 'Deleted',
  ASSIGNED = 'Assigned',
  UNASSIGNED = 'Unassigned',
  ARCHIVED = 'Archived',
  SENT = 'Sent',
}

export type ActivityLog = {
  _id: string;
  type: ActivityLogType;
  action: ActivityLogAction;
  created_by: Pick<User, '_id' | 'user_name'>;
  contact: string;
  content: string;
  workspace: string;
  createdAt: string;
  updatedAt: string;
};

class ActivityLogStore {
  constructor() {
    makeAutoObservable(this);
  }

  public activityLogs: ActivityLog[] = [];
  public error: string | null = null;
  public fetchingLogs = false;

  public setActivityLogs(activityLogs: ActivityLog[]) {
    this.activityLogs = activityLogs;
  }

  public setError(error: string | null) {
    this.error = error;
  }

  public setFetchingLogs(fetchingLogs: boolean) {
    this.fetchingLogs = fetchingLogs;
  }
}

export const activityLogStore = new ActivityLogStore();
