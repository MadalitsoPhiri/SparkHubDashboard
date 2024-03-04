import React from 'react';

import { Link } from 'react-router-dom';
import routeNames from '@/routes/routeNames';
import Container from '@/components/atoms/Container';
import Logo from '@/components/atoms/Logo';

const TeammateSignUp = () => {
  const GoogleIcon = () => {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 48 48'
        width='25px'
        height='25px'
      >
        <path
          fill='#FFC107'
          d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
        />
        <path
          fill='#FF3D00'
          d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
        />
        <path
          fill='#4CAF50'
          d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
        />
        <path
          fill='#1976D2'
          d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
        />
      </svg>
    );
  };
  return (
    <div className='bg-[#FFFFFF] w-full h-screen  flex flex-col items-center'>
      <header className='w-full p-3 px-5 flex flex-row justify-between'>
        <div className='flex flex-row cursor-pointer'>
          <Logo size='md' />
          <p className='ml-2 text-lg font-semibold'>SparkHub</p>
        </div>
        <p className='text-medium text-gray-600'>
          Already using SparkHub?{' '}
          <Link
            to={routeNames.authentication.login}
            className='underline cursor-pointer'
          >
            Sign in
          </Link>
        </p>
      </header>
      <Container className='max-w-5xl mx-auto flex justify-between px-10 p-5 mt-10'>
        <div className='flex flex-col mr-16 flex-[0.7]'>
          <h1 className='text-[40px] font-thin mb-4'>{`Join your team at UI Feed`}</h1>
          <p className='text-lg font-normal text-gray-500'>{`James invited you to join the UI Feed team on SparkHub.`}</p>
        </div>
        <div className='flex flex-col flex-1'>
          <div>
            <p className='font-medium text-[17px] text-gray-600'>
              By clicking “Sign Up with Google” you agree to SparkHub’s{' '}
              <span className='underline text-primary-medium cursor-pointer'>
                Terms of Service
              </span>{' '}
              and{' '}
              <span className='underline text-primary-medium cursor-pointer'>
                Privacy Policy
              </span>
              .
            </p>
          </div>
          <div className='relative'>
            <div className='h-[46px] w-[50px] flex justify-center items-center absolute top-[17px] left-[1px] bg-[#FFFFFF] rounded-l-lg'>
              <GoogleIcon />
            </div>
            <button className='w-full bg-primary-medium mb-4 text-white font-medium  px-1 py-3 mt-4 rounded-lg text-center cursor-pointer'>
              Sign Up with Google
            </button>
          </div>
          <p className='font-medium text-[17px] text-gray-600 text-center'>
            or
          </p>
          <form action=''>
            <div className='mb-5'>
              <div className='flex flex-row justify-between'>
                <p className='mb-1'>Your name</p>
              </div>
              <input
                className={`text-sm w-full p-3 ring-1 rounded-[7px] ring-[#AAAAAA] outline-none focus:ring-primary-medium`}
                placeholder='Your full name'
              />
            </div>
            <div className='mb-5'>
              <div className='flex flex-row justify-between'>
                <p className='mb-1'>Work email</p>
              </div>
              <input
                className={`text-sm w-full p-3 ring-1 rounded-[7px] ring-[#AAAAAA] outline-none focus:ring-primary-medium`}
                placeholder='example@example.com'
              />
            </div>
            <div className='mb-5'>
              <div className='flex flex-row justify-between'>
                <p className='mb-1'>Password</p>
              </div>
              <input
                className={`text-sm w-full p-3 ring-1 rounded-[7px] ring-[#AAAAAA] outline-none focus:ring-primary-medium`}
                placeholder='Password (at least 6 characters)'
              />
            </div>
            <div>
              <p className='font-medium text-[17px] text-gray-600'>
                By clicking “Sign up” you agree to SparkHub’s{' '}
                <span className='underline text-primary-medium cursor-pointer'>
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className='underline text-primary-medium cursor-pointer'>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
            <button className='w-full bg-primary-medium text-white font-medium  px-1 py-3 mt-4 rounded-lg text-center cursor-pointer'>
              Sign up
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default TeammateSignUp;
