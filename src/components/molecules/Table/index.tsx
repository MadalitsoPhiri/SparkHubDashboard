/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Button from '@/components/atoms/Button';
import EmptyList from '@/components/atoms/EmptyList';
import Search from '@/components/atoms/Search';
import Spinner from '@/components/atoms/Spinner';
import Text from '@/components/atoms/Text';
import ToolTip from '@/components/atoms/Tooltip';
import Modal from '@/components/atoms/modal';
import ConfirmationModal from '@/components/atoms/modal/ConfirmationModal';
import { Tab, TabPanel } from '@/components/molecules/Tab';
import { useContact } from '@/hooks/useContact';
import { useCustomField } from '@/hooks/useCustomField';
import { useList } from '@/hooks/useList';
import { ContactType } from '@/pages/Contacts';
import { contactStore } from '@/state/ContactStore';
import { listStore } from '@/state/ListStore';
import { CustomField } from '@/types/customField.types';
import { User } from '@/types/user.types';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { DropdownOption, DropdownPicker } from '../DropdownPicker';
import NewContact from '../NewContact';
import ProfileTab from '../ProfileTab';
import { Filter } from './filter';
import { TableListFilter } from './menu';
import { customStyles } from './styles';

type Callback = (contactId: string) => void;

const staticColumns = (cb: Callback) => [
  {
    id: 1,
    name: 'Name',
    dataKey: 'user_name',
    selector: (row: any) => row['user_name'],
    cell: (row: User) => {
      return (
        <div className='cursor-pointer py-1 w-full'>
          <ProfileTab
            name={row.user_name}
            imageURL={row?.profile_picture_url as string}
            onClick={() => cb(row._id as string)}
          />
        </div>
      );
    },
    sortable: true,
    omit: false,
  },
  {
    id: 2,
    name: 'Phone',
    dataKey: 'phone_number',
    selector: (row: any) => row['phone_number'],
    cell: (row: any) => {
      return (
        <div className='text-neutral-900 text-[14px]  font-medium leading-tight truncate'>
          {row.phone_number || 'unknown'}
        </div>
      );
    },
    sortable: true,
    omit: false,
  },
  {
    id: 3,
    name: 'Email',
    dataKey: 'email',
    selector: (row: any) => row['email'],
    cell: (row: any) => {
      return (
        <div className='text-neutral-900 text-[14px]  font-medium leading-tight truncate'>
          {row.email || 'unknown'}
        </div>
      );
    },
    sortable: true,
    omit: false,
  },
  {
    id: 4,
    name: 'Company',
    dataKey: 'company_name',
    selector: (row: any) => row['company_name'],
    cell: (row: any) => {
      return (
        <div className='text-neutral-900 text-[14px]  font-medium leading-tight truncate'>
          {row.company_name || 'unknown'}
        </div>
      );
    },
    sortable: true,
    omit: false,
  },
  {
    id: 5,
    name: 'City',
    dataKey: 'city',
    selector: (row: any) => row['city'],
    cell: (row: any) => {
      return (
        <div className='text-neutral-900 text-[14px]  font-medium leading-tight truncate'>
          {row.city || 'unknown'}
        </div>
      );
    },
    sortable: true,
    omit: false,
  },
  {
    id: 6,
    name: 'Created date',
    dataKey: 'createdAt',
    selector: (row: any) => row['createdAt'],
    cell: (row: any) => {
      return (
        <div className='text-neutral-900 text-[14px]  font-medium leading-tight truncate'>
          {new Date(row.createdAt).toDateString() || 'unknown'}
        </div>
      );
    },
    sortable: true,
    omit: false,
  },
  {
    id: 7,
    name: 'Last seen',
    dataKey: 'last_seen',
    selector: (row: any) => row['last_seen'],
    cell: (row: any) => {
      return (
        <div className='text-neutral-900 text-[14px]  font-medium leading-tight truncate'>
          {new Date(row.last_seen).toDateString() || 'unknown'}
        </div>
      );
    },
    sortable: true,
    omit: false,
  },
];

const Table: FC<{ title?: string; contactType: ContactType }> = ({
  title,
  contactType,
}) => {
  const {
    open,
    openImport,
    filteredData,
    setFilteredData,
    createContact,
    importContacts,
    closeModal,
    openModal,
    openModalImport,
    closeModalImport,
    getContacts,
    handleViewContact,
  } = useContact();
  const [value, setValue] = useState('');
  // const [listValue, setListValue] = useState('');
  const [numSelected, setNumSelected] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState<User[]>([]);
  const [openSMS, setOpenSMS] = useState(false);
  const [openDeleteList, setOpenDeleteList] = useState(false);
  const [columns, setColumns] = useState(() =>
    staticColumns(handleViewContact),
  );
  const [selectedList, setSelectedList] = useState<DropdownOption>();
  const { getCustomFields, customFields } = useCustomField();
  const { listId } = useParams();
  const [filteredContacts, setFilterContacts] = useState(0);
  const [filterApplied, setFilterApplied] = useState(false);
  const isTextareaEmpty = value.trim().length === 0;
  const {
    openAddList,
    open: isOpen,
    setOpen: setIsOpen,
    saveToList,
    closeAddListModal,
    openAddListModal,
    setOpenAddList,
    deleteList,
  } = useList();

  useEffect(() => {
    if (customFields.length) {
      const customColumnFields = customFields.map((customField, index) => {
        return {
          id: columns.length + (index + 1),
          name: customField.field,
          dataKey: customField.field,
          selector: (row: CustomField) =>
            row[customField.field as keyof CustomField],
          cell: (row: any) => {
            return (
              <div className='text-neutral-900 text-[14px]  font-medium leading-tight truncate'>
                {customField.field === 'select'
                  ? row[customField.field]
                  : row[customField.field] || 'unknown'}
              </div>
            );
          },
          sortable: true,
          omit: true,
        };
      });
      setColumns([...columns, ...customColumnFields]);
    }
  }, [customFields?.length]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedList(option);
    setIsOpen(false);
  };

  const closeSMSModal = () => {
    setOpenSMS(false);
  };
  const openSMSModal = () => {
    setOpenSMS(true);
  };
  const closeDeleteListModal = () => {
    setOpenDeleteList(false);
  };
  const openDeleteListModal = () => {
    setOpenDeleteList(true);
  };

  const handleOmitField = (_: any, name: string) => {
    setColumns(prevCol => {
      const newCol = prevCol.map(col => {
        if (col.name === name) {
          col.omit = !col.omit;
        }
        return col;
      });
      //TODO: send to the server to save
      return newCol;
    });
  };

  const handleSearch = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.value === '') {
      return setFilteredData(contactStore.contacts);
    }

    const fd = filteredData.filter(item => {
      return (
        item?.user_name?.toLowerCase().includes(target.value?.toLowerCase()) ||
        item?.email?.toLowerCase().includes(target.value?.toLowerCase())
      );
    });

    setFilteredData(fd);
  };

  const handleOnFilter = async (values: {
    field: string;
    operator: string;
    value: string;
  }) => {
    const encodedValue = encodeURIComponent(values.value);
    const searchQuery = `?key=${values.field}&operator=${values.operator}&value=${encodedValue}`;
    getContacts(searchQuery.toLowerCase());
    setFilterApplied(true);
  };

  const onSelectedRowsChange = React.useCallback((state: any) => {
    setNumSelected(state.selectedCount);
    setSelectedContacts(state.selectedRows);
  }, []);
  const cancelOnSelectedRowsChange = () => {
    setNumSelected(0);
    setSelectedContacts([]);
  };

  useEffect(() => {
    if (filterApplied) {
      setFilterContacts(contactStore.contacts.length);
    }
  }, [filterApplied, contactStore.contacts]);

  useEffect(() => {
    const filter = listId ? `?list=${listId}` : `?contactType=${contactType}`;
    getContacts(filter);
  }, [contactType, listId]);

  useEffect(() => {
    getCustomFields();
  }, []);

  useMemo(() => {
    setSelectedList({
      label: listStore.lists[0]?.name,
      value: listStore.lists[0]?._id,
    });
  }, [listStore.lists.length]);

  return useMemo(
    () => (
      <>
        {contactStore.fetchingContact ? (
          <div className='h-[80vh] flex justify-center bg-white rounded-[16px] m-6'>
            <Spinner color='blue' size={50} />
          </div>
        ) : (
          <div className='flex flex-col w-full h-screen p-[24px] overflow-y-auto no-scrollbar mb-14 z-0'>
            <div className='p-10 bg-white rounded-t-[16px] flex justify-between gap-5 items-center z-[9999] border border-b-0 border-border'>
              <div className='flex-1 flex items-center justify-between gap-5 '>
                <Text size='lg' className='font-[500]'>
                  {title}
                </Text>
                <Search
                  placeholder='Search Contacts'
                  onChange={handleSearch}
                  transparent
                  showCommand={false}
                />

                <ToolTip title='Coming soon' right={true}>
                  <div className='w-[350px]'>
                    <Tab onTabChange={() => null}>
                      <TabPanel title='Table View' disabled>
                        <p hidden>Content of Tab 1 goes here.</p>
                      </TabPanel>
                      <TabPanel title='Board View' disabled>
                        <p hidden>Content of Tab 2 goes here.</p>
                      </TabPanel>
                    </Tab>
                  </div>
                </ToolTip>
              </div>
              <div className='flex items-center gap-5 justify-between'>
                <div className='flex items-center gap-2 justify-between'>
                  <div className='h-[20px] w-[1px] bg-border'></div>
                  {listStore.lists.map(list => (
                    <div
                      key={list._id}
                      className='flex items-center gap-2 justify-between'
                    >
                      {listId == list._id && list.contact_ids.length === 0 && (
                        <div
                          onClick={openDeleteListModal}
                          className='h-7 px-3 bg-white rounded shadow border border-zinc-200 flex justify-center items-center cursor-pointer'
                        >
                          <MdDelete className='w-4 h-4 text-warning' />
                        </div>
                      )}
                    </div>
                  ))}

                  <TableListFilter
                    columns={columns}
                    customFields={customFields}
                    handleOmitField={handleOmitField}
                  />

                  <div className='z-[9999]'>
                    <Filter
                      onFilter={handleOnFilter}
                      count={filterApplied ? filteredContacts : 0}
                    />
                  </div>
                </div>
                <div className='h-[20px] w-[1px] bg-border'></div>

                <NewContact
                  open={open}
                  openImport={openImport}
                  handleCreateContact={createContact}
                  handleImportContact={importContacts}
                  openModal={openModal}
                  closeModal={closeModal}
                  openModalImport={openModalImport}
                  closeModalImport={closeModalImport}
                />
              </div>
            </div>

            <DataTable
              columns={columns}
              data={filteredData}
              fixedHeader
              customStyles={{
                ...customStyles,
              }}
              pagination
              paginationComponentOptions={{
                rowsPerPageText: 'Records per page:',
              }}
              selectableRows
              onSelectedRowsChange={onSelectedRowsChange}
              dense={true}
              sortIcon={
                <div className='flex items-center'>
                  <div className='absolute right-2'>
                    <Icon icon={Icons.arrowDown} />
                  </div>
                </div>
              }
              noDataComponent={
                <EmptyList
                  listName={title || ''}
                  title='There are no contacts in'
                  subTitle='Add contacts to see them in '
                  height='75vh'
                />
              }
            />

            {numSelected > 0 ? (
              <div className=' bg-white p-2 rounded-b-[16px] relative flex justify-center'>
                <div className=' absolute  top-[-20px]  h-14 p-3 bg-white  bg-opacity-30 backdrop-blur-[56px] rounded border border-border  justify-start items-center gap-4 inline-flex'>
                  <div className='justify-start items-center gap-2 flex'>
                    <div className='h-5 px-2 flex flex-col text-center justify-center  bg-secondary rounded'>
                      <span className='text-white text-sm font-medium leading-tight'>
                        {numSelected}
                      </span>
                    </div>
                    <Text size='sm'>selected</Text>
                  </div>
                  <Button
                    text='Save to list'
                    variant='outline'
                    onClick={openAddListModal}
                  />
                  <div className='w-px h-[27px] bg-neutral-200'></div>
                  <Button
                    text='Send SMS'
                    variant='outline'
                    onClick={openSMSModal}
                  />
                  <div className='w-px h-[27px] bg-neutral-200'></div>
                  <Button
                    text='Cancel'
                    variant='outline'
                    onClick={cancelOnSelectedRowsChange}
                  />
                </div>
              </div>
            ) : (
              <div className=' bg-white p-2 rounded-b-[16px]  flex justify-center border border-t-0 border-border'></div>
            )}

            {/* SEND SMS MODAL */}
            <Modal
              show={openSMS}
              openModal={() => setOpenSMS}
              closeModal={closeSMSModal}
              title='Send SMS'
              className='z-[10000] inline-block py-6 my-8 w-[440px]
             text-left align-center  transition-all transform bg-white shadow-xl rounded-md'
            >
              <div className='px-4'>
                <Text size='sm' color='text-gray-400 mt-6'>
                  Message
                </Text>
                <textarea
                  className='my-2 w-full outline-none text-md resize-none border border-border focus-within:border-secondary rounded-md p-2'
                  placeholder='Write a message...'
                  rows={2}
                  value={value}
                  onChange={handleChange}
                />
                <div className='flex justify-between items-center mt-1'>
                  <Button
                    size='sm'
                    text='Cancel'
                    onClick={closeSMSModal}
                    variant='outline'
                  />
                  <div className='flex space-x-2'>
                    <ToolTip title='Coming soon'>
                      <Icon icon={Icons.mic} color='#7E8B99' size={25} />
                    </ToolTip>

                    <ToolTip title='Coming soon'>
                      <Icon icon={Icons.emoji} color='#7E8B99' size={25} />
                    </ToolTip>

                    <ToolTip title='Coming soon'>
                      <Icon icon={Icons.attachment} color='#7E8B99' size={25} />
                    </ToolTip>
                    <ToolTip title='Coming soon'>
                      <div className='h-[32px] px-[14px] py-[8px] border border-border rounded-[4px] flex items-center justify-center cursor-pointer'>
                        <Icon icon={Icons.spark} color='#7E8B99' size={25} />
                      </div>
                    </ToolTip>

                    <Button
                      type='submit'
                      text='Send'
                      size='sm'
                      className='bg-secondary'
                      disabled={isTextareaEmpty}
                    />
                  </div>
                </div>
              </div>
            </Modal>

            {/* ADD TO LIST MODAL */}

            <Modal
              show={openAddList}
              openModal={() => setOpenAddList}
              closeModal={closeAddListModal}
              title='Save to list'
              className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[440px] text-left align-center  transition-all transform bg-white shadow-xl rounded-[7px]'
            >
              <div className='px-4'>
                <Text size='sm' color='text-gray-400 mt-6'>
                  Selected list
                </Text>
                <DropdownPicker
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  selected={selectedList?.label}
                  onSelect={handleOptionClick}
                  options={listStore.lists?.map(list => ({
                    label: list.name,
                    value: list._id,
                  }))}
                />

                <div className='mt-4 text-center flex justify-between space-x-4'>
                  <div className='flex flex-1'>
                    <Button
                      size='sm'
                      text='Cancel'
                      onClick={closeAddListModal}
                      variant='outline'
                      className='w-full'
                    />
                  </div>

                  <div className='flex flex-1'>
                    <Button
                      size='sm'
                      text='Save'
                      type='submit'
                      className='hover:bg-primary-medium w-full'
                      onClick={() =>
                        saveToList({
                          _id: selectedList?.value as string,
                          name: selectedList?.label as string,
                          contact_ids: selectedContacts?.map(
                            contact => contact._id as string,
                          ),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </Modal>
            {/* Delete list modal */}
            <ConfirmationModal
              show={openDeleteList}
              setShow={closeDeleteListModal}
              title='Delete List'
              content='Are you sure you want to delete this list?'
              onConfirm={() => {
                deleteList(listId as string);
                closeDeleteListModal();
              }}
            />
          </div>
        )}
      </>
    ),
    [
      columns,
      contactStore.contacts.length,
      numSelected,
      selectedContacts,
      openSMS,
      openAddList,
      value,
      selectedList,
      onSelectedRowsChange,
      cancelOnSelectedRowsChange,
    ],
  );
};
export default observer(Table);
