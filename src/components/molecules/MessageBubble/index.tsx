/* eslint-disable @typescript-eslint/no-unused-vars */
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { FC, useState } from 'react';
import { ATTACHMENT_TYPE, MESSAGE_TYPE, USERTYPE } from '../../../constants';
import { observer } from 'mobx-react-lite';
import { Message } from 'types/message.type';
import { AuthStore } from '@/state/AuthenticationStore';
import { User } from 'types/user.types';
import { getInitialsFromName } from '@/utils/index';
import Spinner from '@/components/atoms/Spinner';
import { ConStore } from '@/state/ConversationStore';
import getHighlightedText from '@/utils/highlight_helper';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface MessageBubbleProps {
  messageData: Message;
  isLastBubble: boolean;
  isSameSender: boolean;
}
const MessageBubble: FC<MessageBubbleProps> = ({
  messageData,
  isLastBubble,
  isSameSender,
}) => {
  //   const { currentUser, users_info } = useSelector(authSelector);
  const [img1Loaded, setImg1Loaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDeletingMessage, setIsDeletingMessage] = useState(false);

  return messageData?.type === MESSAGE_TYPE.INFO ? (
    <div className='w-full flex justify-center my-4'>
      <p className='text-gray-500 text-[11px] 2xl:text-[15px]'>
        {messageData?.content?.payload
          ? `${
              messageData?.content?.payload?.assigned_by?._id ===
              AuthStore.currentUser?._id
                ? 'You'
                : messageData?.content?.payload?.assigned_by?.user_name
            } assigned this conversation to ${
              messageData?.content?.payload?.assigned_by?._id ===
              AuthStore.currentUser?._id
                ? 'yourself'
                : messageData?.content?.payload?.assigned_by?.user_name
            } ${timeAgo?.format(new Date(messageData?.content?.payload?.date))}`
          : 'this conversation is assigned now.'}
      </p>
    </div>
  ) : (
    <div
      className={`flex justify-start group mb-[16px] ${
        (messageData?.sender as User)?.type === USERTYPE.CLIENT
          ? 'flex-row'
          : 'flex-row-reverse'
      }  ${isDeletingMessage ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <div
        className={`shrink-0 mr-2 ${
          (messageData?.sender as User)?.type === USERTYPE.CLIENT
            ? ''
            : 'hidden'
        }`}
      >
        <div
          className={`rounded-full flex flex-row justify-center items-center w-10 h-10 ${
            img1Loaded ? 'hidden' : 'block'
          } ${isDeletingMessage ? 'bg-[#6652a981]' : 'bg-[#24225B]'}`}
        >
          <p className='text-xs font-medium text-white'>
            {!AuthStore.users_info.has((messageData?.sender as User)?._id)
              ? getInitialsFromName((messageData?.sender as User)?.user_name)
              : getInitialsFromName(
                  AuthStore.users_info.get((messageData?.sender as User)?._id)
                    .user_name,
                )}
          </p>
        </div>
        <div
          className={`flex flex-row items-center shrink-0 ${
            img1Loaded ? 'w-10 h-10 2xl:w-10 2xl:h-10' : ''
          }`}
        >
          <img
            className={`rounded-full noselect ${
              img1Loaded ? 'block' : 'hidden'
            }`}
            onError={() => setImg1Loaded(false)}
            onLoad={() => setImg1Loaded(true)}
            src={(messageData?.sender as User)?.profile_picture_url}
          />
        </div>
      </div>
      <div
        className={`flex flex-col    ${
          (messageData?.sender as User)?.type === USERTYPE.CLIENT
            ? 'items-start'
            : 'ml-6 items-end'
        }  mr-2 max-w-[50%]`}
      >
        {(messageData?.sender as User)?.type === USERTYPE.CLIENT && (
          <p className='text[#555F6D] text-[12px] mb-[4px]'>
            {(messageData?.sender as User)?.user_name}
          </p>
        )}
        <div
          className={` p-3 ${
            isDeletingMessage
              ? 'bg-[#fdf1b08a]'
              : (messageData?.sender as User)?.type === USERTYPE.CLIENT
              ? ' rounded-tl-[0px] border border-[#0B132412] shadow-sm'
              : `${
                  isSameSender ? 'rounded-tr-[0px]' : 'rounded-br-[0px]'
                } bg-[#033EB5]`
          }    rounded-[4px] flex flex-col `}
        >
          <p
            className={` text-[12px] 2xl:text-[13px]  3xl:text-[18px] font-medium   ${
              isDeletingMessage
                ? 'text-[#676767]'
                : (messageData?.sender as User)?.type === USERTYPE.CLIENT
                ? 'text-[#161518]'
                : 'text-white'
            } `}
          >
            {ConStore.searchMode
              ? getHighlightedText(
                  messageData?.content?.text || '',
                  ConStore.searchTerm,
                )
              : messageData?.content?.text}
          </p>

          {messageData?.attachments.filter(
            attachment => attachment.type === ATTACHMENT_TYPE.IMAGE,
          ).length > 0 && (
            <div
              className={`rounded-md  mt-4 grid ${
                messageData?.attachments.filter(
                  attachment => attachment.type === ATTACHMENT_TYPE.IMAGE,
                ).length > 1
                  ? 'gap-2'
                  : ''
              }  grid-container--fit w-full`}
            >
              {messageData?.attachments
                .filter(attachment => attachment.type === ATTACHMENT_TYPE.IMAGE)
                .map((attachment, index) => {
                  if (
                    messageData?.attachments.filter(
                      attachment => attachment.type === ATTACHMENT_TYPE.IMAGE,
                    ).length === 1
                  ) {
                    return (
                      <div
                        key={index}
                        className='rounded-lg  w-[100%] h-[100%] bg-black overflow-hidden'
                      >
                        <img
                          src={attachment.attachment_url as string}
                          className='w-[100%] h-[100%] '
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className='rounded-lg  w-[100%] h-[100%] bg-black overflow-hidden'
                      >
                        <img
                          src={attachment.attachment_url as string}
                          className='w-full h-full object-contain'
                        />
                      </div>
                    );
                  }
                })}
            </div>
          )}
          {messageData?.attachments.filter(
            attachment => attachment.type === ATTACHMENT_TYPE.FILE,
          ).length > 0 && (
            <div className='flex flex-col mt-4 w-[100%] gap-2'>
              {messageData?.attachments
                .filter(attachment => attachment.type === ATTACHMENT_TYPE.FILE)
                .map(attachment => {
                  return (
                    <a
                      href={attachment.attachment_url as string}
                      key={attachment.attachment_url}
                    >
                      <div
                        className={`flex flex-row items-center py-1 px-2 rounded-md ${
                          (messageData?.sender as User)?.type ===
                          USERTYPE.CLIENT
                            ? 'bg-primaryColor'
                            : 'bg-sideBarColor'
                        }`}
                      >
                        <svg
                          className='mr-1 w-3 h-3 hover:text-primary_color text-gray-500 shrink-0 '
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13'
                          ></path>
                        </svg>
                        <p className='truncate text-[12px] text-[#6652A9]'>
                          {attachment.attachment_name
                            ? attachment.attachment_name
                            : attachment.attachment_url}
                        </p>
                      </div>
                    </a>
                  );
                })}
            </div>
          )}
        </div>

        {isLastBubble && (
          <div className='flex flex-row  items-center mt-2'>
            {(messageData?.sender as User)?.type === USERTYPE.AGENT &&
              messageData?.status !== 'sending' && (
                <div className='mr-1'>
                  <svg
                    width='14'
                    height='9'
                    viewBox='0 0 14 9'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13.0312 0.566406C13.3047 0.839844 13.3047 1.25 13.0312 1.49609L5.8125 8.71484C5.56641 8.98828 5.15625 8.98828 4.91016 8.71484L1.19141 4.99609C0.917969 4.75 0.917969 4.33984 1.19141 4.06641C1.4375 3.82031 1.84766 3.82031 2.09375 4.06641L5.375 7.34766L12.1289 0.566406C12.375 0.320312 12.7852 0.320312 13.0312 0.566406Z'
                      fill={`${
                        messageData?.seen === true ? '#459BC9' : '#7E8B99'
                      }`}
                    />
                  </svg>
                </div>
              )}

            {messageData?.status === 'sending' ? (
              <p className='text-[12px] text-[#7E8B99] font-thin break-words mr-1'>
                sending
              </p>
            ) : (
              <p className='text-[12px] text-[#7E8B99] font-thin break-words mr-1'>
                {messageData && isDeletingMessage
                  ? 'deleting'
                  : `${
                      (messageData?.sender as User)._id ===
                        AuthStore.currentUser?._id && messageData?.seen === true
                        ? 'seen'
                        : ''
                    } ${timeAgo.format(new Date(messageData.createdAt))}`}
              </p>
            )}
          </div>
        )}
      </div>
      {isDeletingMessage ? <Spinner size={20} color={'#334bfa'} /> : <></>}
    </div>
  );
};
export default observer(MessageBubble);
