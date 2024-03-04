/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import Search from '@/components/atoms/Search';
import Modal from '@/components/atoms/modal';
import FilterTabs from '@/components/molecules/FilterTabs';
import { TaskAssignDropdown } from '@/components/molecules/TaskAssignDropdown';
import { DataTable } from '@/components/templates/DataTable';
import { TASK_ACTION, TaskForm } from '@/components/templates/forms/TaskForm';
import {
  TASK_FILTERS,
  taskFilterTabOptions,
  taskStatusOptions,
} from '@/constants/index';
import { useTask } from '@/hooks/useTask';
import { useTeammate } from '@/hooks/useTeammate';
import { taskStore } from '@/state/TaskStore';
import { teamMateStore } from '@/state/TeammateStore';
import { Task } from '@/types/task.types';
import { TeamMate } from '@/types/teammate.types';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

type TaskProps = {
  //...
};

const columnHelper = createColumnHelper<Task>();

const Tasks: FC<TaskProps> = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { id: profileId } = useParams<{ id: string }>();
  const {
    isTaskModalOpen,
    isDeleteTaskModalOpen,
    isEditTaskModalOpen,
    getTasks,
    deleteTask,
    createTask,
    updateTask,
    openTaskModal,
    closeTaskModal,
    setIsDeleteTaskModalOpen,
    setIsEditTaskModalOpen,
  } = useTask();
  const { getTeamMates } = useTeammate();

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleAssignUser = (userId: string | null) => {
    const selectedTeamMate = teamMateStore.teamMates?.find(
      teamMate => teamMate.user._id === userId,
    ) as TeamMate;
    taskStore.setAssignedUser(selectedTeamMate?.user);
    updateTask({
      ...taskStore.selectedTask,
      assignedUserId: userId,
      action: userId ? TASK_ACTION.ASSIGN : TASK_ACTION.UNASSIGN,
    });
  };

  useEffect(() => {
    getTasks(profileId as string, TASK_FILTERS[activeTab].value);
    getTeamMates();

    return () => {
      taskStore.resetTaskStore();
    };
  }, [activeTab]);

  const taskColumns = useMemo(
    () => [
      columnHelper.accessor('_id', {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div>
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('title', {
        id: 'title',
        cell: info => <p className='truncate'>{info.getValue()}</p>,
        header: () => <span>Title</span>,
      }),
      columnHelper.accessor('assignedUser', {
        id: 'assignedUser',
        cell: info => {
          const task = info.row.original;
          return (
            <TaskAssignDropdown task={task} handleOnSelect={handleAssignUser} />
          );
        },

        header: () => <span>Assignee</span>,
      }),
      columnHelper.accessor('priority', {
        id: 'priority',
        cell: info => {
          const priority = info.getValue();
          const badgeClassName =
            priority === 'high'
              ? 'text-darkRed bg-lightRed'
              : priority === 'medium'
              ? 'text-orange-400 bg-orange-100'
              : 'text-darkGreen bg-lightGreen rounded-md py-[2px] px-2';
          return priority ? (
            <span
              className={`${badgeClassName} rounded-md py-[2px] px-2 font-medium capitalize`}
            >
              {priority}
            </span>
          ) : null;
        },
        header: () => <span>Priority</span>,
      }),

      columnHelper.accessor('status', {
        id: 'status',
        cell: info => {
          const status = info.getValue();
          return (
            <div className={`font-medium leading-tight`}>
              {taskStatusOptions.find(option => option.value === status)?.label}
            </div>
          );
        },
        header: () => <span>Status</span>,
      }),

      columnHelper.accessor('dueDate', {
        id: 'dueDate',
        cell: info => {
          const dueDate = info.getValue();
          return (
            <div
              className={`${
                dueDate && new Date(dueDate) < new Date() ? 'text-warning ' : ''
              } text-[12px]  font-medium leading-tight`}
            >
              {format(new Date(dueDate), 'dd MMM yyyy')}
            </div>
          );
        },
        header: () => <span>Due Date</span>,
      }),

      columnHelper.accessor('_id', {
        id: 'action',
        cell: info => {
          const row = info.row.original;
          return (
            <div className='flex items-center gap-2 w-fit text-center'>
              <button
                className='block p-2 rounded-md'
                onClick={() => {
                  taskStore.setSelectedTask(row);
                  setIsEditTaskModalOpen(true);
                }}
              >
                <BiPencil className='text-green-500 cursor-pointer' size={15} />
              </button>

              <button
                className='block p-2 rounded-md'
                onClick={() => {
                  taskStore.setSelectedTask(row);
                  setIsDeleteTaskModalOpen(true);
                }}
              >
                <BiTrash className='text-red-500 cursor-pointer' size={15} />
              </button>
            </div>
          );
        },
        enableSorting: false,
        header: () => <span>Action</span>,
      }),
    ],
    [
      taskStore.selectedTask?._id,
      teamMateStore.teamMates.length,
      teamMateStore.selectedTeamMate,
    ],
  );

  return (
    <div className='flex flex-col py-4 relative'>
      <div className='flex justify-between mb-4'>
        <div className='relative flex items-center mr-2 sm:w-96 md:w-[500px]'>
          <Search placeholder='Search a Task' transparent showCommand={false} />
        </div>

        <FilterTabs
          options={taskFilterTabOptions}
          onChange={handleTabChange}
          activeTab={activeTab}
          handleButtonClick={openTaskModal}
        />
      </div>
      <div className='h-[calc(100vh-400px)] border'>
        <DataTable
          columns={taskColumns as any}
          data={taskStore.tasks || []}
          headerClassName='bg-gray-100 text-lightBlack font-medium text-md first:w-9 even:w-auto'
          showPagination
        />
      </div>
      <Modal
        show={isTaskModalOpen}
        openModal={openTaskModal}
        closeModal={closeTaskModal}
        title='Create Task'
        className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[500px] overflow-hidden text-left align-top  transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <TaskForm handleOnSubmit={createTask} />
      </Modal>

      <Modal
        show={isEditTaskModalOpen}
        openModal={() => setIsEditTaskModalOpen(true)}
        closeModal={() => setIsEditTaskModalOpen(false)}
        title='Edit Task'
        className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[500px] overflow-hidden text-left align-top  transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <TaskForm
          handleOnSubmit={values => {
            updateTask(values);
            setIsEditTaskModalOpen(false);
          }}
          initialValues={{
            ...taskStore.selectedTask,
            assignedUserId: taskStore?.selectedTask?.assignedUser?._id as any,
            priority: taskStore?.selectedTask?.priority as any,
          }}
          isEditing
        />
      </Modal>

      <Modal
        title='Delete Task'
        show={isDeleteTaskModalOpen}
        openModal={() => setIsDeleteTaskModalOpen(true)}
        closeModal={() => setIsDeleteTaskModalOpen(false)}
        className='inline-block py-6 my-8 w-[500px] overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <div className='flex items-center justify-center w-12 h-12 rounded-full bg-red-100'>
            <BiTrash className='text-red-500' size={20} />
          </div>
          <p className='my-3 max-w-[60%] text-center'>
            Are you sure you want to delete &quot;
            <span className='font-semibold'>
              {taskStore?.selectedTask?.title}
            </span>
            &quot;?
          </p>

          <div className='pt-4 px-4 flex justify-between space-x-6 w-full'>
            <Button
              onClick={() => setIsDeleteTaskModalOpen(false)}
              type='button'
              text='Cancel'
              size='sm'
              variant='outline'
              className={`hover:bg-grey-light text-[#222] flex-1`}
            />

            <Button
              type='submit'
              text='Delete'
              size='sm'
              variant='danger'
              onClick={() => {
                deleteTask(taskStore?.selectedTask?._id as string);
                setIsDeleteTaskModalOpen(false);
              }}
              className={'text-white flex-1'}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default observer(Tasks);
