import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { CreatePayload } from '@/hooks/useContact';
import { contactStore } from '@/state/ContactStore';
import { Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

const newContactScheme = yup.object().shape({
  user_name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

type NewContactFormProps = {
  handleCreateContact: (data: CreatePayload) => void;
  closeModal: () => void;
};

export const NewContactForm: FC<NewContactFormProps> = ({
  handleCreateContact,
  closeModal,
}) => {
  return (
    <Formik
      initialValues={{
        user_name: '',
        email: '',
        contact_type: 'User',
      }}
      validationSchema={newContactScheme}
      onSubmit={handleCreateContact}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        values,
        handleSubmit,
      }) => (
        <form className='py-5 px-4' onSubmit={handleSubmit}>
          <Input
            placeholder='eg. Lusa M. Smith'
            label='Name'
            type='text'
            name='user_name'
            onChange={handleChange('user_name')}
            onBlur={handleBlur('user_name')}
            value={values.user_name}
            error={
              errors.user_name && touched.user_name ? errors.user_name : ''
            }
          />
          <div className='mt-2'>
            <Input
              placeholder='name@example.com'
              label='Email'
              type='email'
              name='email'
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email && touched.email ? errors.email : ''}
            />
          </div>
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
                text='Create a contact'
                type='submit'
                className='hover:bg-primary-medium w-full'
                disabled={contactStore.creatingContact}
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
