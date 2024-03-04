import Spinner from '@/components/atoms/Spinner';
import { useTeammate } from '@/hooks/useTeammate';
import { teamMateStore } from '@/state/TeammateStore';
import { Switch } from '@headlessui/react';
import { observer } from 'mobx-react-lite';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubRouteContainer from '../Components/SubRouteContainer';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const ToggleSwitch = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        'relative inline-flex bg-secondary p-1 flex-shrink-0 2xl:h-[28px] 2xl:w-14  xl:w-12 xl:h-[24px] rounded-[4px] border-transparent  cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ',
      )}
    >
      <span className='sr-only'>On</span>
      <span
        className={classNames(
          enabled
            ? '2xl:translate-x-6 xl:translate-x-5 translate-x-5'
            : 'translate-x-0',
          'pointer-events-none relative inline-block h-full w-[50%] rounded-[3px] bg-white transform ring-0 transition ease-in-out duration-200',
        )}
      >
        <span
          className={classNames(
            enabled
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
          )}
          aria-hidden='true'
        ></span>
        <span
          className={classNames(
            enabled
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
          )}
          aria-hidden='true'
        ></span>
      </span>
      <span
        className={` font-bold 2xl:text-[13px] xl:text-[10px] text-white absolute left-1`}
      >
        On
      </span>
      <span
        className={` font-bold 2xl:text-[13px] xl:text-[10px] text-white mx-1`}
      >
        Off
      </span>
    </Switch>
  );
};

const permissions_data = [
  {
    permissions_name: 'Settings',
    data: [
      {
        name: 'Can manage general and security settings',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage teammates, seats and permissions',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can change status',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage Widget settings',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage Billing settings',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage Outbound settings',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can edit Default sender address',
        switch: <ToggleSwitch />,
      },
    ],
  },
  {
    permissions_name: 'Data and security',
    data: [
      {
        name: 'Can manage workspace data',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can access people, companies, and account lists',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can access lead and user profile pages',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can export Lead, User, Company data',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can import leads and users',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage tags',
        switch: <ToggleSwitch />,
      },
    ],
  },
  {
    permissions_name: 'Apps and Integrations',
    data: [
      {
        name: 'Can access Developer Hub',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can install, configure and delete apps',
        switch: <ToggleSwitch />,
      },
    ],
  },
  {
    permissions_name: 'Articles',
    data: [
      {
        name: 'Can manage Articles',
        switch: <ToggleSwitch />,
      },
    ],
  },
  {
    permissions_name: 'Automation',
    data: [
      {
        name: 'Can manage Widget settings and Inbound Bots',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage Outbound Custom Bots',
        switch: <ToggleSwitch />,
      },
    ],
  },
  {
    permissions_name: 'Outbound',
    data: [
      {
        name: 'Can bulk message visitors, leads and users',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can publish News',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can send Outbound emails from custom addresses',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can export Outbound data',
        switch: <ToggleSwitch />,
      },
    ],
  },
  {
    permissions_name: 'Inbox',
    data: [
      {
        name: 'Can reassign conversations and edit lead or user ownership',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can export conversation transcripts',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can delete replies and notes from a conversation',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage shared Macros',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage Views',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage Rules',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage Balanced assignment and Workload management',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can manage Round Robin assignment',
        switch: <ToggleSwitch />,
      },
    ],
  },
  {
    permissions_name: 'Reports',
    data: [
      {
        name: 'Can access Reports',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can share Reports',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can export CSV',
        switch: <ToggleSwitch />,
      },
    ],
  },
  {
    permissions_name: 'Add-ons',
    data: [
      {
        name: 'Can set Product Tours and Tooltips live',
        switch: <ToggleSwitch />,
      },
      {
        name: 'Can set Surveys live',
        switch: <ToggleSwitch />,
      },
    ],
  },
];

const Permissions = () => {
  const navigate = useNavigate();
  const sending_invite = false;
  const { sendTeamMateInvite } = useTeammate();
  const emails = teamMateStore.emailsToInvite;
  const handleSendInvitation = () => {
    sendTeamMateInvite(emails);
  };

  return (
    <SubRouteContainer
      className='max-h-[75vh] overflow-y-auto no-scrollbar px-8 w-full duration-500 ease-in-out'
      headerTitle='Set permissions'
      btnTitle='Send invitation'
      handleBack={() => navigate(-2)}
      loading={sending_invite}
      handleClick={handleSendInvitation}
    >
      {!sending_invite ? (
        <div className='relative bg-[#fcf9fe] border border-[#f2e9fe] rounded-[3px] p-[8px] pb-10 mt-[32px]'>
          <div className='mb-4'>
            <span className='font-bold text-[#222] text-[16px] leading-[24px]'>
              Permissions
            </span>
          </div>
          {/* Conversation access */}
          <div>
            <div className='py-2'>
              <span className='font-semibold text-[14px] leading-[20px] text-[#222]'>
                Conversation access
              </span>
            </div>
            <div className='border-y w-full p-3 flex'>
              <div className='mr-20'>
                <span className='font-light text-[#222] text-[14px]'>
                  Can access
                </span>
              </div>
              <div>
                <div className='flex items-center py-1'>
                  <input type='radio' name='' id='' />
                  <span className='font-light text-[#222] text-[14px] ml-2'>
                    All conversations
                  </span>
                </div>
                <div className='flex items-center py-1'>
                  <input type='radio' name='' id='' />
                  <span className='font-light text-[#222] text-[14px] ml-2'>
                    Conversations assigned to them only
                  </span>
                </div>
                <div className='flex items-center py-1'>
                  <input type='radio' name='' id='' />
                  <span className='font-light text-[#222] text-[14px] ml-2'>
                    Conversations assigned to their teams only
                  </span>
                </div>
                <div className='flex items-center py-1'>
                  <input type='radio' name='' id='' />
                  <span className='font-light text-[#222] text-[14px] ml-2'>
                    All conversations except assigned to
                  </span>
                </div>
              </div>
            </div>
          </div>

          {permissions_data.map((permissions, index) => (
            <Fragment key={index}>
              <div className='pt-5 pb-1 border-b'>
                <span className='font-semibold text-[14px] leading-[20px] text-[#222]'>
                  {permissions.permissions_name}
                </span>
              </div>
              {permissions.data.map((permission, index) => (
                <div
                  className='border-b flex justify-between items-center p-2'
                  key={index}
                >
                  <span className='text-[14px] text-[#222] font-light '>
                    {permission.name}
                  </span>
                  <div>{permission.switch}</div>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      ) : (
        <div className='justify-center items-center flex flex-row h-96  w-full '>
          <Spinner size={40} color={'#6652A9'} />
        </div>
      )}
    </SubRouteContainer>
  );
};
export default observer(Permissions);
