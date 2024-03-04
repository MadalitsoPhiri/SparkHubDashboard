/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import EmptyList from '@/components/atoms/EmptyList';
import Spinner from '@/components/atoms/Spinner';
import Modal from '@/components/atoms/modal';
import FilterTabs from '@/components/molecules/FilterTabs';
import { TaskAssignDropdown } from '@/components/molecules/TaskAssignDropdown';
import { DataTable } from '@/components/templates/DataTable';
import { TASK_ACTION, TaskForm } from '@/components/templates/forms/TaskForm';
import { TASK_FILTERS, weeklyTaskFilterTabOptions } from '@/constants/index';
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
import { BiTrash } from 'react-icons/bi';

type TaskProps = {
  //...
};

const columnHelper = createColumnHelper<Task>();

const WeeklyTasks: FC<TaskProps> = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const {
    isTaskModalOpen,
    isDeleteTaskModalOpen,
    isEditTaskModalOpen,
    getAllTasks,
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
    getAllTasks(TASK_FILTERS[activeTab].value);
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

      columnHelper.accessor('dueDate', {
        id: 'dueDate',
        cell: info => {
          const dueDate = info.getValue();
          return (
            <div
              className={`${
                dueDate && new Date(dueDate) < new Date() ? 'text-warning ' : ''
              } text-[12px] leading-tight`}
            >
              {format(new Date(dueDate), 'dd MMM yyyy')}
            </div>
          );
        },
        header: () => <span>Due Date</span>,
      }),
    ],
    [
      taskStore.selectedTask?._id,
      teamMateStore.teamMates.length,
      teamMateStore.selectedTeamMate,
    ],
  );

  if (taskStore.isFetchingTasks) {
    return (
      <div className='h-[50vh] flex flex-col mx-auto justify-center items-center'>
        <Spinner size={40} color='#033EB5' />
      </div>
    );
  }

  return (
    <div className='flex flex-col py-4 '>
      {taskStore.tasks?.length > 0 ? (
        <>
          <div className='flex justify-between mb-4'>
            <FilterTabs
              options={weeklyTaskFilterTabOptions}
              onChange={handleTabChange}
              activeTab={activeTab}
              handleButtonClick={openTaskModal}
            />
          </div>
          <div className='border'>
            <DataTable
              columns={taskColumns as any}
              data={taskStore.tasks || []}
              headerClassName='bg-gray-100 text-[#161518] font-medium text-md first:w-9 even:w-auto'
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
                assignedUserId: taskStore?.selectedTask?.assignedUser
                  ?._id as any,
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
        </>
      ) : (
        <EmptyList title='No tasks recorded' height='400px' />
      )}
    </div>
  );
};
export default observer(WeeklyTasks);
