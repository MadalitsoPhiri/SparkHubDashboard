import { FC, useState } from 'react';
import { useEffect } from 'react';
import { RiInboxArchiveFill } from 'react-icons/ri';
import { ConStore } from '@/state/ConversationStore';
import Spinner from '@/components/atoms/Spinner';
import ConversationListItem from '@/components/molecules/ConversationListItem';
import ConversationListHeader from '../ConversationListHeader';
import { observer } from 'mobx-react-lite';
import { CONVERSATION_SORT, CONVERSATION_STATUS } from '@/constants/index';
import { Conversation } from 'types/conversation.types';

const sortData = [{ name: 'Latest' }, { name: 'Oldest' }];
const filterData = [
  {
    name: 'Open',
    icon: (
      <svg
        className='w-5 h-5  pointer-events-none group-hover:text-primary-light'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z'
        />
      </svg>
    ),
    count: 2,
  },
  {
    name: 'Archived',
    icon: (
      <RiInboxArchiveFill className='w-5 h-5  pointer-events-none group-hover:text-primary-light' />
    ),
    count: 4,
  },
];
const ConversationList: FC<any> = props => {
  const [sortedBy, setSortedBy] = useState(sortData[0]);
  const [finalList, setFinalList] = useState<Conversation[]>([]);
  const [filterState, setFilterState] = useState(filterData[0]);

  const sort = (x: Conversation, y: Conversation) => {
    if (
      ConStore.sorted_by === CONVERSATION_SORT.LATEST &&
      y.last_message &&
      x.last_message
    ) {
      return (
        new Date(y.last_message.createdAt).valueOf() -
        new Date(x.last_message.createdAt).valueOf()
      );
    } else if (
      ConStore.sorted_by === CONVERSATION_SORT.OLDEST &&
      y.last_message &&
      x.last_message
    ) {
      return (
        new Date(x.last_message.createdAt).valueOf() -
        new Date(y.last_message.createdAt).valueOf()
      );
    } else {
      return 0;
    }
  };

  const filter = (value: Conversation) => {
    if (filterState.name === 'Open') {
      return value.status === CONVERSATION_STATUS.OPEN;
    } else if (filterState.name === 'Archived') {
      return value.status === CONVERSATION_STATUS.CLOSED;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (ConStore.searchMode) {
      setFinalList(ConStore.search_conversations.filter(filter).sort(sort));
    } else {
      setFinalList(
        Array.from(ConStore.cons.values()).filter(filter).sort(sort),
      );
    }
    ConStore.setReRenderConversationList(false);
  }, [
    sortedBy,
    ConStore.reRenderConversationList,
    filterState,
    ConStore.searchMode,
    ConStore.search_conversations,
  ]);
  return (
    <div
      className={`bg-[#FBFCFD] min-w-[220px] shrink-0 flex flex-col  h-full w-${
        props.fullWidth ? 'full' : '[20%]'
      }`}
    >
      <ConversationListHeader
        {...props}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
        sortData={sortData}
        filterData={filterData}
        filterState={filterState}
        setFilterState={setFilterState}
        finalList={finalList}
      />
      {ConStore.fetching_conversations ? (
        <div className='flex justify-center p-5'>
          <Spinner size={40} color='#033EB5' />
        </div>
      ) : (
        <div className='h-full w-full overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded'>
          {finalList.sort(sort).map(item => {
            return (
              <ConversationListItem key={item._id} data={item} {...props} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default observer(ConversationList);
