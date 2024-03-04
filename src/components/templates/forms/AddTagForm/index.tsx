import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { TagPayload } from '@/hooks/useTag';
import { Formik, FormikHelpers } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

const addTagScheme = yup.object().shape({
  name: yup.string().required('Name is required'),
});

type AddTagFormProps = {
  closeModal: () => void;
  handler: (
    values: TagPayload,
    formikHelpers: FormikHelpers<TagPayload>,
  ) => void;
};

export const AddTagForm: FC<AddTagFormProps> = ({ closeModal, handler }) => {
  return (
    <div className='px-4'>
      <Formik
        onSubmit={handler}
        validationSchema={addTagScheme}
        initialValues={{
          name: '',
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input
              placeholder='Enter tag name'
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
