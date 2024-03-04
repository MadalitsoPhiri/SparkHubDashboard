import Text from '@/components/atoms/Text';
import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import React, { Fragment } from 'react';

interface ModalProps {
  show: boolean;
  closeModal: () => void;
  openModal: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  closeModal,
  openModal,
  title,
  children,
  className,
}) => {
  return (
    <>
      <div>
        <button type='button' onClick={openModal} className='sr-only'>
          Open Me
        </button>
      </div>

      <Transition.Root appear show={show} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-[99999] overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-[0.5]' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className={className}>
                <Dialog.Title
                  as='div'
                  className='flex flex-row items-center justify-between px-4'
                >
                  <div className='font-medium'>
                    <Text size='sm' className='text-[16px] leading-[24px]'>
                      {title}
                    </Text>
                  </div>
                  <div
                    className='cursor-pointer group-hover:text-blue hover:bg-border grid place-items-center rounded-full w-[28px] h-[28px]'
                    onClick={closeModal}
                  >
                    <Icon icon='mdi:close' color='#000000' fontSize={20} />
                  </div>
                </Dialog.Title>
                <div className='mt-2'>{children}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Modal;
