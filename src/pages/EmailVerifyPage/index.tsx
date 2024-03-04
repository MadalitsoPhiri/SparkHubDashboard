/* eslint-disable @typescript-eslint/ban-ts-comment */
import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';
import Spinner from '@/components/atoms/Spinner';
import Modal from '@/components/atoms/modal';
import { useAuth } from '@/hooks/useAuth';
import routeNames from '@/routes/routeNames';
import { AuthStore } from '@/state/AuthenticationStore';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function EmailVerifyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleResendVerificationEmail = () => {
    setLoading(true);
    AuthStore.socket?.emit('send_verification_email', {}, (response: any) => {
      if (response?.status === 200) {
        setLoading(false);
      }
    });
  };
  const { code } = useParams();

  const verifyEmail = (code: string) => {
    setLoading(true);
    AuthStore.socket?.emit(
      'verify_email',
      { data: { code } },
      (response: any) => {
        if (response?.status === 200) {
          // @ts-ignore
          window.location = routeNames.dashboard.home;
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
    );
  };
  useEffect(() => {
    if (code) {
      verifyEmail(code);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    logout();
    setIsOpen(true);
  };

  return (
    <div className='w-full h-screen  flex flex-col items-center bg-white '>
      {loading ? (
        <Spinner size={50} color={'#242263'} />
      ) : (
        <>
          <div className='w-full p-3 px-5 bg-white flex flex-row justify-between'>
            <div className='flex flex-row cursor-pointer items-center'>
              <Link
                className='flex items-center'
                to={routeNames.authentication.login}
              >
                <Logo size='md' />
                <p className='ml-2 text-lg font-semibold noselect'>Sparkhub</p>
              </Link>
            </div>
            <p
              className='underline cursor-pointer text-primary-light'
              onClick={openModal}
            >
              Sign out
            </p>
          </div>
          <div className='flex flex-col w-full h-full items-center pl-96 pr-96 bg-white'>
            <h2 className='text-[38px] font-bold mt-20'>You’re almost there</h2>
            <p className='mt-10 text-[15px] text-center'>
              Thanks for signing up! You should see a verification link in your
              email (it might be in your spam folder). Verify your email to
              start with Sparkhub today.
            </p>
            <p
              onClick={handleResendVerificationEmail}
              className='mt-10 text-[15px] text-center border-b-2 border-gray-500 border-dotted cursor-pointer'
            >
              Click here if you didn’t get an email from Sparkhub.
            </p>
            <img
              src='https://static.intercomassets.com/ember/assets/images/signup-teams/SMB_Hero@2x-c4a1deb14efa7a3074b3af16633ae87a.png'
              className='w-[300px] h-[300px] mt-10'
            />
          </div>
        </>
      )}
      <Modal
        show={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title={`Are you sure you want to sign out of the platform?`}
        className='inline-block py-6 my-8 w-[500px] overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <div className='flex flex-col px-4'>
          <div className='py-4 text-gray-500 2xl:text-[15px] xl:text-[12px]'>
            {`We want to make sure you intended to leave. Click "Confirm" to proceed with signing out or "Cancel" to stay logged in.`}
          </div>
        </div>

        <div className='border border-b-0'></div>
        <div className='pt-4 px-4 flex flex-row-reverse'>
          <Button
            type='button'
            text='Confirm'
            size='sm'
            onClick={() => {
              // dispatch(logout());
            }}
            className={`bg-primary-medium text-white`}
          />

          <Button
            onClick={closeModal}
            type='button'
            text='Cancel'
            size='sm'
            className={`mr-[15px] bg-[#f1f1f1] hover:bg-grey-light text-[#222]`}
          />
        </div>
      </Modal>
    </div>
  );
}
