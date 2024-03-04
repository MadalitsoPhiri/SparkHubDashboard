import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

const status = [
  { id: 1, name: 'Active', online: true },
  { id: 2, name: 'Away', online: false },
  { id: 3, name: 'Away & reassigning', online: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableMenu = (user: any) => {
  const [selected, setSelected] = useState(status[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className='mt-1'>
            <Listbox.Button className='relative bg-white  pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none sm:text-sm'>
              <span className='flex items-center'>
                <span aria-label={selected.online ? 'Online' : 'Offline'} />
                <span className='2xl:ml-3  xl:ml-2 text-[14px] block truncate text-gray-800'>
                  {selected.name}
                </span>
              </span>
              <span className='inset-y-0 absolute -left-1 flex items-center pr-2 pointer-events-none'>
                <AiFillCaretDown
                  className='h-3 w-3 text-gray-800'
                  aria-hidden='true'
                />
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
                className='absolute z-10 mt-1 2xl:w-[190px] xl:w-[170px] bg-white shadow-lg
               rounded-md 2xl:py-1 px-0 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
              >
                {status.map(item => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-secondary' : 'text-gray-900',
                        'cursor-pointer select-none relative 2xl:py-2 2xl:pl-3 2xl:pr-9 xl:pl-2 xl:pr-6 xl:py-1',
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={classNames(
                              selected ? 'text-secondary' : 'font-normal',
                              '2xl:text-[14px] xl:text-[14px] ml-3 block truncate',
                            )}
                          >
                            {item.name}
                            <span className='sr-only'>
                              {' '}
                              is {item.online ? 'online' : 'offline'}
                            </span>
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
                              className='2xl:h-5 2xl:w-5 xl:w-4 xl:h-4'
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

export default TableMenu;
