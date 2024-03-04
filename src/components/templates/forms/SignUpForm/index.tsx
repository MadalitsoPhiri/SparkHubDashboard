import Button from '@/components/atoms/Button';
import TextInput from '@/components/atoms/Input';
import { SelectInput } from '@/components/atoms/SelectInput';
import { signUpSelectOptions } from '@/constants/index';
import { RegisterPayload } from '@/hooks/useAuth';
import routeNames from '@/routes/routeNames';
import { Icon } from '@iconify/react';

import { AuthStore } from '@/state/AuthenticationStore';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  user_name: Yup.string().required('User name required'),
  company_name: Yup.string().required('Company name required'),
  company_size: Yup.string().required('Company size required'),
  password: Yup.string()
    .min(6, 'Password too short')
    .required('Password required'),
});

type SignUpFormProps = {
  handleSignUp: (value: RegisterPayload) => void;
};

const SignUpForm: FC<SignUpFormProps> = ({ handleSignUp }) => {
  return (
    <Formik
      initialValues={{
        user_name: '',
        company_name: '',
        company_size: '',
        email: '',
        password: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={handleSignUp}
    >
      {({ errors, touched, handleSubmit, handleBlur, handleChange }) => (
        <form className='space-y-3' onSubmit={handleSubmit}>
          {AuthStore.error && (
            <small className='text-red-500'>{AuthStore.error}</small>
          )}
          <TextInput
            onChange={handleChange('user_name')}
            onBlur={handleBlur('user_name')}
            disabled={AuthStore.loading}
            name={'user_name'}
            label={'Full name'}
            error={
              errors.user_name && touched.user_name ? errors.user_name : ''
            }
            placeholder={'First and last name'}
          />

          <TextInput
            onChange={handleChange('company_name')}
            onBlur={handleBlur('company_name')}
            disabled={AuthStore.loading}
            label={'Company name'}
            name={'company_name'}
            error={
              errors.company_name && touched.company_name
                ? errors.company_name
                : ''
            }
            placeholder={'Your company or app name'}
          />
          <SelectInput
            onChange={handleChange('company_size')}
            onBlur={handleBlur('company_size')}
            disabled={AuthStore.loading}
            label={'Company size'}
            name={'company_size'}
            error={
              errors.company_size && touched.company_size
                ? errors.company_size
                : ''
            }
            options={signUpSelectOptions}
            placeholder={'Select company size'}
            loading={AuthStore.loading}
          />

          <TextInput
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            disabled={AuthStore.loading}
            label={'Email'}
            name={'email'}
            type='email'
            placeholder='Email'
            error={errors.email && touched.email ? errors.email : ''}
          />

          <TextInput
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            disabled={AuthStore.loading}
            label={'Password'}
            type='password'
            name={'password'}
            placeholder={'Password (at least 8 characters)'}
            error={errors.password && touched.password ? errors.password : ''}
          />

          <div className='flex items-center justify-center'>
            <Button
              loading={AuthStore.loading}
              loadingText={'Creating account...'}
              text={'Create account'}
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

          <p className='mt-2 text-md text-gray-400 text-center'>
            Already using SparkHub?{' '}
            <Link
              to={routeNames.authentication.login}
              className='font-medium text-primary-light hover:text-primary-medium'
            >
              Sign in
            </Link>
          </p>
        </form>
      )}
    </Formik>
  );
};

export default observer(SignUpForm);
