import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { EMAIL_REQUIRED_STATUS } from '@/constants/index';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { observer } from 'mobx-react-lite';

const RequireEmail = () => {
  const { publish } = useWidgetConfig();

  const handleCheck = (e: any) => {
    const name = e.target.name as EMAIL_REQUIRED_STATUS;

    WidgetConfigStore.updateEmailRequired(name);
  };

  const handleSave = () => {
    publish();
  };

  return (
    <div className='pb-[30px] px-1'>
      <p className='mb-4 text-gray-400 font-inter text-md font-medium'>
        Ask your website visitors to leave their email before starting a live
        chat:
      </p>
      <div className='flex flex-col mb-4'>
        <label htmlFor='' className='flex items-start'>
          <input
            type='radio'
            name={EMAIL_REQUIRED_STATUS.OFFICE_HOURS}
            className='cursor-pointer h-5 w-5'
            onChange={e => handleCheck(e)}
            checked={
              WidgetConfigStore.config.value.email_required ===
              EMAIL_REQUIRED_STATUS.OFFICE_HOURS
            }
            id={EMAIL_REQUIRED_STATUS.OFFICE_HOURS}
          />
          <label htmlFor={EMAIL_REQUIRED_STATUS.OFFICE_HOURS} className='ml-3'>
            <Text
              size='sm'
              className='text-neutral-900 font-inter text-md font-medium'
            >
              Only outside of office hours
            </Text>
            <span className='font-normal text-[13px] leading-4 text-gray-400 tracking-[0.20px]'>
              Reduces conversation volume by around 5% on average
            </span>
          </label>
        </label>
      </div>
      <div className='flex flex-col mb-4'>
        <label htmlFor='' className='flex items-start'>
          <input
            type='radio'
            name={EMAIL_REQUIRED_STATUS.ALWAYS}
            className='cursor-pointer h-5 w-5'
            onChange={e => handleCheck(e)}
            checked={
              WidgetConfigStore.config.value.email_required ===
              EMAIL_REQUIRED_STATUS.ALWAYS
            }
            id={EMAIL_REQUIRED_STATUS.ALWAYS}
          />
          <label htmlFor={EMAIL_REQUIRED_STATUS.ALWAYS} className='ml-3'>
            <Text
              size='sm'
              className='text-neutral-900 font-inter text-md font-medium'
            >
              Always
            </Text>
            <span className='font-normal text-[13px] leading-4 text-gray-400 tracking-[0.20px]'>
              Reduces conversation volume by around 30% on average
            </span>
          </label>
        </label>
      </div>
      <div className='flex flex-col mb-4'>
        <label htmlFor='' className='flex items-start'>
          <input
            type='radio'
            name={EMAIL_REQUIRED_STATUS.NEVER}
            className='cursor-pointer h-5 w-5'
            onChange={e => handleCheck(e)}
            checked={
              WidgetConfigStore.config.value.email_required ===
                EMAIL_REQUIRED_STATUS.NEVER ||
              (typeof WidgetConfigStore.config.value.email_required ===
                'undefined' &&
                true)
            }
            id={EMAIL_REQUIRED_STATUS.NEVER}
          />
          <label htmlFor={EMAIL_REQUIRED_STATUS.NEVER} className='ml-3'>
            <Text
              size='sm'
              className='text-neutral-900 font-inter text-md font-medium'
            >
              Never
            </Text>
            <span className='font-normal text-[13px] leading-4 text-gray-400 tracking-[0.20px]'>
              Will allow website visitors to start a conversation at any time
            </span>
          </label>
        </label>
      </div>
      <div className='flex justify-end space-x-4'>
        <Button text='Cancel' variant='outline' />
        <Button
          onClick={handleSave}
          loading={WidgetConfigStore.config.style.loading}
          text={
            WidgetConfigStore.config.style.loading
              ? 'Saving'
              : 'Save and set live'
          }
          loadingText='Saving'
          size='sm'
          className='bg-[#1068EF]'
        />
      </div>
    </div>
  );
};
export default observer(RequireEmail);
