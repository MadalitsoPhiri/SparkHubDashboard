import { useEffect, useRef, useState } from 'react';

import {
  CONVERSATION_STATUS,
  UPLOAD_STATUS,
  emojiList,
} from '@/constants/index';
import { useChatConversation } from '@/hooks/useChatConversation';
import { AuthStore } from '@/state/AuthenticationStore';
import { ConStore } from '@/state/ConversationStore';
import { User } from '@/types/user.types';
import { formatBytes, generateRandomID, generate_message } from '@/utils/index';
import { Popover } from '@headlessui/react';
import { observer } from 'mobx-react-lite';

const MessageInput = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [uploadsComplete, setUploadsComplete] = useState(true);
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isLeadBlocked = (
    ConStore?.cons?.get(ConStore?.selected_conversation_id as string)
      ?.lead as User
  )?.is_blocked;

  const { set_typing, send_message, update_conversation_status } =
    useChatConversation();
  const growableContainerRef = useRef(null);
  const handle_text_area_change = (e: any) => {
    setTextAreaValue(e.target.value);
  };
  const handle_emoji_click = (character: string) => {
    setTextAreaValue(textAreaValue + character);
  };
  function handleUpload(event: any) {
    const {
      target: { files },
    } = event;
    const conId = ConStore.selected_conversation_id;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        Object.defineProperty(files[i], 'id', {
          writable: false,
          value: `${conId}-${files[i].name}-${generateRandomID()}`,
        });
        ConStore.queueUpload(files[i]);
      }
      ConStore.add_attachments({ files, conversationId: conId });
      event.target.value = null;
    }
  }
  const OpenConversation = () => {
    update_conversation_status({
      conversation_id: ConStore.selected_conversation_id as string,
      status: CONVERSATION_STATUS.OPEN,
    });
  };
  const handle_send_message = () => {
    if (
      ConStore.cons.get(ConStore.selected_conversation_id as string)?.status ===
      CONVERSATION_STATUS.CLOSED
    ) {
      OpenConversation();
    }
    if (textAreaValue.trim() != '' && textAreaValue.trim() != null) {
      const lead = ConStore.cons.get(
        ConStore.selected_conversation_id as string,
      )?.lead;
      const msg = generate_message(
        ConStore.selected_conversation_id as string,
        textAreaValue.trim(),
        AuthStore.currentUser,
        lead,
      );
      send_message(ConStore.selected_conversation_id as string, msg);

      setTextAreaValue('');
    }
  };
  const timeoutFunction = () => {
    set_typing({
      status: false,
      conversation_id: ConStore.selected_conversation_id,
    });
  };
  const handleCancel = (attachment: any, index: number) => {
    if (attachment.file.id === ConStore.upload_state?.file_id) {
      ConStore.cancelCurrentAttachmentsUpload();
    }

    ConStore.removeAttachment({
      conversationId: ConStore.selected_conversation_id,
      index,
    });
  };
  const handle_key_pressed = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      handle_send_message();
    } else {
      if (
        !(
          (ConStore.selected_conversation_id as string) in
          ConStore.typing_status
        ) ||
        (!ConStore.typing_status[ConStore.selected_conversation_id as string]
          .status &&
          ConStore.selected_conversation_id)
      ) {
        set_typing({
          status: true,
          conversation_id: ConStore.selected_conversation_id,
        }),
          ConStore.set_typing_status_timeout({
            conversation_id: ConStore.selected_conversation_id as string,
            timeout: setTimeout(timeoutFunction, 3000),
          });
      } else {
        if (
          (ConStore.selected_conversation_id as string) in
            ConStore.typing_status_timeout &&
          ConStore.selected_conversation_id
        ) {
          clearTimeout(
            ConStore.typing_status_timeout[ConStore.selected_conversation_id],
          );

          ConStore.set_typing_status_timeout({
            conversation_id: ConStore.selected_conversation_id,
            timeout: setTimeout(timeoutFunction, 3000),
          });
        }
      }
    }
  };
  useEffect(() => {
    try {
      ConStore.cons
        .get(ConStore.selected_conversation_id as string)
        ?.attachments?.forEach((attachment: any) => {
          if (
            attachment.status != UPLOAD_STATUS.COMPLETED ||
            attachment.url === ''
          ) {
            throw new Error('uploads incomplete');
          } else {
            if (!uploadsComplete) {
              setUploadsComplete(true);
            }
          }
        });
    } catch (e) {
      if (uploadsComplete) {
        setUploadsComplete(false);
      }
    }
  }, [ConStore.selected_conversation_id, ConStore.cons]);

  useEffect(() => {
    if (focusInput) {
      inputRef?.current?.focus();
    }
  }, [focusInput]);

  return (
    <Popover>
      <div className='flex-shrink-0 w-full p-[24px] pt-0 max-h-[50%] relative'>
        {isLeadBlocked ? (
          <div className='text-red-500 font-medium text-xl'>
            <p>
              Contact is Blocked from receiving messages. Please unblock to send
              a message
            </p>
          </div>
        ) : (
          <div
            className={`flex flex-col h-full shrink-0 rounded-md border-[1.9px]  bg-white ${
              focusInput ? 'border-secondary' : 'border-border'
            } `}
          >
            <div className='flex-1  my-[12px] overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded '>
              <div
                className='grow-wrap  text-xs font-normal text-gray-400 flex flex-col '
                ref={growableContainerRef}
              >
                <textarea
                  ref={inputRef}
                  disabled={
                    ConStore.cons.get(
                      ConStore.selected_conversation_id as string,
                    )?.updating_convo
                  }
                  value={textAreaValue}
                  onKeyDown={handle_key_pressed}
                  onChange={handle_text_area_change}
                  onFocus={() => setFocusInput(true)}
                  onBlur={() => setFocusInput(false)}
                  autoFocus={focusInput}
                  onInput={(e: any) => {
                    const regex = /\n/g;
                    const clean_text = e.target.value.replace(
                      regex,
                      '\u000D\u000A',
                    );

                    if (growableContainerRef.current) {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      growableContainerRef.current.dataset.replicatedValue =
                        clean_text;
                    }
                  }}
                  placeholder='Type a message...'
                  className='w-full outline-none input-disabled overflow-hidden text-[14px] font-medium pr-3 pl-4 text-gray-[#7E8B99] no-resize'
                ></textarea>
              </div>

              <div className='flex flex-row gap-5 overflow-x-auto  scrollbar-thin pr-3 pl-4 scrollbar-thumb-gray-200 scrollbar-thumb-rounded w-full items-center'>
                {ConStore.cons
                  .get(ConStore.selected_conversation_id as string)
                  ?.attachments?.map((attachment, index) => (
                    <div
                      key={attachment.file.id}
                      className='relative rounded-md shadow-l group ring-1 ring-gray-300 max-h-36 m-2 mb-4  p-2  max-w-xs flex flex-col  bg-white z-[9999]'
                    >
                      <svg
                        onClick={() => handleCancel(attachment, index)}
                        className={`absolute -right-2 -top-2 w-5 h-5 text-gray-500 cursor-pointer invisible group-hover:visible`}
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

                      <div className='w-full flex-1 flex flex-row items-center'>
                        {attachment.file.type.includes('image') ? (
                          <img
                            src={URL.createObjectURL(attachment.file)}
                            className='w-20 h-20 rounded-lg'
                          />
                        ) : (
                          <div className='bg-indigo-500 rounded-lg flex flex-row justify-center items-center w-10 h-10'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-5 h-5 text-white'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                              />
                            </svg>
                          </div>
                        )}
                        <div className='w-full truncate'>
                          <p
                            className={`truncate ${
                              attachment.file.type.includes('image')
                                ? 'ml-2'
                                : 'ml-2'
                            }  text-sm text-gray-500`}
                          >
                            {attachment.file.name}
                          </p>
                          <p
                            className={`truncate ${
                              attachment.file.type.includes('image')
                                ? 'ml-2'
                                : 'ml-2'
                            }  text-sm text-gray-400`}
                          >
                            {formatBytes(attachment.file.size)}
                          </p>
                        </div>
                      </div>

                      {attachment.file.id === ConStore.upload_state?.file_id &&
                        ConStore.upload_state.uploading && (
                          <div className='mt-2 w-full h-[5px]  bg-sideBarColor rounded-lg overflow-hidden'>
                            <div
                              style={{
                                width: `${ConStore.upload_state.progress}%`,
                              }}
                              className={`justify-self-end   h-[5px] bg-[#033EB5] rounded-lg transition-all`}
                            ></div>
                          </div>
                        )}
                    </div>
                  ))}
              </div>
            </div>

            <div className='shrink-0 flex flex-row w-full  items-end justify-end py-2 px-4 '>
              <div className='flex flex-row items-center mr-[16px] h-[32px]'>
                <Popover.Button>
                  <div className='group cursor-pointer mr-[23px] '>
                    <svg
                      className='group-hover:text-secondary text-[#7E8B99]'
                      width='19'
                      height='19'
                      viewBox='0 0 19 19'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M16.7148 0.285156H3.21484C1.94922 0.285156 0.964844 1.26953 0.964844 2.5V12.5898C0.964844 13.8203 1.94922 14.8047 3.21484 14.8047H6.58984V17.7578C6.58984 18.1094 6.97656 18.2852 7.25781 18.0742L11.6523 14.8047H16.7148C17.9453 14.8047 18.9648 13.7852 18.9648 12.5898V2.5C18.9648 1.26953 17.9805 0.285156 16.7148 0.285156ZM17.3125 12.625C17.3125 12.9414 17.0312 13.1875 16.75 13.1875H11.125L8.3125 15.2969V13.1875H3.25C2.93359 13.1875 2.6875 12.9414 2.6875 12.625V2.5C2.6875 2.21875 2.93359 1.9375 3.25 1.9375H16.75C17.0312 1.9375 17.3125 2.21875 17.3125 2.5V12.625ZM12.25 6.4375C12.8477 6.4375 13.375 5.91016 13.375 5.3125C13.375 4.75 12.8477 4.1875 12.25 4.1875C11.6875 4.1875 11.1602 4.71484 11.1602 5.3125C11.1602 5.94531 11.6172 6.4375 12.25 6.4375ZM7.75 6.4375C8.34766 6.4375 8.875 5.91016 8.875 5.3125C8.875 4.75 8.34766 4.1875 7.75 4.1875C7.1875 4.1875 6.66016 4.71484 6.66016 5.3125C6.66016 5.94531 7.11719 6.4375 7.75 6.4375ZM12.4258 8.72266C11.8281 9.42578 10.9492 9.8125 10 9.8125C9.01562 9.8125 8.13672 9.42578 7.53906 8.72266C7.22266 8.37109 6.69531 8.30078 6.34375 8.61719C5.99219 8.93359 5.95703 9.46094 6.23828 9.8125C7.1875 10.9023 8.52344 11.5352 10 11.5352C11.4414 11.5352 12.7773 10.9023 13.7266 9.8125C14.0078 9.46094 13.9727 8.93359 13.6211 8.61719C13.2695 8.30078 12.7422 8.37109 12.4258 8.72266Z'
                        fill='currentColor'
                      />
                    </svg>
                  </div>
                </Popover.Button>
                <Popover.Panel>
                  <div className='w-[364px] rounded-lg h-[250px] border-[#E6E6E6] border bg-white absolute bottom-2 -right-28 overflow-y-auto'>
                    <div className='flex flex-wrap p-4'>
                      {emojiList.map((emoji, index) => {
                        return (
                          <div
                            onClick={() => handle_emoji_click(emoji.jsCode)}
                            className={`px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer`}
                            key={index}
                          >
                            {emoji.jsCode}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Popover.Panel>
                <div className='flex flex-row justify-center items-center relative   h-[32px] mr-[23px]'>
                  <input
                    id='SparkHubAttachment'
                    type='file'
                    multiple
                    onChange={handleUpload}
                    className='absolute opacity-0  top-0 bottom-0 right-0 left-0 font-inter cursor-pointer'
                  />
                  <svg
                    className='text-[#7E8B99] cursor-pointer hover:text-secondary z-50'
                    width='17'
                    height='19'
                    viewBox='0 0 17 19'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={e => {
                      e?.preventDefault();
                      document?.getElementById('SparkHubAttachment')?.click();
                    }}
                  >
                    <path
                      d='M14.1836 2.81641C13.2695 1.90234 11.7578 1.90234 10.8438 2.81641L4.09375 9.56641C2.58203 11.1133 2.58203 13.6094 4.09375 15.1211C5.64062 16.668 8.13672 16.668 9.68359 15.1211L15.0273 9.77734C15.3438 9.46094 15.8711 9.46094 16.1875 9.77734C16.5391 10.1289 16.5391 10.6562 16.1875 10.9727L10.8438 16.3164C8.66406 18.5312 5.11328 18.5312 2.93359 16.3164C0.71875 14.1367 0.71875 10.5859 2.93359 8.37109L9.68359 1.65625C11.2305 0.0742188 13.7969 0.0742188 15.3438 1.65625C16.9258 3.20312 16.9258 5.76953 15.3438 7.31641L8.91016 13.7852C7.78516 14.9102 5.95703 14.8047 4.97266 13.5742C4.12891 12.5195 4.23438 11.0078 5.18359 10.0586L10.5273 4.71484C10.8438 4.39844 11.3711 4.39844 11.6875 4.71484C12.0391 5.06641 12.0391 5.59375 11.6875 5.91016L6.37891 11.2539C6.02734 11.6055 5.99219 12.1328 6.30859 12.5195C6.66016 12.9766 7.29297 13.0117 7.71484 12.5898L14.1836 6.12109C15.0977 5.24219 15.0977 3.73047 14.1836 2.81641Z'
                      fill='currentColor'
                    />
                  </svg>{' '}
                </div>

                <div className='flex flex-row group justify-center items-center border border-gray-200 rounded-md px-[12px] h-[32px] cursor-pointer'>
                  <svg
                    className='group-hover:text-secondary text-[#7E8B99]'
                    width='20'
                    height='19'
                    viewBox='0 0 20 19'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M8.71875 0.425781C8.75391 0.320312 8.85938 0.25 9 0.25C9.10547 0.25 9.21094 0.320312 9.24609 0.425781L9.73828 1.76172L11.0742 2.25391C11.1797 2.28906 11.25 2.39453 11.25 2.5C11.25 2.64062 11.1797 2.74609 11.0742 2.78125L9.73828 3.27344L9.24609 4.57422C9.21094 4.67969 9.10547 4.75 9 4.75C8.85938 4.75 8.75391 4.67969 8.71875 4.57422L8.22656 3.27344L6.89062 2.78125C6.78516 2.74609 6.75 2.64062 6.75 2.5C6.75 2.39453 6.78516 2.28906 6.89062 2.25391L8.22656 1.76172L8.71875 0.425781ZM17.4023 0.777344L18.5977 1.97266C19.2656 2.64062 19.2656 3.69531 18.5977 4.36328L5.20312 17.7578C4.53516 18.4258 3.48047 18.4258 2.8125 17.7578L1.61719 16.5625C0.949219 15.8945 0.949219 14.8398 1.61719 14.1719L15.0117 0.777344C15.6797 0.109375 16.7344 0.109375 17.4023 0.777344ZM16.207 1.9375L12.3398 5.80469L13.5703 7.03516L17.4023 3.16797L16.207 1.9375ZM4.00781 16.5625L12.375 8.23047L11.1445 7L2.8125 15.3672L4.00781 16.5625ZM0.246094 4.39844L2.25 3.625L2.98828 1.65625C3.02344 1.48047 3.19922 1.375 3.375 1.375C3.51562 1.375 3.69141 1.48047 3.72656 1.65625L4.5 3.625L6.46875 4.39844C6.64453 4.43359 6.75 4.60938 6.75 4.75C6.75 4.92578 6.64453 5.10156 6.46875 5.13672L4.5 5.875L3.72656 7.87891C3.69141 8.01953 3.51562 8.125 3.375 8.125C3.19922 8.125 3.02344 8.01953 2.98828 7.87891L2.25 5.875L0.246094 5.13672C0.0703125 5.10156 0 4.92578 0 4.75C0 4.60938 0.0703125 4.43359 0.246094 4.39844ZM12.6211 13.3984L14.625 12.625L15.3633 10.6562C15.3984 10.4805 15.5742 10.375 15.75 10.375C15.8906 10.375 16.0664 10.4805 16.1016 10.6562L16.875 12.625L18.8438 13.3984C19.0195 13.4336 19.125 13.6094 19.125 13.75C19.125 13.9258 19.0195 14.1016 18.8438 14.1367L16.875 14.875L16.1016 16.8789C16.0664 17.0195 15.8906 17.125 15.75 17.125C15.5742 17.125 15.3984 17.0195 15.3633 16.8789L14.625 14.875L12.6211 14.1367C12.4453 14.1016 12.375 13.9258 12.375 13.75C12.375 13.6094 12.4453 13.4336 12.6211 13.3984Z'
                      fill='currentColor'
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={handle_send_message}
                disabled={
                  !textAreaValue.trim() ||
                  ConStore.upload_state.uploading ||
                  !uploadsComplete ||
                  ConStore.cons.get(ConStore.selected_conversation_id as string)
                    ?.updating_convo
                }
              >
                <div
                  id='send_button'
                  className={`cursor-pointer ${
                    textAreaValue.trim() &&
                    !ConStore.upload_state.uploading &&
                    uploadsComplete
                      ? 'bg-[#033EB5]'
                      : 'bg-[#033EB5] opacity-50'
                  }  px-4 py-[6px] rounded-md `}
                >
                  <p className='text-[14px] font-medium text-white'>Send</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default observer(MessageInput);
