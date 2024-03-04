import { verifyEmailValidity } from '@/helpers/index';
import { teamMateStore } from '@/state/TeammateStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubRouteContainer from '../Components/SubRouteContainer';

const InvitePeople = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const emails = teamMateStore.emailsToInvite;

  const removeEmail = (index: number) => {
    teamMateStore.removeEmail(index);
  };

  const handleTextChange = (e: any) => {
    setError('');
    setEmail(e.target.value);
  };

  const handleKeyUp = (e: any) => {
    const filteredInput = email.replace(/[\r\n,]/g, '').trim();

    if (!filteredInput) {
      return;
    }

    if (!verifyEmailValidity(filteredInput)) {
      const invalidEmailErrorMessage = 'Invalid email address inserted';
      setError(invalidEmailErrorMessage);
      return;
    }

    if (emails.includes(filteredInput)) {
      const repeatedEmailErrorMessage =
        'The same email address was inserted more than once';
      setError(repeatedEmailErrorMessage);
      return;
    }

    e.preventDefault();
    teamMateStore.addEmail(filteredInput);
    setEmail('');
  };

  return (
    <SubRouteContainer
      className='px-8'
      proceedBtnDisabled={!emails.length || error || email}
      headerTitle='Invite teammates'
      btnTitle='Continue and set permissions'
      handleClick={() => navigate('permissions')}
      handleBack={() => navigate(-1)}
    >
      <div className='flex flex-col'>
        <span className='my-4 2xl:text-[15px] xl:text-[12px] text-gray-600'>
          Invite new teammates
        </span>
        <span className='mb-2 2xl:text-[13px] xl:text-[10px] text-gray-500'>
          You can invite multiple teammates by separating them with a comma,
          space or newline.
        </span>
        <div className='flex items-center w-[50%] border border-border flex-wrap hover:border-secondary focus-within:border focus-within:border-secondary  rounded-[6px] p-[4px]  min-h-[32px] bg-white '>
          {emails?.map((email, index) => (
            <span
              key={index}
              className='w-auto h-[25px] flex items-center justify-between space-x-1 rounded-[4px]
             mt-0 mr-[8px] ml-0
            bg-[#f1f1f1] text-[#222] px-2'
            >
              <p className='text-[11px]'>{email}</p>
              <svg
                onClick={() => removeEmail(index)}
                className={`w-4 h-4 text-[#222] cursor-pointer `}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          ))}
          <textarea
            onChange={handleTextChange}
            value={email}
            onKeyUp={e =>
              ['Space', 'Enter', 'Comma'].includes(e.code)
                ? handleKeyUp(e)
                : null
            }
            onKeyDown={e => {
              if (e.code === 'Enter' && !e.shiftKey) {
                e.preventDefault();
              }
            }}
            className='bg-transparent flex-1 h-[40px]  outline-none pt-[9px] px-0 pb-0 text-[14px]  pl-[4px]'
          />
        </div>
        {error && <small className='text-red-600'>{error}</small>}
      </div>
    </SubRouteContainer>
  );
};
export default observer(InvitePeople);
