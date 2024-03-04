import Button from '@/components/atoms/Button';
import { AuthStore } from '@/state/AuthenticationStore';
import { BookOpenIcon, PlusIcon } from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { FiKey } from 'react-icons/fi';
import { RiTeamFill } from 'react-icons/ri';
import PageContainer from '../Components/PageContainer';
import TeamAccordion from '../Components/TeamAccordion';

const TeamsAndRoles = () => {
  const [toggle, setToggle] = useState(1);

  const toggleTab = (index: number) => {
    setToggle(index);
  };
  const workspace_name =
    AuthStore.user_workspace_info?.active_workspace?.workspace?.company_name;
  return (
    <PageContainer
      title={`${toggle === 1 ? 'Teams' : 'Roles'}`}
      btnTile={`${toggle === 1 ? 'New team' : 'New role'}`}
      link={false}
      handleClick={''}
      icon={toggle === 1 ? <PlusIcon className='w-[15px] h-[15px] mx-1' /> : ''}
      groupName={workspace_name}
      className='max-h-[75vh] overflow-y-auto no-scrollbar px-11 py-[24px]'
    >
      <div>
        <div className='flex space-x-8'>
          <span
            className={`2xl:text-[14px] xl:text-[12px] font-medium text-center transition duration-500 ease-in-out cursor-pointer ${
              toggle === 1
                ? 'border-b-[2px] border-secondary text-secondary'
                : 'text-gray-800 hover:text-secondary'
            }`}
            onClick={() => toggleTab(1)}
          >
            Teams
          </span>
          <span
            className={`2xl:text-[14px] xl:text-[12px] font-medium text-center transition duration-500 ease-in-out cursor-pointer ${
              toggle === 2
                ? 'border-b-[2px] border-secondary text-secondary'
                : 'text-gray-800 hover:text-secondary'
            }`}
            onClick={() => toggleTab(2)}
          >
            Roles
          </span>
        </div>
        <div>
          {toggle === 1 && (
            <div className='flex flex-col'>
              <div className='flex flex-col mt-10 mb-10 p-8 bg-gray-100'>
                <span className='2xl:py-2  xl:py-1 font-bold 2xl:text-lg xl:text-md'>
                  Teams
                </span>
                <div className='2xl:py-2 xl:py-1 2xl:text-[15px] xl:text-[12px]'>
                  Teams can help categorize conversations and give groups of
                  teammates shared ownership over them.
                </div>
                <div className='flex space-x-2 py-1 items-center'>
                  <span>
                    <BookOpenIcon className='2xl:h-5 2xl:w-5 xl:w-4 xl:h-4 text-secondary' />
                  </span>
                  <span className='2xl:text-[15px] xl:text-[12px] text-secondary cursor-pointer hover:underline hover:decoration-solid'>
                    Learn more about teams
                  </span>
                </div>
              </div>
              {/* display team content */}
              <TeamAccordion count={'0'} />
              <div className='flex flex-col justify-center items-center border border-1 rounded-[7px] py-10 mt-4 mb-8 border-border'>
                <div>
                  <RiTeamFill className='w-[50px] h-[50px] text-gray-400' />
                </div>
                <span className='font-bold 2xl:text-lg xl:text-md 2xl:py-4 xl:py-3 text-gray-400'>
                  No teams yet
                </span>
                <span className='2xl:text-[13px]  xl:text-[10px] text-gray-400'>
                  You haven’t created any teams yet
                </span>
                <span className='2xl:text-[15px] xl:text-[12px] text-secondary hover:text-gray-400 underline underline-solid cursor-pointer'>
                  Learn more about working in teams
                </span>
              </div>
            </div>
          )}
          {toggle === 2 && (
            <div className='flex flex-col'>
              <div className='flex flex-col mt-10 p-8 bg-gray-100'>
                <span className='2xl:py-2 xl:py-1 xl:text-md  font-bold 2xl:text-lg'>
                  Roles
                </span>
                <div className='2xl:py-2 xl:py-1 xl:text-[12px] 2xl:text-[15px]'>
                  Roles help set up permissions in a consistent way, which helps
                  keep your workspace secure and compliant.
                </div>
                <div className='flex space-x-2 py-1 items-center'>
                  <span>
                    <BookOpenIcon className='2xl:h-5 2xl:w-5 xl:w-4 xl:h-4 text-secondary' />
                  </span>
                  <span className='2xl:text-[15px] xl:text-[12px] text-secondary cursor-pointer hover:underline hover:decoration-solid'>
                    Learn more about roles
                  </span>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center 2xl:py-10 xl:py-8 2xl:mt-6 xl:mt-4'>
                <div>
                  <FiKey className='w-[50px] h-[50px] text-gray-400' />
                </div>
                <span className='font-bold 2xl:text-lg xl:text-md 2xl:py-4 xl:py-3 text-gray-400'>
                  You have not created any roles yet
                </span>
                <span className='2xl:text-[15px] xl:text-[12px] text-gray-400 2xl:mb-4 xl:mb-3'>
                  Create your first role to get started
                </span>
                <Button text='New role' type='button' />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};
export default observer(TeamsAndRoles);
