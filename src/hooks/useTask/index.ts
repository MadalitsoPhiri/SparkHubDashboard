import {
  TASK_ACTION,
  TaskPayload,
} from '@/components/templates/forms/TaskForm';
import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { notify } from '@/helpers/index';
import { AuthStore } from '@/state/AuthenticationStore';
import { taskStore } from '@/state/TaskStore';
import { SocketResponse } from '@/types/socketResponse.type';
import { Task } from '@/types/task.types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const useTask = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const { id: userId } = useParams<{ id: string }>();

  const openTaskModal = () => setIsTaskModalOpen(true);
  const closeTaskModal = () => setIsTaskModalOpen(false);

  const createTask = (values: TaskPayload) => {
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.CREATE_TASK,
      {
        data: {
          ...values,
          userId,
          isCompleted: false,
        },
        event: SOCKET_EVENT_NAMES.CREATE_TASK,
      },
      (response: SocketResponse<Task>) => {
        if (response.error) {
          notify('error', response.error);
          return;
        }
        if (!response.data) {
          notify('error', 'Something went wrong');
          return;
        }
        taskStore.setTasks([response.data, ...taskStore.tasks]);
        closeTaskModal();
        notify('success', 'Task created successfully');
      },
    );
  };

  const deleteTask = (id: string) => {
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.DELETE_TASK,
      { event_name: SOCKET_EVENT_NAMES.DELETE_TASK, data: { id } },
      (response: SocketResponse<Task>) => {
        const newTasks = taskStore.tasks.filter(
          task => task._id !== response?.data?._id,
        );

        taskStore.setTasks(newTasks);
        notify('success', 'Task deleted successfully');
      },
    );
  };

  const updateTask = (values: Partial<TaskPayload>) => {
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.UPDATE_TASK,
      {
        event_name: SOCKET_EVENT_NAMES.UPDATE_TASK,
        data: {
          ...values,
          id: taskStore.selectedTask?._id,
        },
      },
      (response: SocketResponse<Task>) => {
        if (response.error) {
          notify('error', response.error);
          return;
        }

        const newTasks = taskStore.tasks.map(task => {
          if (task._id === response?.data?._id) {
            return response.data;
          }
          return task;
        });

        taskStore.setTasks(newTasks);
        notify(
          'success',
          `Task ${
            values.action === TASK_ACTION.ASSIGN
              ? 'Assigned'
              : values.action === TASK_ACTION.UNASSIGN
              ? 'Unassigned'
              : 'Updated'
          } successfully`,
        );
      },
    );
  };

  const getTasks = (userId: string, filter: string) => {
    taskStore.setIsFetchingTasks(true);
    const payload = { userId, filter };
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_TASKS,
      {
        data: payload,
        events: SOCKET_EVENT_NAMES.GET_TASKS,
      },
      (response: Task[]) => {
        taskStore.setTasks(response);
        taskStore.setIsFetchingTasks(false);
      },
    );
  };
  const getAllTasks = (filter: string) => {
    taskStore.setIsFetchingTasks(true);
    const payload = { filter };
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_TASKS,
      {
        data: payload,
        events: SOCKET_EVENT_NAMES.GET_TASKS,
      },
      (response: Task[]) => {
        taskStore.setTasks(response);
        taskStore.setIsFetchingTasks(false);
      },
    );
  };

  return {
    isTaskModalOpen,
    isEditTaskModalOpen,
    isDeleteTaskModalOpen,
    showAssigneeDropdown,
    getTasks,
    getAllTasks,
    createTask,
    deleteTask,
    updateTask,
    openTaskModal,
    closeTaskModal,
    setIsEditTaskModalOpen,
    setIsDeleteTaskModalOpen,
    setShowAssigneeDropdown,
  };
};
