import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { SelectInput } from '@/components/atoms/SelectInput';
import ToolTip from '@/components/atoms/Tooltip';
import ConfirmationModal from '@/components/atoms/modal/ConfirmationModal';
import { deleteWorkspace, useWorkspace } from '@/hooks/useWorkspace';
import { AuthStore } from '@/state/AuthenticationStore';
import { workspaceStore } from '@/state/WorkSpaceStore';
import { BookOpenIcon, XCircleIcon } from '@heroicons/react/outline';
import { ArrowCircleUpIcon } from '@heroicons/react/solid';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import timezones from '../../../fixtures/timezones.json';
import PageContainer from '../Components/PageContainer';

const GeneralSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [timeZone, setTimeZone] = useState(
    () => AuthStore.user_workspace_info.active_workspace.workspace.timezone,
  );
  const { isLoading, updateWorkspace } = useWorkspace();

  const workspace_id =
    AuthStore.user_workspace_info?.active_workspace?.workspace?._id;
  const workspace_name =
    AuthStore.user_workspace_info?.active_workspace?.workspace?.company_name;
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = () => {
    updateWorkspace({
      workspace_name: text,
      timezone: timeZone,
    });
  };

  const handleDeleteWorkspace = () => {
    deleteWorkspace(workspace_id);
    closeModal();
    workspaceStore.setReset();
  };

  const handleSave = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setTimeZone(event.currentTarget.value);
    const { value } = event.currentTarget;
    updateWorkspace({
      timezone: value,
    });
  };

  useEffect(() => {
    if (AuthStore.user_workspace_info) {
      setText(workspace_name);
    }
  }, [AuthStore.user_workspace_info]);

  return (
    <PageContainer
      title={'General settings'}
      groupName={workspace_name}
      className={`max-h-[75vh] overflow-y-auto no-scrollbar px-11 w-full duration-500 ease-in-out`}
    >
      {/* Delete workspace */}
      <ConfirmationModal
        show={isOpen}
        setShow={closeModal}
        onConfirm={handleDeleteWorkspace}
        confirmText='Delete workspace'
        title={`Delete ${workspace_name} workspace`}
        content='Are you ABSOLUTELY sure you want to delete this workspace?'
      />
      <div>
        <div className='mb-4 mt-6'>
          <label
            htmlFor='search'
            className='block 2xl:text-[14px] xl:text-[12px] font-bold text-gray-500 py-2'
          >
            Name of your workspace
          </label>
          <div className='w-[50%]'>
            <Input
              value={text}
              placeholder='Workspace name'
              type='text'
              onChange={e => {
                setText(e.target.value);
              }}
            />
          </div>
        </div>
        {/* Time Zone Select Input */}
        <div className='my-4 w-[50%]'>
          <label
            htmlFor='location'
            className='block 2xl:text-[14px] xl:text-[12px] font-bold text-gray-500 '
          >
            Time zone
          </label>
          <SelectInput
            disabled={isLoading}
            options={timezones}
            value={timeZone}
            onChange={handleSave}
          />
        </div>
        <span className='2xl:text-[14px] xl:text-[12px] text-gray-500 py-2'>
          Defaults to the location of the teammate who set up this workspace.
          Changing it will affect time-dependent features across Sparky.
        </span>
        <div className='border border-b-0 2xl:mt-4 xl:mt-2'></div>
        {/* Company setting */}
        <div className='my-4'>
          <label
            htmlFor='location'
            className='block 2xl:text-[14px] xl:text-[12px] font-bold text-gray-500 py-2'
          >
            Companies
          </label>
          <div>
            <div className='flex space-x-2 py-1 items-center'>
              <ToolTip title='Coming soon'>
                <input
                  disabled
                  type='checkbox'
                  className='w-[20px] h-[20px] text-secondary border-gray-300 rounded'
                />
              </ToolTip>

              <span className='text-[14px]'>
                Enable company related features throughout Sparky (company
                profiles, company lists, etc.)
              </span>
            </div>
            <div className='flex space-x-2 py-1'>
              <span>
                <BookOpenIcon className='2xl:h-5 2xl:w-5 xl:w-4 xl:h-4 text-secondary ' />
              </span>
              <span className='2xl:text-[15px] xl:text-[12px] text-secondary  cursor-pointer hover:underline hover:decoration-solid'>
                How does the companies feature work?
              </span>
            </div>
          </div>
        </div>
        <div className='border border-b-0'></div>
        {/* Teams Testing */}
        <div className='my-4'>
          <div className='border border-1  rounded-md bg-opacity-[0.5] bg-gray-50 px-2'>
            <div className='flex flex-row 2xl:py-2 xl:py-1 justify-between'>
              <label
                htmlFor='workspace'
                className='block 2xl:text-[14px] xl:text-[12px] font-bold text-gray-500'
              >
                Test workspace
              </label>
              <span className='flex items-center space-x-2  text-secondary cursor-pointer'>
                <ArrowCircleUpIcon className='2xl:w-5 2xl:h-5 xl:w-4 xl:h-4' />{' '}
                <span className='2xl:text-[14px] xl:text-[12px]'>
                  Get feature
                </span>
              </span>
            </div>
            <div>
              <div className='flex space-x-2 py-1 items-center'>
                <ToolTip title='Coming soon'>
                  <input
                    disabled
                    type='checkbox'
                    className='h-[20px] w-[20px] text-secondary  border-gray-300 rounded'
                  />
                </ToolTip>
                <span className='text-[14px]'>
                  Enable a test workspace for {workspace_name}
                </span>
              </div>
              <div className='flex space-x-2 py-1'>
                <span>
                  <BookOpenIcon className='2xl:h-5 2xl:w-5 xl:h-4 xl:w-4 text-secondary ' />
                </span>
                <span className='2xl:text-[15px] xl:text-[12px] text-secondary  cursor-pointer hover:underline hover:decoration-solid'>
                  How to set up a test workspace
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='border border-b-0'></div>
        <div className='my-4'>
          <Button
            type='button'
            text='Save'
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit}
            className={`${
              'Trade Zones' === text
                ? 'bg-secondary bg-opacity-[0.5]'
                : 'bg-secondary '
            }`}
          />
        </div>
        <div className='border border-b-0'></div>
        <div className='my-4'>
          <label
            htmlFor='location'
            className='block 2xl:text-[14px] xl:text-[12px] font-bold text-gray-500 py-2'
          >
            Extreme measures
          </label>
          <Button
            type='button'
            text='Delete this workspace'
            LeftIcon={
              <XCircleIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
            }
            onClick={openModal}
            className=' shadow-sm font-medium rounded-md text-red-500 bg-warning disabled:bg-opacity-[0.4] hover:bg-warning/80 '
          />
        </div>
      </div>
    </PageContainer>
  );
};
export default observer(GeneralSettings);
