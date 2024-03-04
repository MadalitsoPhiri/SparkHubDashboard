import Button from '@/components/atoms/Button';
import TextInput from '@/components/atoms/Input';
import { AuthStore } from '@/state/AuthenticationStore';
import { Icon } from '@iconify/react';

import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

const NewPasswordSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), ''],
    'Passwords must match',
  ),
});

type NewPasswordProps = {
  handleNewPassword: (value: { password: string; token: string }) => void;
};

const NewPasswordForm: FC<NewPasswordProps> = ({ handleNewPassword }) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <Formik
      initialValues={{
        confirmPassword: '',
        password: '',
        token: token || '',
      }}
      validationSchema={NewPasswordSchema}
      onSubmit={handleNewPassword}
    >
      {({ errors, touched, handleSubmit, handleBlur, handleChange }) => (
        <form className='space-y-3' onSubmit={handleSubmit}>
          {AuthStore.error && (
            <small className='text-red-500'>{AuthStore.error}</small>
          )}

          <TextInput
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            disabled={AuthStore.loading}
            label={'Password'}
            type='password'
            name={'password'}
            placeholder={'Password (atleast 8 characters)'}
            error={errors.password && touched.password ? errors.password : ''}
          />

          <TextInput
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            disabled={AuthStore.loading}
            label={'Confirm Password'}
            type='password'
            name={'confirm-password'}
            error={
              errors.confirmPassword && touched.confirmPassword
                ? errors.confirmPassword
                : ''
            }
          />

          <div className='flex items-center justify-center'>
            <Button
              loading={AuthStore.loading}
              text={'Change Password'}
              className='mt-4 w-full group relative hover:bg-primary-medium'
              size='sm'
              LeftIcon={
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <Icon
                    icon='mdi:lock'
                    className='h-5 w-5 text-primary-medium text-opacity-40 group-hover:text-white'
                    aria-hidden='true'
                  />
                </span>
              }
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default observer(NewPasswordForm);
