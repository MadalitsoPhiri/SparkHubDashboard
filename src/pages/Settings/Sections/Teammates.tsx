import Search from '@/components/atoms/Search';
import { useTeammate } from '@/hooks/useTeammate';
import { AuthStore } from '@/state/AuthenticationStore';
import { teamMateStore } from '@/state/TeammateStore';
// import { DownloadIcon } from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import FilterMenu from '../Components/FilterMenu';
import InvitesTable from '../Components/InvitesTable';
import SecondPageContainer from '../Components/SecondPageContainer';
import TeammatesTable from '../Components/TeammatesTable';

const Teammates = () => {
  const [toggle, setToggle] = useState(1);
  const [search, setSearch] = useState('');
  const {
    getTeamMates,
    getInvites,
    resendInvite,
    deleteInvite,
    deleteTeamMate,
  } = useTeammate();
  const fetchingInvites = teamMateStore.fetchingInvites;
  const fetchingTeamMates = teamMateStore.fetchingTeamMates;
  const invitations = teamMateStore.invites;
  const team_mates = teamMateStore.teamMates;

  const navigate = useNavigate();

  const handleSubmit = (e: any, search: string) => {
    e.preventDefault();
    setSearch(search); // remove search from the input
  };

  const toggleTab = (index: number) => {
    setToggle(index);
  };
  const workspace_name =
    AuthStore.user_workspace_info?.active_workspace?.workspace?.company_name;

  useEffect(() => {
    getTeamMates();
    getInvites();
  }, []);

  return (
    <SecondPageContainer
      title={'Teammates'}
      groupName={workspace_name}
      link
      linkTitle='How to manage teammates'
      btnTile='Add new teammates'
      handleClick={() => navigate('invites')}
      className='max-h-[75vh] overflow-y-auto no-scrollbar px-11 py-[24px]'
    >
      <div>
        <div className='flex space-x-8'>
          <span
            className={`text-[14px] font-medium text-center transition duration-500 ease-in-out cursor-pointer ${
              toggle === 1
                ? 'border-b-[2px] border-secondary text-secondary'
                : 'text-gray-800 hover:text-secondary'
            }`}
            onClick={() => toggleTab(1)}
          >
            Teammates ({team_mates?.length})
          </span>
          <span
            className={`text-[14px] font-medium text-center transition duration-500 ease-in-out cursor-pointer ${
              toggle === 2
                ? 'border-b-[2px] border-secondary text-secondary'
                : 'text-gray-800 hover:text-secondary'
            }`}
            onClick={() => toggleTab(2)}
          >
            Invites sent ({invitations?.length})
          </span>
        </div>
        <div>
          {toggle === 1 && (
            <div className='flex flex-col'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center 2xl:space-x-12 xl:space-x-10 my-4 '>
                  {/* <span className='text-md font-semibold'>
                    {team_mates?.length} teammates
                  </span> */}
                  {/* <button
                    type='button'
                    className='inline-flex items-center 2xl:px-4 2xl:py-2 xl:px-2 xl:py-1 border border-transparent shadow-sm 2xl:text-[14px] xl:text-[12px] 
                                font-medium rounded-md text-black bg-gray-100 hover:text-candy_yellow hover:bg-candy_yellow_hover focus:outline-none '
                  >
                    <DownloadIcon
                      className='-ml-1 mr-2 2xl:h-5 2xl:w-5 xl:w-4 xl:h-4'
                      aria-hidden='true'
                    />
                    Export CSV
                  </button> */}
                </div>
                <div className='flex flex-row items-center space-x-4'>
                  {/* <span className='text-gray-500 2xl:text-[15px] xl:text-[12px]'>
                    Filter by
                  </span>
                  <FilterMenu /> */}
                  <div className='flex relative 2xl:text-[14px] xl:text-[13px] rounded-md items-center border border-gray-200'>
                    <Search
                      value={search}
                      showCommand={false}
                      transparent={true}
                      placeholder='Search teammates'
                      type='search'
                      onChange={e => {
                        setSearch(e.target.value);
                      }}
                      onKeyDown={e => {
                        if (e.code === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (search.trim() !== '') {
                            handleSubmit(e, search);
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <TeammatesTable
                team_mates={team_mates}
                loading={fetchingTeamMates}
                deleteTeammate={deleteTeamMate}
              />
            </div>
          )}
          {toggle === 2 && (
            <div>
              <InvitesTable
                invitations={invitations}
                loading={fetchingInvites}
                handleResendVerificationEmail={resendInvite}
                deleteInvite={deleteInvite}
              />
            </div>
          )}
        </div>
      </div>
    </SecondPageContainer>
  );
};
export default observer(Teammates);
