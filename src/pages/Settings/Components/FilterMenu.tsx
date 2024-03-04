import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { AiFillCaretDown } from 'react-icons/ai';

const filters = [
  { id: 1, name: 'Everyone' },
  { id: 2, name: 'No role' },
  { id: 3, name: 'Roles' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const FilterMenu = () => {
  const [selected, setSelected] = useState(filters[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className='mt-1 relative'>
            <Listbox.Button
              className='relative 2xl:w-[100px] xl:w-[90px] group block flex  cursor-pointer sm:text-sm items-center 2xl:p-2 xl:p-1 border border-transparent shadow-sm 
            font-medium rounded-md text-black bg-gray-100 hover:bg-secondary focus:outline-none '
            >
              <span className='absolute inset-y-0 absolute right-0 flex items-center pr-2 '>
                <AiFillCaretDown
                  className='2xl:h-4 2xl:w-4 xl:w-3 xl:h-3 text-secondary group-hover:text-white'
                  aria-hidden='true'
                />
              </span>
              <span className=' 2xl:text-[14px] xl:text-[12px] font-bold block truncate group-hover:text-white text-secondary'>
                {selected.name}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options
                className='absolute z-10 mt-1 w-[190px] bg-white shadow-lg
               rounded-md 2xl:py-1 px-0 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none 2xl:text-[14px] xl:text-[12px]'
              >
                {filters.map(filter => (
                  <Listbox.Option
                    key={filter.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-secondary' : 'text-gray-900',
                        'cursor-pointer select-none relative 2xl:py-2 xl:py-1 pl-3 pr-9',
                      )
                    }
                    value={filter}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames(
                              selected ? 'text-primary' : 'font-normal',
                              'ml-3 block truncate',
                            )}
                          >
                            {filter.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-secondary' : 'text-secondary',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon
                              className='2xl:h-5 2xl:w-5 xl:w-4 xl:h-4 '
                              aria-hidden='true'
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default FilterMenu;
