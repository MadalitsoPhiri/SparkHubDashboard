/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import { observer } from 'mobx-react-lite';
import Button from '@/components/atoms/Button';
import Modal from '@/components/atoms/modal';
import { sendEmail } from '@/hooks/useEmail';
import { emailStore } from '@/state/EmailStore';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Spinner from '@/components/atoms/Spinner';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const filters = [
  { id: 1, name: 'Email' },
  { id: 2, name: 'Chat' },
];

const NewMessage = ({ data }: any) => {
  const { isLoading, success, error } = emailStore.state;
  const [selected, setSelected] = useState(filters[0]);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [cc, setCc] = useState('');
  const [bccSelector, setBccSelector] = useState<string[]>([]);
  const [ccSelector, setCcSelector] = useState<string[]>([]);
  const [bcc, setBcc] = useState('');
  const modalIsOpen = () => {
    setOpen(true);
  };
  const modalIsClosed = () => {
    setOpen(false);
    setSubject('');
    emailStore.requestReset();
  };

  const onCcChange = (e: any) => {
    if (cc !== '') {
      e.preventDefault();
      const email = cc.trim();
      if (email) {
        setCcSelector([...ccSelector, ...email.split(',')]);
      }
    }
    setCc(e.target.value);
  };

  const onBccChange = (e: any) => {
    if (bcc !== '') {
      e.preventDefault();
      const email = bcc.trim();
      if (email) {
        setBccSelector([...bccSelector, ...email.split(',')]);
      }
    }

    setBcc(e.target.value);
  };

  const onEmailSubjectChange = (e: any) => {
    e.preventDefault();
    setSubject(e.target.value);
  };
  const onEmailTextChange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleEmailSend = () => {
    sendEmail({
      to: data?.email,
      subject,
      text,
      cc,
      bcc,
    });
    setSubject('');
    setText('');
    setCc('');
    setBcc('');
  };

  const SuccessMsg = () => {
    return (
      <div className='flex flex-col items-center justify-center py-[100px]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-[50px] h-[50px] text-[#1bb157]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <p className='text-[#1bb157] text-[14px] leading-[18px]'>
          Your email has been sent
        </p>
      </div>
    );
  };
  const ErrorMsg = () => {
    return (
      <div className='flex flex-col items-center justify-center py-[100px]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-[50px] h-[50px] text-red-500'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <p className='text-red-500 text-[14px] leading-[18px]'>
          {' '}
          {`${data?.contact_type} missing email address`}
        </p>
      </div>
    );
  };

  return (
    <div className='flex w-full'>
      <Button
        text='Send a message'
        LeftIcon={
          <Icon
            icon='ph:paper-plane-right-fill'
            color='#FFFFFF'
            height={18}
            width={18}
          />
        }
        onClick={() => modalIsOpen()}
      />
      <Modal
        show={open}
        openModal={modalIsOpen}
        closeModal={modalIsClosed}
        title={`${
          success || error?.message !== undefined ? '' : 'New conversation'
        }`}
        className='z-[10000] inline-block pt-6 my-8 w-[100%] max-w-[600px] overflow-hidden text-left align-top  transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <div className='border border-b-0 border-border'></div>
        <div className='px-[30px]'>
          {/* Chat Channel */}
          {selected.name === 'Chat' && (
            <>
              {' '}
              <div className='flex items-center py-[15px]'>
                <span className='text-[14px] leading-[18px] font-[400] text-[#222]'>
                  To:
                </span>
                <img
                  className=' w-7 h-7  rounded-full mx-2 flex-none'
                  src={
                    data?.profile_picture_url !== null
                      ? data?.profile_picture_url
                      : '/icons/avatar-person.svg'
                  }
                  alt=''
                />
                <span className='text-[12px] leading-[18px] font-[400] text-[#222] hover:text-secondary underline cursor-pointer'>
                  {data?.user_name}
                </span>
              </div>
              <div className='border border-b-0 border-border mb-[14px]'></div>
              <textarea
                name=''
                id=''
                cols={30}
                rows={15}
                className='w-full outline-none text-[14px] font-normal text-[#222] no-resize'
              ></textarea>
            </>
          )}
          {/* Email Channel */}
          {selected.name === 'Email' && (
            <>
              {success && <SuccessMsg />}
              {error?.message !== undefined && <ErrorMsg />}
              {isLoading && (
                <div className='flex flex-col items-center justify-center py-[100px]'>
                  <Spinner color='blue' size={20} />
                </div>
              )}
              {!success && error === undefined && (
                <>
                  <div className='flex items-center py-[15px]'>
                    <span className='text-[14px] leading-[18px] font-[400] text-[#222]'>
                      To:
                    </span>
                    <img
                      className=' w-7 h-7  rounded-full mx-2 flex-none'
                      src={
                        data?.profile_picture_url !== null
                          ? data?.profile_picture_url
                          : '/icons/avatar-person.svg'
                      }
                      alt=''
                    />
                    <span className='text-[12px] leading-[18px] font-[400] text-[#222] hover:text-primary-medium underline cursor-pointer'>
                      {data?.user_name}
                    </span>
                  </div>
                  <div className='flex items-center py-[5px]'>
                    <span className='text-[14px] leading-[18px] font-[400] text-[#222] mr-2'>
                      Cc:
                    </span>
                    <div className='w-full mt-1 border-b border-border focus-within:hover:border-grey-light hover:border-primary-medium mb-[14px] '>
                      <input
                        value={cc}
                        onChange={onCcChange}
                        type='email'
                        name='emailcc'
                        id='emailcc'
                        className='block w-full border-0 border-b border-transparent outline-none  text-[13px] leading-[18px] font-[400] p-[5px]'
                        placeholder='Enter comma separated emails, e.g. example1@net.com, example2@net.com'
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className='flex items-center py-[5px]'>
                    <span className='text-[14px] leading-[18px] font-[400] text-[#222] mr-2'>
                      Bcc:
                    </span>
                    <div className='w-full mt-1 border-b border-border focus-within:hover:border-light hover:border-primary-medium mb-[14px] '>
                      <input
                        value={bcc}
                        onChange={onBccChange}
                        type='email'
                        name='emailbcc'
                        id='emailbcc'
                        className='block w-full border-0 border-b border-transparent outline-none  text-[13px] leading-[18px] font-[400] p-[5px]'
                        placeholder='Enter comma separated emails, e.g. example1@net.com, example2@net.com'
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Email subject input */}
                  <div className='mt-1 border-b border-border focus-within:hover:border-grey-light hover:border-primary-medium mb-[14px] '>
                    <input
                      value={subject}
                      onChange={onEmailSubjectChange}
                      type='text'
                      name='subject'
                      id='subject'
                      className='block w-full border-0 border-b border-transparent outline-none  text-[14px] leading-[18px] font-[400] p-[5px]'
                      placeholder='Enter email subject'
                      autoFocus
                    />
                  </div>
                  <textarea
                    value={text}
                    onChange={onEmailTextChange}
                    name='email_text'
                    id='email_text'
                    cols={30}
                    rows={15}
                    className='w-full outline-none text-[14px] font-normal text-[#222] no-resize'
                  ></textarea>
                </>
              )}
            </>
          )}
        </div>
        <div
          className={`${
            success || error?.message !== undefined ? 'hidden' : ''
          }  border border-b-0 border-border`}
        ></div>
        <div
          className={`${
            success || error?.message !== undefined ? 'hidden' : ''
          } px-[30px] flex justify-between items-center py-[10px]`}
        >
          <div className='flex items-center '>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className=''>
                    <Listbox.Button
                      className='relative text-[#222] text-[14px] text-center leading-[20px] cursor-pointer bg-[#ffffff] px-[8px] py-[6px]  rounded-[6px]
            focus:outline-none cursor-pointer flex items-center group mr-[10px] border border-[#fff] hover:border-secondary z-10'
                    >
                      <span className='font-[600] text-[13px] leading-[20px] text-[#222] text-opacity-90  block truncate group-hover:text-primary-medium ml-[5px]'>
                        {selected.name}
                      </span>
                      <AiFillCaretDown className='text-[#222] text-opacity-90  group-hover:text-secondary w-3 h-3 flex-shrink-0 ml-[5px]' />
                      <div className='absolute bottom-[44px] flex flex-col items-center  invisible  group-hover:visible w-[150px] right-[-45px]'>
                        <span className='relative z-10 p-2  text-[14px] leading-[20px] text-[#222] text-opacity-80 border border-[#F1f1f1] whitespace-no-wrap bg-[#fff] shadow-lg rounded-[6px]'>
                          Change channel
                        </span>
                        <div className='w-3 h-3 -mt-2 rotate-45 bg-[#fff] border border-[#fff] z-20'></div>
                      </div>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options
                        className='absolute z-20 mt-1 w-[150px] bg-white shadow-lg
                             rounded-md  px-0 text-base bottom-[70px] left-[10px]  ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none  text-[13px] leading-[20px] text-[#222] text-opacity-100'
                      >
                        <span className='text-gray-500  ml-3 font-[600] text-[13px] leading-[18px]'>
                          Channel
                        </span>
                        {filters.map(filter => (
                          <Listbox.Option
                            key={filter.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'bg-secondary text-[#ffffff]'
                                  : 'text-gray-900',
                                'cursor-pointer select-none relative py-2  pl-1 pr-9',
                              )
                            }
                            value={filter}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className='flex items-center'>
                                  <span className='ml-2 block truncate font-[600] text-[13px] leading-[18px]'>
                                    {filter.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active
                                        ? 'text-[#ffffff]'
                                        : 'text-secondary',
                                      'absolute inset-y-0 right-0 flex items-center pr-4',
                                    )}
                                  >
                                    <CheckIcon
                                      className='h-5 w-5 '
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
            <div className={`flex items-center space-x-[5px] `}>
              {/* Emoji */}
              <div className='w-[32px] text-[#737376] hover:text-secondary cursor-pointer group relative z-40'>
                <svg
                  width='16'
                  height='16'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M6 8c.552 0 1-.672 1-1.5S6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8zm5-1.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5zm-.107 3.156c.343-.133.72.195.53.51A3.998 3.998 0 018 12.094c-1.45 0-2.72-.771-3.421-1.927-.192-.315.185-.643.53-.51.68.263 1.685.543 2.891.543a8.06 8.06 0 002.893-.544z'></path>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M15.4 8A7.4 7.4 0 11.6 8a7.4 7.4 0 0114.8 0zM14 8A6 6 0 112 8a6 6 0 0112 0z'
                  ></path>
                </svg>
                <div className='absolute bottom-[36px] flex flex-col items-center  invisible  group-hover:visible w-[150px] right-[-48px]'>
                  <span className='relative z-10 p-2  text-[14px] leading-[20px] text-[#222] text-opacity-80 border border-[#F1f1f1] whitespace-no-wrap bg-[#fff] shadow-lg rounded-[6px]'>
                    Insert an emoji
                  </span>
                  <div className='w-3 h-3 -mt-2 rotate-45 bg-[#fff] border border-white z-20'></div>
                </div>
              </div>
              {/* photo */}
              <div className='w-[32px] text-[#737376] hover:text-secondary cursor-pointer group relative z-40'>
                <svg
                  width='16'
                  height='16'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M1 5.8c0-1.68 0-2.52.327-3.162a3 3 0 011.311-1.311C3.28 1 4.12 1 5.8 1h4.4c1.68 0 2.52 0 3.162.327a3 3 0 011.311 1.311C15 3.28 15 4.12 15 5.8v4.4c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311C12.72 15 11.88 15 10.2 15H5.8c-1.68 0-2.52 0-3.162-.327a3 3 0 01-1.311-1.311C1 12.72 1 11.88 1 10.2V5.8zm12.6 2v2.4c0 .863-.001 1.426-.036 1.856-.034.414-.092.58-.138.67a1.6 1.6 0 01-.7.7c-.09.046-.256.104-.67.138-.43.035-.993.036-1.856.036H5.8c-.863 0-1.426-.001-1.856-.036-.414-.034-.58-.092-.67-.138a1.6 1.6 0 01-.7-.7c-.046-.09-.104-.256-.138-.67-.035-.43-.036-.993-.036-1.856V8.6l.434-.434a.8.8 0 011.132 0l2.01 2.01a.6.6 0 00.848 0l4.01-4.01a.8.8 0 011.132 0L13.6 7.8zM6.3 4.5a1.3 1.3 0 11-2.6 0 1.3 1.3 0 012.6 0z'
                  ></path>
                </svg>
                <div className='absolute bottom-[36px] flex flex-col items-center  invisible  group-hover:visible w-[150px] right-[-48px]'>
                  <span className='relative z-10 p-2  text-[14px] leading-[20px] text-[#222] text-opacity-80 border border-[#F1f1f1] whitespace-no-wrap bg-[#fff] shadow-lg rounded-[6px]'>
                    Insert an image
                  </span>
                  <div className='w-3 h-3 -mt-2 rotate-45 bg-[#fff] border border-white z-20'></div>
                </div>
              </div>
              {/* video */}
              <div className='w-[32px] text-[#737376] hover:text-secondary cursor-pointer group relative z-40'>
                <svg
                  width='16'
                  height='16'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M6.757 5.452A.5.5 0 006 5.881l.002 4.234a.5.5 0 00.757.428l3.526-2.117a.5.5 0 000-.857L6.757 5.452z'></path>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0 6.283c0-1.489 0-2.233.308-2.86.26-.526.73-1.02 1.245-1.302.612-.337 1.313-.37 2.716-.434A81.705 81.705 0 018 1.6a81.7 81.7 0 013.73.087c1.404.065 2.105.097 2.717.434a3.14 3.14 0 011.245 1.303C16 4.05 16 4.794 16 6.283v3.434c0 1.489 0 2.233-.309 2.86a3.135 3.135 0 01-1.244 1.302c-.612.337-1.313.37-2.716.434-1.107.05-2.374.087-3.731.087-1.357 0-2.624-.036-3.73-.087-1.404-.065-2.105-.097-2.717-.434a3.136 3.136 0 01-1.245-1.303C0 11.95 0 11.206 0 9.717V6.283zm14.6 0v3.434c0 .768-.001 1.256-.034 1.633-.03.353-.08.507-.13.608-.133.27-.401.55-.664.695-.261.143-.572.19-2.106.261C10.578 12.964 9.333 13 8 13c-1.333 0-2.577-.036-3.666-.086-1.534-.07-1.845-.118-2.106-.261a1.741 1.741 0 01-.663-.695c-.05-.101-.101-.255-.132-.607-.032-.378-.033-.866-.033-1.634V6.283c0-.768.001-1.257.033-1.634.03-.352.082-.506.132-.607.132-.27.4-.55.663-.695.261-.143.572-.19 2.106-.261A80.3 80.3 0 018 3c1.333 0 2.578.036 3.666.086 1.534.07 1.845.118 2.106.261.263.145.53.426.663.695.05.101.101.255.131.607.033.377.034.866.034 1.634z'
                  ></path>
                </svg>
                <div className='absolute bottom-[36px] flex flex-col items-center  invisible  group-hover:visible w-[180px] right-[-65px]'>
                  <span className='relative z-10 p-2  text-[14px] leading-[20px] text-[#222] text-opacity-80 border border-[#F1f1f1] whitespace-no-wrap bg-[#fff] shadow-lg rounded-[6px]'>
                    Insert embedded video
                  </span>
                  <div className='w-3 h-3 -mt-2 rotate-45 bg-[#fff] border border-white z-20'></div>
                </div>
              </div>
              {/* pin */}
              <div className='w-[32px] text-[#737376] hover:text-secondary cursor-pointer group relative z-40'>
                <svg
                  width='16'
                  height='16'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M8.256 1.454a3.7 3.7 0 015.233 5.232L8.186 11.99a2.2 2.2 0 01-3.112-3.112l3.182-3.182a.7.7 0 11.99.99L6.064 9.868A.8.8 0 107.196 11l5.303-5.304a2.3 2.3 0 00-3.253-3.252L3.943 7.747a3.8 3.8 0 005.374 5.374l3.182-3.182a.7.7 0 01.99.99l-3.182 3.182a5.2 5.2 0 01-7.354-7.354l5.303-5.303z'></path>
                </svg>
                <div className='absolute bottom-[36px] flex flex-col items-center  invisible  group-hover:visible w-[180px] right-[-65px]'>
                  <span className='relative z-10 p-2  text-[14px] leading-[20px] text-[#222] text-opacity-80 border border-white whitespace-no-wrap bg-[#fff] shadow-lg rounded-[6px]'>
                    Upload an attachment
                  </span>
                  <div className='w-3 h-3 -mt-2 rotate-45 bg-[#fff] border border-white z-20'></div>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleEmailSend}
            disabled={success}
            type='button'
            text='Send'
            size='sm'
            className={` ${
              success || isLoading || !text
                ? 'bg-opacity-50 pointer-events-none'
                : 'hover:bg-secondary'
            }  text-white`}
          />
        </div>
      </Modal>
    </div>
  );
};
export default observer(NewMessage);
