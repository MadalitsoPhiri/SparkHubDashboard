import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { CreateList } from '@/hooks/useList';
import { Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

const newListScheme = yup.object().shape({
  name: yup.string().required('Name is required'),
});

type NewListFormProps = {
  closeModal: () => void;
  handleCreateList: (data: CreateList) => void;
};

export const NewListForm: FC<NewListFormProps> = ({
  closeModal,
  handleCreateList,
}) => {
  return (
    <div className='px-4'>
      <Formik
        onSubmit={handleCreateList}
        validationSchema={newListScheme}
        initialValues={{
          name: '',
          description: '',
          contacts: [],
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input
              placeholder='Enter a list name'
              label='Name'
              type='text'
              name='name'
              onChange={handleChange('name')}
              onBlur={handleChange('name')}
              value={values.name}
              error={errors.name}
            />

            <div className='mt-4 text-center flex justify-between space-x-4'>
              <div className='flex flex-1'>
                <Button
                  size='sm'
                  text='Cancel'
                  onClick={closeModal}
                  variant='outline'
                  className='w-full'
                />
              </div>

              <div className='flex flex-1'>
                <Button
                  size='sm'
                  text='Create'
                  type='submit'
                  className='hover:bg-primary-medium w-full'
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
