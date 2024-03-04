import { observer } from 'mobx-react-lite';
import PageContainer from '../Components/PageContainer';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { AuthStore } from '@/state/AuthenticationStore';

const BlockedPeople = () => {
  const workspace_name =
    AuthStore.user_workspace_info?.active_workspace?.workspace?.company_name;
  return (
    <PageContainer
      title={'Blocked people'}
      groupName={workspace_name}
      className='max-h-[75vh] overflow-y-auto no-scrollbar px-11'
    >
      <div className='flex flex-col justify-center items-center py-[24px]'>
        <div className='flex flex-col justify-center items-center h-1/2'>
          <div>
            <MdOutlinePeopleAlt className='w-[50px] h-[50px] text-gray-500' />
          </div>
          <div className='font-bold 2xl:text-lg xl:text-md 2xl:py-4 xl:py-2 text-gray-500'>
            No blocked people
          </div>
          <div className='2xl:text-[15px] xl:text-[12px] text-gray-400'>
            To block a person from sending messages, click the block button at
            the dropdown next to a person’s profile.
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default observer(BlockedPeople);
