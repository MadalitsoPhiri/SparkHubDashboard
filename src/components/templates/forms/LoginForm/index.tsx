import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import routeNames from '@/routes/routeNames';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Formik } from 'formik';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string()
    .min(6, 'Password too short')
    .required('Password required'),
});

type LoginPayload = {
  email: string;
  password: string;
};

type LoginFormProps = {
  handleSubmit: (value: LoginPayload) => void;
};

const LoginForm: FC<LoginFormProps> = ({ handleSubmit: handleOnSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleOnSubmit}
    >
      {({ errors, handleSubmit, handleBlur, handleChange }) => (
        <form className='space-y-3' onSubmit={handleSubmit}>
          <Input
            label='Email Address'
            name='email'
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors?.email}
          />{' '}
          <Input
            label='Password'
            name='password'
            type='password'
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors?.password}
          />{' '}
          <div className='flex items-center justify-between'>
            <div className='flex items-center '>
              <Input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                containerClassName='w-fit'
                className='border-none m-0 [padding:0!important]'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 text-md block text-gray-900 cursor-pointer select-none'
              >
                Remember me
              </label>
            </div>

            <div className='text-md'>
              <Link
                to={routeNames.authentication.forgotPassword}
                className='hover:text-purple-light'
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Button
              type='submit'
              className='mt-4 w-full group relative hover:bg-primary-medium'
              size='sm'
              text={'Sign in'}
              LeftIcon={
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <LockClosedIcon
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

export default LoginForm;
