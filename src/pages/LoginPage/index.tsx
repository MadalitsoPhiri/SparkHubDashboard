import routeNames from '@/routes/routeNames';
import { useEffect } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { LogoMark } from '@/components/atoms/Logo';
import Spinner from '@/components/atoms/Spinner';
import LoginForm from '@/components/templates/forms/LoginForm';
import { LoginPayload, useAuth } from '@/hooks/useAuth';
import { AuthStore } from '@/state/AuthenticationStore';
import { observer } from 'mobx-react-lite';

const Login = () => {
  const { login, refreshToken } = useAuth();
  const location = useLocation();

  const handleOnSubmit = async (data: LoginPayload) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    login(payload);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  if (AuthStore.isLoading) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <Spinner size={40} color='#033EB5' />
      </div>
    );
  }

  if (!AuthStore.isLoading && AuthStore.currentUser) {
    return (
      <Navigate
        to={location.state?.from?.pathname || routeNames.dashboard.home}
        state={{ from: location }}
        replace
      />
    );
  }

  return (
    <div className='min-h-screen bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <LogoMark className='h-12 w-auto' />
            <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Or{' '}
              <Link
                to={routeNames.authentication.signUp}
                state={{
                  from: location.state?.from ? location.state?.from : location,
                }}
                className='font-medium text-primary-light hover:text-primary-medium'
              >
                start your 14-day free trial
              </Link>
            </p>
          </div>

          <div className='mt-8'>
            <div>
              <div>
                <p className='text-sm font-medium text-gray-700'>
                  Sign in with
                </p>

                <div className='mt-1 flex justify-center gap-3 items-center'>
                  <div>
                    <a
                      href='#'
                      className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                      <span className='sr-only'>Sign in with Facebook</span>
                      <FaFacebookF size={20} className='text-blue-500' />
                    </a>
                  </div>
                  <div>
                    <a
                      href='#'
                      className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                      <span className='sr-only'>Sign in with Google</span>
                      <FcGoogle size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className='mt-6 relative'>
                <div
                  className='absolute inset-0 flex items-center'
                  aria-hidden='true'
                >
                  <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <LoginForm handleSubmit={handleOnSubmit} />
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src='https://static.wixstatic.com/media/ba701c_4fdbb39d900a449fa6af08659c686cc0~mv2.jpg/v1/fill/w_980,h_969,al_c,q_85,usm_0.66_1.00_0.01/ba701c_4fdbb39d900a449fa6af08659c686cc0~mv2.webp'
          alt=''
        />
        <div className='absolute inset-0 h-full w-full bg-purple-light bg-opacity-50'></div>
      </div>
    </div>
  );
};
export default observer(Login);
