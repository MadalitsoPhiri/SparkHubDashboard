import { officeOpenDays } from '@/constants/index';
import { Listbox, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { observer } from 'mobx-react-lite';
import { FC, Fragment } from 'react';
import { MdDelete } from 'react-icons/md';
import { TimePicker } from '../TimePicker';

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}

type OfficeHourProps = {
  officeHour: any;
  onChange: (value: string) => void;
  onSelect: (field: 'openTime' | 'closeTime', value: string) => void;
  deleteHours: () => void;
};

const OfficeHour: FC<OfficeHourProps> = ({
  deleteHours,
  officeHour,
  onChange,
  onSelect,
}) => {
  return (
    <div className='flex flex-row items-center justify-between mb-1 relative w-full'>
      <div className='inline-block py-1  text-left '>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            {/* days */}
            <div>
              <Listbox value={officeHour} onChange={onChange}>
                {({ open }) => (
                  <>
                    <div>
                      <Listbox.Button className='relative w-[126px] group  mr-[8px] h-[31px] px-3 py-1.5 bg-white rounded shadow border border-border justify-start items-center gap-3 flex'>
                        <span className='inset-y-0 absolute right-0 flex items-center pr-2 '>
                          <Icon
                            icon={'formkit:down'}
                            className='w-4 h-4 text-gray-800 group-hover:text-secondary'
                            aria-hidden='true'
                          />
                        </span>
                        <span className='text-neutral-900 text-md font-medium leading-tight group-hover:text-secondary'>
                          {officeHour.openDay}
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
                          className='absolute z-10 mt-1  bg-white shadow rounded-md 
                           py-1 px-0 text-base ring-1 ring-black ring-opacity-5 overflow-auto
                           focus:outline-none  text-[13px] leading-[20px] text-[#222] text-opacity-100'
                        >
                          {officeOpenDays.map(officeOpenDay => (
                            <Listbox.Option
                              key={officeOpenDay.id}
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-secondary' : 'text-gray-900',
                                  'cursor-pointer select-none relative py-2  pl-1 pr-9',
                                )
                              }
                              value={officeOpenDay.name}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className='flex items-center'>
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'text-secondary'
                                          : 'font-normal',
                                        'ml-3 block text-neutral-900 text-md font-medium leading-tight',
                                      )}
                                    >
                                      {officeOpenDay.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <button
                                      type='button'
                                      disabled={selected}
                                      className={classNames(
                                        active
                                          ? 'text-main_primary'
                                          : 'text-main_primary',
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                      )}
                                    >
                                      <Icon
                                        icon={'system-uicons:check'}
                                        className='h-5 w-5 '
                                        aria-hidden='true'
                                      />
                                    </button>
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
            </div>
            {/* from */}

            <TimePicker
              value={officeHour.openTime}
              onSelect={value => onSelect('openTime', value + ' AM')}
            />
            {/* to */}
            <p className='font-[600] text-[13px] leading-[20px] mx-2 text-[#222] text-opacity-90'>
              to
            </p>
            <TimePicker
              value={officeHour.closeTime}
              onSelect={value => onSelect('closeTime', value + ' PM')}
            />
          </div>
        </div>
      </div>
      <div
        className='px-1 py-1 bg-white rounded
       shadow border border-zinc-200 justify-start
       items-center gap-3 cursor-pointer flex'
      >
        <MdDelete onClick={deleteHours} className='w-5 h-5 text-warning' />
      </div>
    </div>
  );
};
export default observer(OfficeHour);
