import { useState } from 'react';
import { useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import routeNames from '@/routes/routeNames';
import { ConStore } from '@/state/ConversationStore';
import { Conversation } from 'types/conversation.types';
import { observer } from 'mobx-react-lite';
import UserInfo from '../UserInfo';
import LeadNotes from '../LeadNotes';
import { CONVERSATION_STATUS } from '@/constants/index';
import { useChatConversation } from '@/hooks/useChatConversation';

const ConversationProfilePanel = () => {
  const navigate = useNavigate();
  const [current_conversation, set_current_conversation] = useState<
    Conversation | undefined | null
  >(null);

  const { update_conversation_status } = useChatConversation();
  // https://www.google.com/maps/place/lat,lng
  const ToogleConversationStatus = () => {
    if (
      ConStore.cons.get(ConStore.selected_conversation_id as string)?.status ===
      CONVERSATION_STATUS.OPEN
    ) {
      update_conversation_status({
        conversation_id: ConStore.selected_conversation_id as string,
        status: CONVERSATION_STATUS.CLOSED,
      });
    } else {
      update_conversation_status({
        conversation_id: ConStore.selected_conversation_id as string,
        status: CONVERSATION_STATUS.OPEN,
      });
    }
  };
  useEffect(() => {
    const current_conversation_result = ConStore.cons.get(
      ConStore.selected_conversation_id as string,
    );
    if (current_conversation_result) {
      set_current_conversation(current_conversation_result);
    }
    // set_current_info();
  }, [ConStore.selected_conversation_id, ConStore.reRenderMessages]);
  return (
    <div className='shrink-0  min-w-[192px] w-[20%] h-full   bg-[#FBFCFD] flex flex-col'>
      {/* <RightSidePanel className="overflows pb-[250px]" /> */}
      <div className='w-full  shrink-0 border-b flex flex-col justify-between border-[#EFEFEF] pb-6  p-4 3xl:p-4'>
        <div className='flex justify-between w-full mb-[6px]'>
          <p className='text-[12px] 3xl:text-[14.5px] 2xl:text-[13.5px] font-medium text-[#222124]'>
            Conversation details
          </p>
          <FiSettings
            className='text-gray-500 cursor-pointer h-[13px] w-[13px] 3xl:h-[17px] 3xl:w-[17px] 2xl:h-[15px] 2xl:w-[15px] sr-only'
            onClick={() => navigate(routeNames.dashboard.settings)}
          />
        </div>
        <div className='flex flex-row items-center'>
          <p className='text-[12px] 3xl:text-[13px] 2xl:text-[12px]  font-normal text-[#5F5F61] mr-2'>
            ID{' '}
          </p>
          {current_conversation ? (
            <p className='text-[12px] 3xl:text-[13px]  2xl:text-[12px] font-normal text-[#5F5F61] overflow-hidden whitespace-no-wrap truncate'>
              {ConStore.selected_conversation_id}
            </p>
          ) : null}
        </div>
      </div>
      <div className='overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded flex-1  p-4 3xl:p-4'>
        <UserInfo />
        <LeadNotes />
      </div>
      <div className='p-4 3xl:p-4'>
        <div
          className={`w-full justify-center flex flex-row items-center border border-[#DFE1E6]  shadow-sm rounded-[4px] h-[32px] cursor-pointer ${
            ConStore.cons.get(ConStore.selected_conversation_id as string)
              ?.updating_convo
              ? 'pointer-events-none opacity-50'
              : ''
          }`}
          onClick={ToogleConversationStatus}
        >
          <p className='text-[14px] 3xl:text-[13.5px] 2xl:text-[12.5px] font-medium text-[#161518] '>
            {ConStore.cons.get(ConStore.selected_conversation_id as string)
              ?.status === CONVERSATION_STATUS.OPEN
              ? 'Archive Chat'
              : 'Open Chat'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default observer(ConversationProfilePanel);
