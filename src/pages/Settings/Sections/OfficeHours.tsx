import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import Modal from '@/components/atoms/modal';
import Availability from '@/components/templates/Availability';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { AuthStore } from '@/state/AuthenticationStore';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import PageContainer from '../Components/PageContainer';

const OfficeHours = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { publish, get_widget_config } = useWidgetConfig();
  const handlePublish = () => {
    publish();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const workspace_name =
    AuthStore.user_workspace_info?.active_workspace?.workspace?.company_name;

  useEffect(() => {
    get_widget_config();
  }, []);

  if (WidgetConfigStore?.config?.fetching) {
    return (
      <div className='h-[calc(100vh-100px)] flex justify-center items-center'>
        <Spinner size={30} color={'#033EB5'} />
      </div>
    );
  }

  return (
    <PageContainer
      title={'Office hours'}
      groupName={workspace_name}
      className='max-h-[75vh] overflow-y-auto no-scrollbar px-11 py-[24px]'
    >
      <div className='flex flex-col'>
        <span className='text-[14px]'>
          Set up office hours for your workspace to manage customer expectations
          and internal workflows.
        </span>
        <div className='flex flex-col'>
          {/* <span className='font-bold text-lg  py-6 '>Default office hours</span>
          <span className='text-[15px]  pb-4 '>
            Conversations default to these hours unless you use assignment rules
            to direct them to a team with custom office hours.
          </span> */}
          {/* <div
            className='flex  items-center border border-border border-1 rounded-[7px] space-x-4 
             px-4 py-6 hover:border-secondary cursor-pointer'
            onClick={openModal}
          >
            <div>
              <BsClock className='w-[50px] h-[50px] text-secondary' />
            </div>
            <div className='flex flex-col'>
              <span className='font-bold 2xl:text-lg xl:text-md'>
                Weekdays 9am - 5pm
              </span>
              <span className='text-[12px] text-gray-400 2xl:mt-2 xl:mt-1'>
                {
                  AuthStore.user_workspace_info.active_workspace.workspace
                    .timezone
                }
              </span>
            </div>
          </div> */}
        </div>

        <Availability handlePublish={handlePublish} />
      </div>
      <Modal
        show={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title='Edit default office hours'
        className='z-[10000] inline-block py-6 my-8 max-h-[700px] w-[700px] 2xl:w-[700px] xl:w-[600px] no-scrollbar overflow-y-auto text-left align-middle transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <div className='flex flex-col px-4'>
          <div className='py-4 text-gray-500 2xl:text-[15px] xl:text-[12px]'>
            Hours are set in your workspace’s timezone,{' '}
            {AuthStore.user_workspace_info.active_workspace.workspace.timezone}.
            If you don’t specify hours here, we will default to an always-on
            (24/7) schedule.
          </div>
          <Availability handlePublish={handlePublish} />
        </div>
        <div className='border border-border border-b-0'></div>
        <div className='pt-4 px-4 flex flex-row-reverse'>
          <Button text='Save' type='button' disabled />

          <Button
            text='Cancel'
            onClick={closeModal}
            type='button'
            variant='outline'
            className='mr-4'
          />
        </div>
      </Modal>
    </PageContainer>
  );
};
export default observer(OfficeHours);
