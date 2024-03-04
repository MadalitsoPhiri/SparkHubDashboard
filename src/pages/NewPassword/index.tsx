import Logo from '@/components/atoms/Logo';
import NewPasswordForm from '@/components/templates/forms/NewPasswordForm';
import { useAuth } from '@/hooks/useAuth';
import routeNames from '@/routes/routeNames';
import { Link } from 'react-router-dom';

export const NewPassword = () => {
  const { resetPassword } = useAuth();

  return (
    <div className='h-screen flex justify-center items-center bg-white'>
      <div className='w-[500px] px-5 rounded-md pb-5 pt-3'>
        <div className='flex flex-col items-center justify-center mb-6'>
          <Link to={'/'} className='flex flex-col items-center justify-center'>
            <Logo size='lg' />
            <h5>
              <span className='font-bold text-primary'>Spark</span>
              Hub
            </h5>
          </Link>
          <p className='text-center w-[70%] mt-5'>
            Enter your new password and confirm it.
          </p>
        </div>
        <NewPasswordForm handleNewPassword={resetPassword} />
        <p className='text-center underline text-gray-400 mt-5'>
          <Link to={routeNames.authentication.login}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
};
