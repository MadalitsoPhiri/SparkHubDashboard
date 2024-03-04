import ChatSearchInput from '@/components/molecules/ChatSearchInput';
import { FC, Dispatch, SetStateAction, useEffect } from 'react';
import { Tab, TabPanel } from '@/components/molecules/Tab';
import { observer } from 'mobx-react-lite';
import { FilterDataType, SortDataType } from '../ConversationList/types';

import SidePanelHeader from '../SidePanelHeader';
import { Conversation } from '@/types/conversation.types';
import { AuthStore } from '@/state/AuthenticationStore';
import { ConStore } from '@/state/ConversationStore';

interface ConversationListHeaderProps {
  disableSearch: boolean;
  title: string;
  sortedBy: SortDataType[];
  setSortedBy: Dispatch<SetStateAction<SortDataType>>;
  sortData: SortDataType[];
  filterData: FilterDataType[];
  filterState: FilterDataType[];
  setFilterState: Dispatch<SetStateAction<FilterDataType>>;
  finalList: Array<Conversation>;
}
const ConversationListHeader: FC<ConversationListHeaderProps> = props => {
  const handleSearchInputChange = (e: any) => {
    ConStore.setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (ConStore.searchTerm != '') {
      ConStore.setSearchMode(true);
      ConStore.set_fetching_conversations(true);
      AuthStore.socket?.emit(
        'search_chat',
        {
          event_name: 'search_chat',
          data: { term: ConStore.searchTerm },
        },
        (response: any) => {
          ConStore.setSearchConversations(response.data);
          ConStore.set_fetching_conversations(false);
        },
      );
    } else {
      ConStore.setSearchMode(false);
      ConStore.set_fetching_conversations(false);
    }
  }, [ConStore.searchTerm]);
  return (
    <div className='px-4 flex flex-col shrink-0  border-gray-200 mb-4'>
      {!props.disableSearch && (
        <div className='flex flex-row items-center'>
          <SidePanelHeader {...props} />
        </div>
      )}
      <Tab onTabChange={index => props.setFilterState(props.filterData[index])}>
        <TabPanel title='Open'></TabPanel>
        <TabPanel title='Archived'></TabPanel>
      </Tab>
      <div className='w-full mt-4'>
        <ChatSearchInput
          type='text'
          className=''
          value={ConStore.searchTerm}
          onChange={handleSearchInputChange}
          placeholder='Search message'
          leftIcon={
            <svg
              width='13'
              height='13'
              viewBox='0 0 13 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.8125 11.5391L8.67188 8.39844C9.35156 7.57812 9.72656 6.52344 9.72656 5.375C9.72656 2.70312 7.52344 0.5 4.85156 0.5C2.15625 0.5 0 2.70312 0 5.375C0 8.07031 2.17969 10.25 4.85156 10.25C5.97656 10.25 7.03125 9.875 7.875 9.19531L11.0156 12.3359C11.1328 12.4531 11.2734 12.5 11.4375 12.5C11.5781 12.5 11.7188 12.4531 11.8125 12.3359C12.0469 12.125 12.0469 11.7734 11.8125 11.5391ZM1.125 5.375C1.125 3.3125 2.78906 1.625 4.875 1.625C6.9375 1.625 8.625 3.3125 8.625 5.375C8.625 7.46094 6.9375 9.125 4.875 9.125C2.78906 9.125 1.125 7.46094 1.125 5.375Z'
                fill='#656971'
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};
export default observer(ConversationListHeader);
