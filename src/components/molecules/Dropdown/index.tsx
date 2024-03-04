import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { FC, Fragment } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

export type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
  selected: DropdownOption;
  setSelected: (value: DropdownOption) => void;
};

export const Dropdown: FC<DropdownProps> = ({
  options,
  selected,
  setSelected,
}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className='mt-1'>
            <Listbox.Button className='relative bg-white  pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none sm:text-sm'>
              <span className='flex items-center'>
                <span className='2xl:ml-3  xl:ml-2 2xl:text-[14px] xl:text-[14px] block truncate text-gray-800'>
                  {selected.label}
                </span>
              </span>
              <span className='inset-y-0 absolute 2xl:right-0 xl:right-0 flex items-center pr-2 pointer-events-none'>
                <AiFillCaretDown
                  className='2xl:h-4 2xl:w-4 xl:w-3 xl:h-3 text-gray-800'
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
                {options.map(item => (
                  <Listbox.Option
                    key={item.value}
                    className={({ active }) =>
                      clsx(
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
                            className={clsx(
                              selected ? 'text-secondary' : 'font-normal',
                              '2xl:text-[14px] xl:text-[14px] ml-3 block truncate',
                            )}
                          >
                            {item.label}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={clsx(
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
