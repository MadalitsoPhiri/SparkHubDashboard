/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Modal from '@/components/atoms/modal';
import { NewContactForm } from '@/components/templates/forms/NewContactForm';
import { contactCsvData, contacts_menu } from '@/constants/index';
import { CreatePayload } from '@/hooks/useContact';
import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import UploadAndDragNDrop from '../UploadAndDragNDropFile';

type NewContactProps = {
  open: boolean;
  openImport: boolean;
  openModal: () => void;
  closeModal: () => void;
  openModalImport: () => void;
  closeModalImport: () => void;
  handleCreateContact: (data: CreatePayload) => void;
  handleImportContact: (data: File | null) => void;
};

const NewContact: FC<NewContactProps> = ({
  open,
  openImport,
  openModal,
  closeModal,
  openModalImport,
  closeModalImport,
  handleCreateContact,
  handleImportContact,
}) => {
  const handleOpen = (item: (typeof contacts_menu)[number]) => {
    item.id === 1 ? openModal() : item.id === 2 ? openModalImport() : null;
  };

  return (
    <div>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button
            as={Button}
            LeftIcon={
              <Icon
                icon='heroicons-solid:plus'
                color='#FFFFFF'
                className='w-[20px] h-[16px]'
              />
            }
            text='New Contact'
            type='button'
            className='w-[140px!important] flex justify-between items-center'
          />
        </div>

        <Transition
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            className='origin-top-right absolute right-0 mt-2 w-[180px] 
           rounded-[4px] shadow-lg bg-white ring-1 ring-black ring-opacity-5
           focus:outline-none  divide-y divide-border'
          >
            {contacts_menu.map(item => (
              <div className='py-1 text-[#222]' key={item.id}>
                {/*  */}
                <Menu.Item onClick={() => handleOpen(item)}>
                  <div
                    className={
                      'cursor-pointer group flex items-center px-2 py-2 space-x-1 leading-[20px] font-[500] hover:text-primary-medium'
                    }
                  >
                    {item.id === 1 ? (
                      <Icon
                        icon='heroicons:plus'
                        width={18}
                        height={18}
                        color='#00000080'
                      />
                    ) : (
                      <Icon
                        icon='clarity:import-line'
                        width={18}
                        height={18}
                        color='#00000080'
                      />
                    )}

                    <Text size='sm'>{item.title}</Text>
                  </div>
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>

      {/* Create new contact modal */}
      <Modal
        show={open}
        openModal={openModal}
        closeModal={closeModal}
        title='Create New Contact'
        className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[440px] text-left align-center  transition-all transform bg-white shadow-xl rounded-md'
      >
        <NewContactForm
          handleCreateContact={handleCreateContact}
          closeModal={closeModal}
        />
      </Modal>

      {/* Import contacts modal */}
      <Modal
        show={openImport}
        openModal={openModalImport}
        closeModal={closeModalImport}
        title='Import data into SparkHub'
        className='z-[10000] inline-block py-[24px] px-[2px] w-[100%] max-w-[440px] text-left align-center  transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <UploadAndDragNDrop
          handleImportContact={handleImportContact}
          closeModalImport={closeModalImport}
          csvData={contactCsvData}
        />
      </Modal>
    </div>
  );
};
export default observer(NewContact);
