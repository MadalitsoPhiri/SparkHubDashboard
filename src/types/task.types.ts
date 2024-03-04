import { User } from './user.types';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TaskStatus {
  DONE = 'done',
  IN_PROGRESS = 'in_progress',
  TO_DO = 'to_do',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue',
}

export type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  assignedUser: User | null;
  userId: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};
