import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@/components/atoms/Container';
import Text from '@/components/atoms/Text';
import Tile from '@/components/atoms/Tile';
import DateFilter from '@/components/molecules/DateFilter';
import { Tab, TabPanel } from '@/components/molecules/Tab';
import { contactStore } from '@/state/ContactStore';
import { listStore } from '@/state/ListStore';
import { ConStore } from '@/state/ConversationStore';
import { useList } from '@/hooks/useList';
import ToolTip from '@/components/atoms/Tooltip';

const Overview = () => {
  const { getLists } = useList();
  const [open, setOpen] = useState(true);
  const myContacts = contactStore.myContacts.length;
  const allContacts = contactStore.contacts.length;
  const lists = listStore.lists.length;

  useEffect(() => {
    getLists();
  }, []);
  return (
    <div className={`w-full relative`}>
      <Container>
        <div className='flex justify-between items-center p-[24px]'>
          <div className='flex justify-between items-center space-x-16'>
            <span className='text-xl leading-7 py-4'>Overview</span>
            <ToolTip title='Coming soon' right={true}>
              <div className='w-[164px]'>
                <Tab onTabChange={() => null}>
                  <TabPanel title='Me' disabled>
                    <p hidden>Content of Tab 1 goes here.</p>
                  </TabPanel>
                  <TabPanel title='Team' disabled>
                    <p hidden>Content of Tab 3 goes here.</p>
                  </TabPanel>
                </Tab>
              </div>
            </ToolTip>
          </div>
          <ToolTip title='Coming soon'>
            <DateFilter />
          </ToolTip>
        </div>
        <div
          className={`grid grid-cols-4 w-full transition-max-h overflow-hidden duration-500 ease-in-out ${
            open ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <Tile
            name='All contacts'
            content={`${allContacts}`}
            statistics={true}
            statisticValue={+24.5}
            borderTop={true}
            borderLeft={true}
            borderRight={true}
          />
          <Tile
            name='My contacts'
            content={`${myContacts}`}
            statistics={true}
            statisticValue={-21.2}
            borderTop={true}
          />
          <Tile
            name='Replied messages'
            content='- -'
            statistics={true}
            statisticValue={undefined}
            borderTop={true}
            borderLeft={true}
          />
          <Tile
            name='Contact groups'
            content={`${lists}`}
            borderTop={true}
            borderLeft={true}
            borderRight={true}
          />
          <Tile
            name='Waiting for reply'
            content='- -'
            borderTop={true}
            borderLeft={true}
            borderRight={true}
          />
          <Tile name='Average response time' content='- -' borderTop={true} />
          <Tile
            name='Open'
            content={`${ConStore.open_conversations_count} conversations`}
            borderTop={true}
            borderLeft={true}
          />
          <Tile
            name='Archived'
            content={`${ConStore.closed_conversations_count} conversations`}
            borderTop={true}
            borderLeft={true}
            borderRight={true}
          />
        </div>
      </Container>
      <div className='flex justify-center items-center'>
        <div
          onClick={() => setOpen(!open)}
          className='duration-300 ease-in-out border border-border 
            shadow-md  py-1 rounded-[4px] w-[60px]
           text-center bg-white z-50 absolute cursor-pointer absolute'
        >
          <Text color='text-black' size='md'>
            {open ? 'Hide' : 'Show'}
          </Text>
        </div>
      </div>
    </div>
  );
};
export default observer(Overview);
