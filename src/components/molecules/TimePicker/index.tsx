import { hoursOptions, minutesOptions } from '@/constants/time';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';

type TimePickerProps = {
  onSelect: (value: string) => void;
  value: any;
};

export const TimePicker: FC<TimePickerProps> = ({ onSelect, value }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [time, setTime] = useState({
    hour: '9',
    minute: '00',
  });

  const hours = useMemo(
    () =>
      hoursOptions.map(hour => (
        <li
          className={clsx(
            hour === time.hour ? 'bg-gray-100' : '',
            'p-1 hover:bg-gray-100 rounded',
          )}
          key={hour}
          onClick={() => {
            setTime(pre => ({
              ...pre,
              hour,
            }));
          }}
        >
          {hour === time.hour ? time.hour : hour}
        </li>
      )),
    [time.hour],
  );

  const minutes = useMemo(
    () =>
      minutesOptions.map((minute, index) => (
        <li
          className={clsx(
            minute === time.minute ? 'bg-gray-100' : '',
            'p-1 hover:bg-gray-100 rounded',
          )}
          key={minute + '_' + index}
          onClick={() => {
            setTime(pre => ({
              ...pre,
              minute: minute ?? '00',
            }));
          }}
        >
          {minute}
        </li>
      )),
    [time.minute],
  );

  return (
    <div
      className={
        'relative group h-[31px] w-[117px] px-3 py-1.5 bg-white rounded shadow border border-border justify-center items-center space-x-2 flex cursor-pointer'
      }
    >
      <button
        onClick={() => setDropdownOpen(pre => !pre)}
        className='w-full flex items-center justify-center space-x-2'
      >
        <Icon
          icon={'basil:clock-solid'}
          className='w-4 h-4 text-[#656971] group-hover:text-secondary'
          aria-hidden='true'
        />
        <span className='text-neutral-900 text-md font-medium leading-tight group-hover:text-secondary'>
          {value}
        </span>
      </button>
      <div
        onMouseLeave={() => setDropdownOpen(false)}
        className={clsx(
          dropdownOpen
            ? 'pointer-events-auto opacity-100 '
            : 'pointer-events-none opacity-0',
          'absolute top-full mt-1 z-50 transition-opacity text-center bg-white border border-gray-100 rounded text-md w-full right-0 overflow-hidden',
        )}
      >
        <div className='flex justify-between max-h-32 p-1'>
          <ul className='overflow-y-auto small-scrollbar w-full'>{hours}</ul>
          <div className='h-full border border-gray-100 ' />
          <ul className='overflow-y-auto small-scrollbar w-full'>{minutes}</ul>
        </div>
        <button
          className='bg-secondary text-white w-full block py-1'
          onClick={() => {
            onSelect(`${time.hour}:${time.minute} `);
            setDropdownOpen(false);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};
