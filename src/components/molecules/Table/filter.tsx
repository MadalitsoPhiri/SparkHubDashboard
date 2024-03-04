import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Button from '@/components/atoms/Button';
import { filterOperators } from '@/constants/index';
import { User } from '@/types/user.types';
import { Menu, Transition } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';
import { FilterPicker } from '../FilterPicker';
import { OperatorPicker } from '../OperatorPicker';

type FilterValue = {
  field: keyof User;
  operator: (typeof filterOperators)[number]['value'];
  value: string;
};

interface FilterProps {
  onFilter: (data: FilterValue) => void;
  count: number;
}

export const Filter: FC<FilterProps> = ({ onFilter, count }) => {
  const [values, setValues] = useState<FilterValue>({
    field: 'user_name',
    operator: 'equals',
    value: '',
  });
  const onSelectOperator = (index: number) => {
    setValues({ ...values, operator: filterOperators[index].value });
  };

  const onFilterValue = (option: { label: string; value: keyof User }) => {
    setValues({ ...values, field: option.value });
  };

  return (
    <Menu as='div' className='relative'>
      {({ open }) => (
        <>
          <Menu.Button
            className={`border-border cursor-pointer w-[43px] h-7 max-auto pl-2 pt-2  rounded shadow border  justify-center items-center inline-flex`}
          >
            <Icon icon={Icons.filterAlt} />
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
              className='absolute right-1 z-10 mt-2 h-[56px] space-x-4 origin-top-right rounded-[4px] bg-white shadow-lg
                    ring-1 ring-border focus:outline-none flex  items-center px-4'
            >
              <FilterPicker onSelect={onFilterValue} />
              <OperatorPicker onSelect={onSelectOperator} />

              <input
                placeholder='value to'
                type='search'
                className='py-0.5 outline-none border-b border-border'
                onKeyDown={e => e.stopPropagation()}
                onChange={({ target }) => {
                  setValues({ ...values, value: target.value });
                }}
              />

              <div className='px-2 flex flex-col justify-center items-center min-w-[35px]'>
                <p>{count}</p>
                <hr className='h-pr border border-border w-full shadow-sm ' />
              </div>
              <Button
                text='Filter'
                variant='outline'
                onClick={() => onFilter(values)}
              />
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
