import { FC } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { motion } from 'framer-motion';
import { CONVERSATION_STATUS } from '@/constants/index';
import { observer } from 'mobx-react-lite';
import { Conversation } from 'types/conversation.types';
import { AuthStore } from '@/state/AuthenticationStore';
import { ConStore } from '@/state/ConversationStore';
import { User } from 'types/user.types';
import { getInitialsFromName } from '@/utils/index';
import { useConversationListItem } from './hooks';
import getHighlightedText from '@/utils/highlight_helper';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

interface ConversationListItemProps {
  data: Conversation;
}
const ConversationListItem: FC<ConversationListItemProps> = ({ data }) => {
  const { img1Loaded, setImg1Loaded } = useConversationListItem(data);
  return (
    <motion.div
      layout
      className={`shrink-0 cursor-pointer w-full group px-[16px] mb-[12px]`}
      onClick={() => {
        ConStore.set_selected_conversation_id(data?._id ? data._id : null);
        // TODO:set focusInput(true);
      }}
    >
      <div
        className={`h-[72px] px-[12px] py-[8px] flex flex-row items-center overflow-hidden ${
          data.id === ConStore.selected_thread_id ||
          data?._id === ConStore.selected_conversation_id
            ? 'border border-[#E6E8EB] rounded-md shadow-sm'
            : 'hover:bg-gray-400 hover:bg-opacity-10 rounded-md '
        }`}
      >
        <div
          className={`rounded-full bg-[#24225B] flex flex-row justify-center shrink-0 items-center w-10 h-10   ${
            img1Loaded ? 'hidden' : 'block'
          }`}
        >
          <p className='text-xs font-medium text-white'>
            {!AuthStore.users_info?.has((data?.lead as User)?._id)
              ? getInitialsFromName((data?.lead as User)?.user_name)
              : getInitialsFromName(
                  AuthStore.users_info?.get((data?.lead as User)._id)
                    ?.user_name,
                )}
          </p>
        </div>
        <div
          className={`relative flex flex-row items-center shrink-0 ${
            img1Loaded ? 'w-10 h-10 2xl:w-10 2xl:h-10' : ''
          }`}
        >
          <img
            className={`rounded-full noselect  ${
              img1Loaded ? 'block' : 'hidden'
            }`}
            onError={() => setImg1Loaded(false)}
            onLoad={() => setImg1Loaded(true)}
            src={
              !AuthStore.users_info.has(data?.lead as User)
                ? (data?.lead as User).profile_picture_url
                : AuthStore.users_info?.get(data?.lead as User)
                    ?.profile_picture_url
            }
          />
        </div>

        <div className=' w-full  ml-[12px] flex-col truncate '>
          <div className=' flex flex-row justify-between mb-[4px]  items-center truncate '>
            <div className=' flex flex-row  items-center truncate '>
              <p
                className={`w-full text-xs  font-semibold hover:text-primary_color  ${
                  data?.selected ? 'text-black' : ''
                } noselect truncate  mr-1 `}
              >
                {!AuthStore.users_info.has(data?.lead as User)
                  ? (data?.lead as User).user_name
                  : AuthStore.users_info.get(data?.lead as User)?.user_name}
              </p>

              {AuthStore.users_online_info.get((data?.lead as User)?._id)
                ?.is_online && (
                <div className='shrink-0 rounded-full w-[8px] h-[8px] bg-[#01A63E] '></div>
              )}
            </div>
            <p
              className={`text-xs font-normal ml-2 text-[#24225B] truncate min-w-fit ${
                data?.status === CONVERSATION_STATUS.CLOSED
                  ? ''
                  : data?.updating_convo
                  ? 'hidden'
                  : ''
              }`}
            >
              {timeAgo.format(
                new Date(data?.last_message?.createdAt as Date),
                'mini-now',
              )}
            </p>
            {AuthStore.currentUser?._id !==
              (data.last_message?.sender as User)?._id &&
              data?.last_message?.seen == false && (
                <div className='ml-[8px] shrink-0 rounded-full w-[8px] h-[8px] bg-[#EE1624] '></div>
              )}
          </div>
          <p
            className={` ${
              AuthStore.currentUser?._id ===
              (data.last_message?.sender as User)?._id
                ? 'font-normal'
                : data?.last_message?.seen == true
                ? 'font-normal'
                : 'font-bold'
            } line-clamp-2   text-gray-600 text-xs chat_multiline_text mr-1 text-left `}
          >
            {ConStore.searchMode
              ? getHighlightedText(
                  data?.last_message?.content?.text || '',
                  ConStore.searchTerm,
                )
              : data?.last_message?.content?.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default observer(ConversationListItem);
