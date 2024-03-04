import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';
import Spinner from '@/components/atoms/Spinner';
import { notify } from '@/helpers/index';
import { useAuth } from '@/hooks/useAuth';
import routeNames from '@/routes/routeNames';
import { AuthStore } from '@/state/AuthenticationStore';
import { User } from '@/types/user.types';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const JoinTeam = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [_, setServerError] = useState(false);
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<{
    inviter: User;
    workspace: any;
  } | null>(null);
  const { invite_id } = useParams();

  const check_invitation = () => {
    AuthStore.socket?.emit(
      'check_team_mate_invite',
      { event_name: 'check_team_mate_invite', data: { invite_id } },
      async (response: any) => {
        if (response?.status == 200) {
          setInvitation(response.invitation);
          setLoading(false);
          setServerError(false);
        } else if (response?.status == 404) {
          navigate('*', { replace: true });
          setLoading(false);
        } else {
          setLoading(false);
          setServerError(false);
          await logout();
        }
      },
    );
  };
  const join_team = () => {
    setLoading(true);

    AuthStore.socket?.emit(
      'join_workspace',
      {
        event_name: 'join_workspace',
        data: { invite_id },
      },
      (response: any) => {
        if (response?.error) {
          notify('error', response?.error);
        } else if (!response.error) {
          AuthStore.update_active_workspace({
            workspace: response.data.workspace,
            permissions: response.data.workspace_permissions,
          });
          AuthStore.add_workspace_success(response.data.workspace);
          navigate(routeNames.dashboard.home, { replace: true });
        }

        setLoading(false);
      },
    );
  };

  useEffect(() => {
    check_invitation();
  }, []);

  if (loading) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <Spinner size={40} color='#033EB5' />
      </div>
    );
  }

  return (
    <div className='bg-[#FFFFFF] w-full h-screen'>
      <nav className='bg-white py-2 px-4 border-b border-border'>
        <Link to={'/'} className='flex items-center'>
          <Logo size='lg' />
          <h5 className='text-primary'>
            <span className='font-bold text-primary'>Spark</span>
            Hub
          </h5>
        </Link>
      </nav>

      <div className='h-fit md:h-full my-10 md:my-0 grid md:place-items-center overflow-y-scroll'>
        <div className='border-1 border-border rounded-[5px] border shadow-inner p-4 md:p-8 flex flex-col lg:w-[50%] lg:mx-auto md:mx-10 mx-4'>
          <div className='flex items-center flex-col md:flex-row '>
            <Avatar
              size='2lg'
              src={invitation?.inviter?.profile_picture_url}
              alt={invitation?.inviter?.user_name}
              hasBorder
              className='my-5 md:mb-0'
            />
            <span className='md:ml-4 text-[18px] text-gray-700 md:text-left font-semibold'>
              {invitation?.inviter?.user_name} has invited you to join the{' '}
              {invitation?.workspace.company_name} team on SparkHub.
            </span>
          </div>
          <div className='py-4'>
            <span className=' text-[15px] text-gray-700'>
              SparkHub shows you who your customers are and makes it easy to
              communicate with them, personally, at scale-on your website,
              inside web and mobile apps, and by email.
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold text-[18px] text-gray-900'>
              What can you do with SparkHub:
            </span>
            <ul className='list-disc ml-6'>
              <li className='py-1 font-medium text-[16px] text-gray-800'>
                Capture and convert leads
              </li>
              <li className='py-1 font-medium text-[16px] text-gray-800'>
                Onboard and engage customers
              </li>
              <li className='py-1 font-medium text-[16px] text-gray-800'>
                Support and retain customers
              </li>
            </ul>
          </div>
          <div className='mt-4'>
            <Button text='Join your team' onClick={join_team} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default JoinTeam;
