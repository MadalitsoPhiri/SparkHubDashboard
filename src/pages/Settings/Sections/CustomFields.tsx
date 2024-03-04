import Input from '@/components/atoms/Input';
import Modal from '@/components/atoms/modal';
import CustomFieldForm from '@/components/templates/forms/CustomFieldForm';
import { useCustomField } from '@/hooks/useCustomField';
import { AuthStore } from '@/state/AuthenticationStore';
import { customFieldStore } from '@/state/CustomFieldStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import CustomFieldsTable from '../Components/CustomFieldTable';
import SecondPageContainer from '../Components/SecondPageContainer';

const customFieldType = [
  {
    _id: 1,
    type: 'number',
  },
  {
    _id: 2,
    type: 'text',
  },

  {
    _id: 4,
    type: 'url',
  },
  {
    _id: 5,
    type: 'date',
  },
  {
    _id: 6,
    type: 'checkbox',
  },
  {
    _id: 7,
    type: 'select',
  },
];

const CustomFields = () => {
  const [toggle, setToggle] = useState(1);
  const [fields, setFields] = useState<Map<string, string>>(
    new Map([[uuid(), '']]),
  );

  const handleAddValue = () => {
    setFields(prev => new Map([...prev, [uuid(), '']]));
  };

  const {
    open,
    customFields,
    setCustomFields,
    openModal,
    closeModal,
    createCustomField,
    getCustomFields,
  } = useCustomField({
    resetOptionFields: () => setFields(new Map([[uuid(), '']])),
  });
  const isLoading = false;

  const handleSearch = (e: any) => {
    e.preventDefault();
    const search = e.target.value.toLowerCase();
    if (search === '') {
      setCustomFields(customFieldStore.customFields ?? []);
      return;
    }

    const filteredFields = customFields.filter(customField => {
      const field = customField.field.toLowerCase();
      return field.includes(search.toLowerCase()) || field.startsWith(search);
    });

    setCustomFields(filteredFields);
  };

  const toggleTab = (index: number) => {
    setToggle(index);
  };

  useEffect(() => {
    getCustomFields();
  }, [customFieldStore?.customFields?.length]);

  if (isLoading) return <div>Loading...</div>;
  const workspace_name =
    AuthStore.user_workspace_info?.active_workspace?.workspace?.company_name;

  return (
    <SecondPageContainer
      title={'Custom Fields'}
      groupName={workspace_name}
      customFieldScreen
      link
      btnTile='Add Custom Field'
      handleClick={openModal}
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
            Contact
          </span>
        </div>
        <div>
          {toggle === 1 && (
            <div className='flex flex-col'>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center 2xl:space-x-12 xl:space-x-10 my-4 '>
                  <span className='text-md'>
                    {customFields?.length} Custom Fields
                  </span>
                </div>
                <div className='flex flex-row items-center space-x-4'>
                  <div className='flex relative 2xl:text-[14px] xl:text-[13px] rounded-md items-center border border-gray-200'>
                    <Input
                      placeholder='Search By Field'
                      type='search'
                      onKeyDown={e => {
                        if (e.code === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSearch(e);
                        }
                      }}
                      onInput={handleSearch}
                    />
                  </div>
                </div>
              </div>
              <CustomFieldsTable data={customFields} />
            </div>
          )}
        </div>
      </div>
      <Modal
        openModal={openModal}
        closeModal={closeModal}
        show={open}
        title='Create Custom Field'
        className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[500px] overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <CustomFieldForm
          customFieldType={customFieldType}
          handleAddValue={handleAddValue}
          fields={fields}
          setFields={setFields}
          handleSubmit={createCustomField}
        />
      </Modal>
    </SecondPageContainer>
  );
};
export default observer(CustomFields);
