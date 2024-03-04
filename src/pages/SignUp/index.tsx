import Logo from '@/components/atoms/Logo';
import SignUpForm from '@/components/templates/forms/SignUpForm';
import { useAuth } from '@/hooks/useAuth';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const { register } = useAuth();
  return (
    <div className='h-screen flex justify-center items-center bg-white'>
      <div className='w-[500px] px-5'>
        <div className='flex flex-col items-center justify-center mb-6'>
          <Link to={'/'} className='flex flex-col items-center justify-center'>
            <Logo size='lg' />
            <h5>
              <span className='font-bold text-primary'>Spark</span>
              Hub
            </h5>
          </Link>
          <p className='text-center w-[70%] mt-5'>
            Create an account to get started.
          </p>
        </div>
        <SignUpForm handleSignUp={register} />
      </div>
    </div>
  );
};

export default observer(SignUp);
