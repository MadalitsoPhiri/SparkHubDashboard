import Button from '@/components/atoms/Button';
import RadioInput from '@/components/atoms/RadioInput';
import OfficeHour from '@/components/molecules/OfficeHour';
import { notify } from '@/helpers/index';
import routeNames from '@/routes/routeNames';
import { AuthStore } from '@/state/AuthenticationStore';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { OfficeHours } from '@/types/widgetConfig.types';
import { PlusIcon } from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { FC, PropsWithChildren, useState } from 'react';
import { Link } from 'react-router-dom';

type AvailabilityProps = {
  handlePublish: () => void;
};

const Availability: FC<PropsWithChildren<AvailabilityProps>> = ({
  handlePublish,
}) => {
  const handleReplyTimeSelected = (value: any) => {
    WidgetConfigStore.updateAvailabilityReplyTime(value);
  };

  const [hour] = useState([
    'Every day',
    'Weekdays',
    'Weekends',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]);
  const [activeIndex, setActiveIndex] = useState(
    () =>
      (WidgetConfigStore.config?.value?.availability?.officeHours ?? [])
        .length - 1,
  );
  const [_, setSelectedOpenDayIndex] = useState(0);
  const newOfficeHours =
    (WidgetConfigStore.config?.value?.availability
      ?.officeHours as OfficeHours[]) ?? [];

  const reply_times = [
    { value: 'In a few minutes', label: 'In a few minutes' },
    { value: 'In a few hours', label: 'In a few hours' },
    { value: 'In a day', label: 'In a day' },
    {
      value: "We'll reply as soon as we can",
      label: 'User Status',
    },
  ];

  const addHours = () => {
    const copy = [...newOfficeHours];
    const notAllowedDaySelected = newOfficeHours.findIndex(
      ({ openDay }) =>
        openDay === hour[0] || openDay === hour[1] || openDay === hour[2],
    );

    const isEmpty = newOfficeHours.findIndex(({ openDay }) => openDay === '');

    if (isEmpty !== -1) {
      notify('error', 'Please select a day');
      return;
    }

    if (notAllowedDaySelected !== -1) {
      notify(
        'error',
        `You can't add more when '${newOfficeHours[notAllowedDaySelected].openDay}' is selected`,
      );
      return;
    }

    if (newOfficeHours.length === 9) {
      notify('error', "You can't add more than 10 days");
      return;
    }

    const filtered = copy.filter(({ openDay }) => {
      const index = hour.findIndex(day => day === openDay);
      return index !== -1;
    });

    const newPayload = {
      openDay: '',
      openTime: '9:00 AM',
      closeTime: '5:00 PM',
    };

    WidgetConfigStore.updateOfficeHours([...filtered, newPayload]);

    setSelectedOpenDayIndex(pre => {
      return hour.length > pre + 1 ? pre + 1 : pre;
    });

    setActiveIndex(prev => prev + 1);
  };

  const removeHours = () => {
    WidgetConfigStore.updateOfficeHours([
      ...newOfficeHours.slice(0, newOfficeHours.length - 1),
    ]);
    if (activeIndex !== undefined) {
      setActiveIndex(prev => prev - 1);
    }
    setSelectedOpenDayIndex(prev => {
      return prev - 1;
    });
  };

  const handleDaySelected = (value: any, _index: number) => {
    const copy = [...newOfficeHours];

    if (_index !== -1) {
      copy[_index].openDay = value;
    }

    const foundIndex = copy.findIndex(({ openDay }) => openDay === value);
    if (foundIndex !== -1 && foundIndex !== _index) {
      notify('error', 'You have already selected this day');
      copy.splice(foundIndex, 1);
      WidgetConfigStore.updateOfficeHours([...copy]);
      return;
    }

    if (copy[_index].openDay === hour[0]) {
      WidgetConfigStore.updateOfficeHours([
        {
          openDay: value,
          openTime: copy[_index].openTime,
          closeTime: copy[_index].closeTime,
        },
      ]);
      setActiveIndex(0);
      setSelectedOpenDayIndex(0);
    } else {
      WidgetConfigStore.updateOfficeHours([...copy]);
      const index = hour.findIndex(day => day === value);
      if (index !== -1) {
        setSelectedOpenDayIndex(index);
      }
    }
  };

  const handleOnTimeSelected = (
    field: 'openTime' | 'closeTime',
    time: any,
    index: number,
  ) => {
    const newOfficeHours = WidgetConfigStore.config?.value?.availability
      ?.officeHours as OfficeHours[];
    const copy = [...newOfficeHours];
    copy[index][field] = time;
    WidgetConfigStore.updateOfficeHours([...copy]);
  };

  const getElements = () => {
    return newOfficeHours.map((officeHour, index) => {
      return (
        <OfficeHour
          key={index}
          officeHour={officeHour}
          deleteHours={removeHours}
          onChange={value => handleDaySelected(value, index)}
          onSelect={(field, value) => handleOnTimeSelected(field, value, index)}
        />
      );
    });
  };

  return (
    <div className='w-full auto'>
      <div className='mt-6 my-5'>
        <Link
          to={routeNames.dashboard.settings}
          className='cursor-pointer font-[500] text-[14px] leading-[20px] text-[#656971!important] text-opacity-90'
        >
          {AuthStore.user_workspace_info.active_workspace.workspace.timezone ? (
            <span>
              Your workspace timezone is set to{' '}
              <span className='text-secondary'>
                {
                  AuthStore.user_workspace_info.active_workspace.workspace
                    .timezone
                }
              </span>
            </span>
          ) : (
            'Your workspace timezone is not set click here to set it'
          )}
        </Link>
      </div>
      {getElements()}
      <div className='mb-6 mt-1 flex items-center group'>
        <button
          onClick={addHours}
          disabled={activeIndex === 9}
          className='inline-flex items-center py-2 text-[14px] font-[500] cursor-pointer flex-shrink-0 text-lightBlue disabled:text-gray-400 '
        >
          <PlusIcon
            className={`font-[500] w-[15px] h-[15px] mx-1  ${
              activeIndex === 9 ? 'text-gray-400' : 'text-lightBlue'
            }`}
          />
          Add hours
        </button>
      </div>
      <div className='w-full h-[1px]  bg-[#ECEDF0]' />
      <div className='flex flex-col '>
        <div className='border-b border-1 border-[f1f1f1] mb-6'></div>
        <p className='mb-2 font-medium text-md text-lightBlack'>
          Share your reply time
        </p>
        <p className='mb-6 font-medium text-md text-gray-400'>
          Set expectations about how quickly your team replies during office
          hours. Say how soon your team usually replies
        </p>
        <div className='flex flex-col'>
          {reply_times.map((time, index) => {
            return (
              <span key={time.value} className='mb-4'>
                <RadioInput
                  label={time.label}
                  onChange={() =>
                    handleReplyTimeSelected(reply_times[index].value)
                  }
                  checked={
                    WidgetConfigStore.config?.value?.availability?.reply_time ==
                    time.value
                  }
                />
              </span>
            );
          })}
        </div>
      </div>
      <div className='flex items-center mt-2'>
        <div className='flex w-full justify-end item-items space-x-4'>
          <Button type='button' text='Cancel' size='sm' variant='outline' />
          <Button
            type='button'
            onClick={handlePublish}
            loading={WidgetConfigStore.config.style?.loading}
            text={
              WidgetConfigStore.config.style?.loading
                ? 'Saving'
                : 'Save and set live'
            }
            loadingText='Saving'
            className='bg-[#1068EF]'
            size='sm'
            disabled={newOfficeHours[activeIndex]?.openDay === ''}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Availability);
