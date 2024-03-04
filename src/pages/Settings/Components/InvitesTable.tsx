import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import Modal from '@/components/atoms/modal';
import { teamMateStore } from '@/state/TeammateStore';
import { Invitation } from '@/types/teammate.types';
import { User } from '@/types/user.types';
import { getInitialsFromName } from '@/utils/index';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

type InvitationTableProps = {
  invitations: Invitation[];
  loading: boolean;
  handleResendVerificationEmail?: (email: string) => void;
  deleteInvite: (inviteId: string) => void;
};

const InvitesTable: FC<InvitationTableProps> = ({
  invitations,
  loading,
  handleResendVerificationEmail,
  deleteInvite,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedInvitation, setSelectedInvitation] =
    useState<Invitation | null>();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

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
              <div className='min-w-full flex flex-row justify-center items-center'>
                <Spinner size={40} color={'#033EB5'} />
              </div>
            ) : (
              <div className='overflow-hidden'>
                <table className='min-w-full'>
                  <thead className='text-md'>
                    <tr>
                      <th
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left font-semibold text-gray-400 sm:pl-6'
                      >
                        Name
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left font-semibold text-gray-400'
                      >
                        Status
                      </th>
                      <th
                        scope='col'
                        className='px-3 py-3.5 text-left font-semibold text-gray-400'
                      >
                        Teams
                      </th>

                      <th
                        scope='col'
                        className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                      >
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className=''>
                    {invitations?.map(person => (
                      <tr
                        key={person?.email}
                        className='border border-r-0 border-l-0   border-gray-200 text-md'
                        onClick={() => setSelectedInvitation(person)}
                      >
                        <td className='whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6'>
                          <div className='flex items-center'>
                            <div className='shrink-0 mr-2 mt-4'>
                              <div
                                className={`rounded-full bg-[#6652A9] flex flex-row justify-center items-center 2xl:h-10 2xl:w-10   xl:w-8 xl:h-8 flex-shrink-0   `}
                              >
                                <p className='font-medium text-white'>
                                  {getInitialsFromName(person?.email)}
                                </p>
                              </div>
                            </div>
                            <div className='ml-4'>
                              <div className='font-medium text-gray-900'>
                                {person?.email}
                              </div>
                              <div className='text-gray-500'>
                                {person.status}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-3 py-4 text-gray-500 '>
                          {person?.status}
                        </td>
                        <td className='whitespace-nowrap font-bold px-3 py-4 2xl:text-[14px] xl:text-[10] text-gray-200'>
                          {person?.teams}
                        </td>
                        <td className='relative whitespace-nowrap py-4  pl-3 pr-4 text-right font-medium sm:pr-6'>
                          <div className='flex gap-3 justify-end'>
                            <button
                              type='button'
                              onClick={openDeleteModal}
                              className={` text-red-500`}
                            >
                              Delete
                            </button>
                            {person?.status === 'PENDING' && (
                              <button
                                type='button'
                                onClick={openModal}
                                className={` text-secondary`}
                              >
                                Resend
                              </button>
                            )}
                          </div>
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
        show={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        title='Are you sure you want to resend '
        className='inline-block py-6 my-8 w-[500px] overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <div className='flex flex-col px-4'>
          <div className='py-4 text-gray-500 2xl:text-[15px] xl:text-[12px]'>
            {'By clicking "Confirm" we will send an email to'}{' '}
            {/* <span className='font-bold'>{selectedTeamMate?.user_name}</span> at{' '} */}
            <span className='font-bold'>{selectedInvitation?.email}</span> to
            verify their email address.
          </div>
        </div>

        <div className='border border-b-0'></div>
        <div className='pt-4 px-4 flex gap-3 flex-row-reverse'>
          <Button
            type='button'
            text='Confirm'
            size='sm'
            loading={teamMateStore.sendingInvite}
            onClick={() => {
              handleResendVerificationEmail?.(
                selectedInvitation?.email as string,
              );
            }}
          />

          <Button
            onClick={closeModal}
            type='button'
            text='Cancel'
            size='sm'
            variant='outline'
          />
        </div>
      </Modal>

      <Modal
        show={deleteModal}
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
        title='Are you sure you want to delete this teammate?'
        className='inline-block py-6 my-8 w-[500px] overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <div className='flex flex-col px-4'>
          <div className='py-4 text-gray-500 2xl:text-[15px] xl:text-[12px]'>
            {'By clicking "Confirm"'}{' '}
            <span className='font-bold'>
              {(selectedInvitation?.inviter as User)?.user_name}
            </span>{' '}
            will be removed from the workspace and will no longer have access to
            any data
          </div>
        </div>

        <div className='border border-b-0'></div>
        <div className='pt-4 px-4 flex gap-3 flex-row-reverse'>
          <Button
            type='button'
            text='Confirm'
            size='sm'
            loading={teamMateStore.sendingInvite}
            onClick={() => {
              deleteInvite(selectedInvitation?._id as string);
              closeDeleteModal();
            }}
          />

          <Button
            onClick={closeDeleteModal}
            type='button'
            text='Cancel'
            size='sm'
            variant='outline'
          />
        </div>
      </Modal>
    </div>
  );
};
export default observer(InvitesTable);
