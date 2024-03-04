import { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const RequireEmail = () => {
  const [loading, setLoading] = useState(false);
  const [radioInput, setRadioInput] = useState<any>({
    hours: false,
    always: false,
    never: false,
  });

  const handleCheck = (e: any, selectedName: string) => {
    const name = e.target.name;
    const value = e.target.value;

    setRadioInput(() => {
      if (name === selectedName) {
        return {
          [name]: true,
        };
      } else {
        return {
          [name]: value,
        };
      }
    });
  };

  const handleSave = () => {
    setLoading(true);
    localStorage.setItem('requireEmail', JSON.stringify(radioInput));
    window.dispatchEvent(new Event('storage'));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const requireEmail = JSON.parse(
      localStorage.getItem('requireEmail') as string,
    );
    if (requireEmail) {
      setRadioInput(requireEmail);
    }
  }, []);

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
            name='hours'
            className='cursor-pointer h-5 w-5'
            onChange={e => handleCheck(e, 'hours')}
            checked={radioInput.hours}
          />
          <div className='ml-3'>
            <Text
              size='sm'
              className='text-neutral-900 font-inter text-md font-medium'
            >
              Only outside of office hours
            </Text>
            <span className='font-normal text-[13px] leading-4 text-gray-400 tracking-[0.20px]'>
              Reduces conversation volume by around 5% on average
            </span>
          </div>
        </label>
      </div>
      <div className='flex flex-col mb-4'>
        <label htmlFor='' className='flex items-start'>
          <input
            type='radio'
            name='always'
            className='cursor-pointer h-5 w-5'
            onChange={e => handleCheck(e, 'always')}
            checked={radioInput.always}
          />
          <div className='ml-3'>
            <Text
              size='sm'
              className='text-neutral-900 font-inter text-md font-medium'
            >
              Always
            </Text>
            <span className='font-normal text-[13px] leading-4 text-gray-400 tracking-[0.20px]'>
              Reduces conversation volume by around 30% on average
            </span>
          </div>
        </label>
      </div>
      <div className='flex flex-col mb-4'>
        <label htmlFor='' className='flex items-start'>
          <input
            type='radio'
            name='never'
            className='cursor-pointer h-5 w-5'
            onChange={e => handleCheck(e, 'never')}
            checked={radioInput.never}
          />
          <div className='ml-3'>
            <Text
              size='sm'
              className='text-neutral-900 font-inter text-md font-medium'
            >
              Never
            </Text>
            <span className='font-normal text-[13px] leading-4 text-gray-400 tracking-[0.20px]'>
              Will allow website visitors to start a conversation at any time
            </span>
          </div>
        </label>
      </div>
      <div className='flex justify-end space-x-4'>
        <Button text='Cancel' variant='outline' />
        <Button
          onClick={handleSave}
          loading={loading}
          text={loading ? 'Saving' : 'Save and set live'}
          loadingText='Saving'
          size='sm'
          className='bg-[#1068EF]'
        />
      </div>
    </div>
  );
};
export default RequireEmail;
