import { Task } from '@/types/task.types';
import { User } from '@/types/user.types';
import { makeAutoObservable } from 'mobx';

class TaskStore {
  constructor() {
    makeAutoObservable(this);
  }

  public tasks: Task[] = [];
  public selectedTask: Task | null = null;
  public isFetchingTasks = false;

  public setTasks(tasks: Task[]) {
    this.tasks = tasks;
  }

  public setSelectedTask(task: Task | null) {
    this.selectedTask = task;
  }

  public setIsFetchingTasks(isFetchingTasks: boolean) {
    this.isFetchingTasks = isFetchingTasks;
  }

  public setAssignedUser(user: User | null) {
    if (this.selectedTask) {
      this.selectedTask.assignedUser = user;
    }
  }

  public resetTaskStore() {
    this.tasks = [];
    this.selectedTask = null;
    this.isFetchingTasks = false;
  }
}

export const taskStore = new TaskStore();
