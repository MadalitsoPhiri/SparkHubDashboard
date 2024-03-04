import Button from '@/components/atoms/Button';
import TextInput from '@/components/atoms/Input';
import { AuthStore } from '@/state/AuthenticationStore';

import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import * as Yup from 'yup';

const forgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
});

type ForgotPasswordFormProps = {
  handleSendCode: (value: { email: string }) => void;
};

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  handleSendCode,
}) => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={forgotPasswordFormSchema}
      onSubmit={handleSendCode}
    >
      {({ errors, touched, handleSubmit, handleBlur, handleChange }) => (
        <form className='space-y-3' onSubmit={handleSubmit}>
          {AuthStore.error && (
            <small className='text-red-500'>{AuthStore.error}</small>
          )}

          <TextInput
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            disabled={AuthStore.loading}
            label={'Email address'}
            name={'email'}
            type='email'
            placeholder='example@example.com'
            error={errors.email && touched.email ? errors.email : ''}
          />

          <div className='flex items-center justify-center'>
            <Button
              loading={AuthStore.loading}
              text={'Reset Password'}
              className='mt-4 w-full group relative hover:bg-primary-medium'
              size='sm'
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default observer(ForgotPasswordForm);
