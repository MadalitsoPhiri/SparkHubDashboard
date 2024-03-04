import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { SelectInput } from '@/components/atoms/SelectInput';
import { priorityOptions, taskStatusOptions } from '@/constants/index';
import { teamMateStore } from '@/state/TeammateStore';
import { Task, TaskPriority } from '@/types/task.types';
import { ErrorMessage, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import * as yup from 'yup';

export const CreateTaskSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  dueDate: yup.string().required('Due date is required'),
  priority: yup.string().required('Priority is required'),
  status: yup.string().required('Status is required'),
  assignedUserId: yup.string().optional(),
  isCompleted: yup.boolean().optional(),
});

export enum TASK_ACTION {
  ASSIGN = 'assign',
  UNASSIGN = 'unassign',
}

export type TaskPayload = {
  title: string;
  dueDate: string;
  status: string;
  assignedUserId: string | null;
  priority: TaskPriority;
  action?: TASK_ACTION;
};

type AddTaskFormProps = {
  handleOnSubmit: (values: TaskPayload) => void;
  initialValues?: Partial<
    Omit<Task, 'assignedUser' | 'id'> & {
      assignedUserId: string;
      priority: TaskPriority;
    }
  >;
  isEditing?: boolean;
};

export const TaskForm: FC<AddTaskFormProps> = observer(
  ({ handleOnSubmit, initialValues, isEditing }) => {
    return (
      <Formik
        initialValues={{
          title: initialValues?.title || '',
          dueDate: initialValues?.dueDate || '',
          status: initialValues?.status || 'to_do',
          assignedUserId: initialValues?.assignedUserId || '',
          priority: initialValues?.priority || TaskPriority.LOW,
        }}
        onSubmit={handleOnSubmit}
        validationSchema={CreateTaskSchema}
      >
        {({ handleSubmit, values, handleBlur, handleChange }) => (
          <div className='px-4'>
            <Input
              label={'Title'}
              type='text'
              value={values.title}
              placeholder='Enter title'
              className='w-full mb-2'
              onChange={handleChange('title')}
              onBlur={handleBlur('title')}
            />
            <small className='text-red-500'>
              <ErrorMessage name='title' />
            </small>

            <SelectInput
              loading={false}
              label={'Priority'}
              options={priorityOptions}
              value={values.priority as any}
              placeholder='Select priority'
              className=' w-full mb-2'
              onChange={handleChange('priority')}
            />
            <small className='text-red-500'>
              <ErrorMessage name={'priority'} />
            </small>

            <SelectInput
              loading={false}
              label={'Status'}
              options={taskStatusOptions}
              value={values.status as any}
              placeholder='Select status'
              className='w-full mb-2'
              onChange={handleChange('status')}
            />
            <small className='text-red-500'>
              <ErrorMessage name={'status'} />
            </small>

            <label className='block text-gray-400 text-md mb-1'>Due Date</label>
            <Input
              type='date'
              value={new Date(values.dueDate).toLocaleDateString('en-CA')}
              defaultValue={new Date().toISOString().slice(0, 10)}
              min={new Date().toISOString().split('T')[0]}
              placeholder='Enter due date'
              containerClassName='cursor-pointer'
              className='w-full mb-2'
              onChange={handleChange('dueDate')}
              onBlur={handleBlur('dueDate')}
              id='dueDate'
              onFocus={e => {
                e.currentTarget.showPicker();
              }}
            />
            <small className='text-red-500'>
              <ErrorMessage name='dueDate' />
            </small>

            <SelectInput
              label={'Assignee'}
              options={
                teamMateStore.teamMates.map(teammate => ({
                  value: teammate.user._id as string,
                  label: teammate.user.user_name,
                })) || []
              }
              value={values.assignedUserId as string}
              placeholder='Enter assignee'
              className='w-full mb-2'
              onChange={handleChange('assignedUserId')}
              onBlur={handleBlur('assignedUserId')}
            />
            <small className='text-red-500'>
              <ErrorMessage name={'assignedUserId'} />
            </small>

            <div className='my-2' />
            <Button
              text={isEditing ? 'Update Task' : 'Create Task'}
              className='w-full'
              size='md'
              onClick={handleSubmit}
            />
          </div>
        )}
      </Formik>
    );
  },
);
