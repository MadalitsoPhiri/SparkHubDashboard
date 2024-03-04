import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Search from '@/components/atoms/Search';
import { CustomField } from '@/types/customField.types';
import { Menu, Transition } from '@headlessui/react';
import { CubeIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useMemo, useState } from 'react';

const _fields = [
  {
    id: 1,
    name: 'Name',
    value: 'user_name',
    omit: false,
    allowed_operators: [1, 2, 3],
  },
  {
    id: 2,
    name: 'Phone',
    value: 'phone_number',
    omit: false,
    allowed_operators: [1, 2, 3],
  },
  {
    id: 3,
    name: 'Email',
    value: 'email',
    omit: false,
    allowed_operators: [1, 2, 3],
  },
  {
    id: 4,
    name: 'Company',
    value: 'company_name',
    omit: false,
    allowed_operators: [1, 2, 3],
  },
  {
    id: 5,
    name: 'Created date',
    value: 'created_date',
    omit: false,
    allowed_operators: [1, 2, 3],
  },
  {
    id: 6,
    name: 'Last seen',
    value: 'last_seen',
    omit: false,
    allowed_operators: [1, 2, 3],
  },
  {
    id: 7,
    name: 'City',
    value: 'city',
    omit: false,
    allowed_operators: [1, 2, 3],
  },
];

export type Field = (typeof _fields)[number];

interface TableListFilterProps {
  handleOmitField: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
  customFields: CustomField[];
}

export const TableListFilter: React.FC<TableListFilterProps> = ({
  handleOmitField,
  columns,
  customFields = [],
}) => {
  const [fields, setFields] = useState(_fields);

  const updateFieldListOmitProperties = (prev: Field[], item: Field) => {
    const _prev = [...prev];
    const index = _prev.findIndex(field => field.id === item.id);
    _prev[index] = {
      ..._prev[index],
      omit: !item?.omit,
    };

    return _prev;
  };

  useEffect(() => {
    if (customFields.length > 0) {
      const filteredCustomFields = customFields.filter(
        customField => !fields.some(field => field.name === customField.field),
      );

      const formattedCustomFields = filteredCustomFields.map(
        (customField, index) => ({
          id: fields.length + (index + 1),
          name: customField.field,
          value: customField.type,
          icon: <CubeIcon className='w-[16px] h-[16px]' />,
          omit: true,
          allowed_operators: [1, 2, 3],
        }),
      );

      setFields([...fields, ...formattedCustomFields]);
    }
  }, [customFields.length]);

  return useMemo(
    () => (
      <>
        <Menu as='div' className='relative'>
          {({ open }) => (
            <>
              <Menu.Button
                className={`border-border cursor-pointer w-[43px] h-7 px-3 pt-2  rounded shadow border justify-center items-center gap-2 inline-flex`}
              >
                <Icon icon={Icons.grid} />
              </Menu.Button>

              <Transition
                show={open}
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
              >
                <Menu.Items
                  className='absolute z-10 mt-2 w-56 origin-top-right 
                    divide-y divide-gray-100 rounded-[4px] bg-white shadow-lg
                    ring-1 ring-black ring-opacity-5 focus:outline-none'
                >
                  <div className='p-2 relative'>
                    <Search
                      placeholder='Search'
                      transparent
                      showCommand={false}
                    />
                  </div>

                  <div className=' divide-y divide-border'>
                    {fields?.map(item => (
                      <div
                        key={item.id}
                        className={
                          'flex flex-row space-x-4 items-center cursor-pointer px-2 py-2'
                        }
                      >
                        <input
                          type='checkbox'
                          checked={!item?.omit}
                          className='rounded-[50px] h-[15px] w-[15px] cursor-pointer'
                          onChange={e => {
                            setFields(prev =>
                              updateFieldListOmitProperties(prev, item),
                            );
                            handleOmitField(e, item.name);
                          }}
                        />
                        <span className='block text-md pl-1'>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </>
    ),
    [columns, fields],
  );
};
