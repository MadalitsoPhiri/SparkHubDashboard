import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Spinner from '@/components/atoms/Spinner';
import Text from '@/components/atoms/Text';
import Modal from '@/components/atoms/modal';
import { AuthStore } from '@/state/AuthenticationStore';
import { TeamMate } from '@/types/teammate.types';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import TableMenu from './TableMenu';

type TeammatesTableProps = {
  team_mates: TeamMate[];
  loading: boolean;
  deleteTeammate: (userId: string) => void;
};

const TeammatesTable: FC<TeammatesTableProps> = ({
  team_mates,
  loading,
  deleteTeammate,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [value, setValue] = useState('');
  const [selectedTeammate, setSelectedTeammate] = useState<TeamMate | null>();

  const workspaceCreatorId =
    AuthStore?.user_workspace_info.active_workspace.workspace.created_by._id;

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  return (
    <div className='mb-[90px] w-full'>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            {loading ? (
              <div className='h-full w-full flex flex-row justify-center items-center'>
                <Spinner size={40} color={'#033EB5'} />
              </div>
            ) : (
              <div className='overflow-hidden'>
                <table className='min-w-full'>
                  <thead>
                    <th
                      scope='col'
                      className='2xl:py-3.5 xl:py-2.5 pl-4 pr-3 text-left 2xl:text-[14px] xl:text-[14px] font-semibold text-gray-400'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-3 2xl:py-3.5 xl:py-2.5 text-left 2xl:text-[14px] xl:text-[14px] font-semibold text-gray-400'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-3 2xl:py-3.5 xl:py-2.5 text-left 2xl:text-[14px] xl:text-[14px] font-semibold text-gray-400'
                    >
                      Teams
                    </th>
                    <th
                      scope='col'
                      className='px-3 2xl:py-3.5 xl:py-2.5 text-left 2xl:text-[14px] xl:text-[14px] font-semibold text-gray-400'
                    >
                      Permission
                    </th>
                    <th
                      scope='col'
                      className='px-3 2xl:py-3.5 xl:py-2.5 text-left 2xl:text-[14px] xl:text-[14px] font-semibold text-gray-400'
                    >
                      2fa
                    </th>
                    <th
                      scope='col'
                      className='relative 2xl:py-3.5 xl:py-2.5 pl-3 pr-4'
                    >
                      <span className='sr-only'>Edit</span>
                    </th>
                  </thead>

                  <tbody>
                    {team_mates?.map(team_mate => (
                      <tr
                        key={team_mate.user?.email}
                        className='border-b-[0.5px]'
                        onClick={() => setSelectedTeammate(team_mate)}
                      >
                        <td className='whitespace-nowrap p-3'>
                          <div className='flex items-center'>
                            <Avatar
                              alt={team_mate?.user?.user_name}
                              src=''
                              size='md'
                            />
                            <div className='ml-4'>
                              <div className='font-medium  text-[14px] text-gray-900'>
                                {team_mate?.user?.user_name}
                              </div>
                              <div className='text-gray-500 text-[14px]  '>
                                {team_mate?.user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='whitespace-nowrap  px-3 2xl:py-4 xl:py-3 2xl:text-[14px] xl:text-[14px] text-gray-500'>
                          <TableMenu user={team_mate?.user} />
                        </td>
                        <td className='whitespace-nowrap px-3 2xl:py-4 xl:py-3 2xl:text-[14px] xl:text-[14px] text-gray-800'>
                          {/* {team_mate?.teams} */}
                        </td>
                        <td className='whitespace-nowrap px-3 2xl:py-4 xl:py-3 2xl:text-[14px] xl:text-[14px] text-gray-500'>
                          {/* {team_mate?.permission} */}
                        </td>
                        <td className='whitespace-nowrap px-3 2xl:py-4 xl:py-3 2xl:text-[14px] xl:text-[14px] text-gray-800'>
                          {/* {team_mate?.authenication} */}
                        </td>
                        <td className='whitespace-nowrap 2xl:py-4 xl:py-3 pl-3 pr-4 text-right 2xl:text-[14px] xl:text-[10px] font-medium'>
                          {team_mate?.user?._id !== workspaceCreatorId && (
                            <button
                              className={`2xl:text-[14px] xl:text-[12px] text-red-500`}
                              onClick={openDeleteModal}
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={deleteModal}
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
        title='Delete Teammate'
        className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[440px] text-left align-center  transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <div className='px-4 mt-[10px]'>
          <Text size='sm' color='#656971'>
            You are about to delete this list. This action cannot be undone. if
            you are sure you want to do this, type DELETE in the box below
          </Text>
          <br />
          <Input
            placeholder='Enter DELETE to confirm'
            onChange={e => {
              const inputValue = e.target.value;
              setValue(inputValue);
            }}
          />
          <div className='mt-4 text-center flex justify-between space-x-4'>
            <div className='flex flex-1'>
              <Button
                size='sm'
                text='Cancel'
                variant='outline'
                onClick={() => {
                  closeDeleteModal();
                }}
                className='w-full'
              />
            </div>

            <div className='flex flex-1'>
              <Button
                size='sm'
                text='Delete'
                type='submit'
                className='bg-warning/90 hover:bg-warning/80 transition-colors w-full'
                disabled={value !== 'DELETE'}
                onClick={() => {
                  closeDeleteModal();
                  deleteTeammate(selectedTeammate?.user?._id as string);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default observer(TeammatesTable);
