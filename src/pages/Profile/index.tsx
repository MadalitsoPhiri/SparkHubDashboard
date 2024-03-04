import Avatar from '@/components/atoms/Avatar';
import Spinner from '@/components/atoms/Spinner';
import Text from '@/components/atoms/Text';
import { MainContainer } from '@/components/templates/MainContainer';
import { useContact } from '@/hooks/useContact';
import { useExternalLink } from '@/hooks/useExternalLink';
import { useNote } from '@/hooks/useNote';
import { useTag } from '@/hooks/useTag';
import { contactStore } from '@/state/ContactStore';
import { Icon } from '@iconify/react';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArchiveBlockMenu from './deletemenu';
import Notes from './left/notes';
import Profile from './left/profile';
import Tags from './left/tags';
import UserDetails from './left/userDetails';
import PageView from './left/views';
import NewMessage from './newMessage';
import Activities from './right/activities';
import ConversationsList from './right/conversationsList';
import Tasks from './right/tasks';
import { Tab } from './tab';
import { OwnerAssignDropdown } from './ownerField';
import { useTeammate } from '@/hooks/useTeammate';

const UserProfile = () => {
  const [tab, setTab] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const { getContact, deleteContacts, blockContact, assignContact } =
    useContact();
  const { createNote, deleteNote, getNotes, editNote } = useNote();
  const { createTag, deleteTag, getTags } = useTag();
  const { createExternalLink, getUserExternalLinks } = useExternalLink();
  const { getTeamMates } = useTeammate();
  const _id = params.id || '';
  const contact = contactStore.contact;

  const showLocation = useMemo(() => {
    if (contact?.city && contact?.country) {
      return `${contact?.city}, ${contact?.country}`;
    } else if (contact?.city) {
      return contact?.city;
    } else if (contact?.country) {
      return contact?.country;
    } else {
      return 'unknown';
    }
  }, [contact?.country, contact?.city]);

  useEffect(() => {
    getContact(_id);
    getNotes(_id);
    getTags(_id);
    getUserExternalLinks(_id);
  }, [_id]);

  const handleAssignUser = (userId: string) => {
    assignContact(userId, _id);
  };

  useEffect(() => {
    getTeamMates();
  }, [_id, contact]);

  return (
    <MainContainer>
      {contactStore.fetchUser ? (
        <div className='py-10 flex justify-center items-center'>
          <Spinner color='blue' size={50} />
        </div>
      ) : (
        <>
          <div className='py-[20px] px-[25px] flex justify-between items-center sticky top-0 bg-white z-50 shadow-sm'>
            <div className='flex space-x-[24px] pb-[15px] pt-[20px]'>
              <div
                onClick={() => navigate(-1)}
                className=' w-[34px] h-[34px]  cursor-pointer rounded-[4px] flex justify-center items-center bg-[#FBFCFD] border border-border'
              >
                <Icon
                  icon='ph:arrow-left-light'
                  width={18}
                  height={18}
                  color='#000000'
                />
              </div>
              <div className='flex items-center'>
                <Avatar
                  src={contact?.profile_picture_url as string}
                  alt={contact?.user_name as string}
                  size='2lg'
                />
                <div className='flex ml-4 flex-col gap-2'>
                  <Text
                    size='lg'
                    color='text-lightBlack'
                    className='font-medium'
                  >
                    {contact?.user_name}
                  </Text>
                  <div className='flex items-center relative left-[-5px]'>
                    <div className='flex gap-1'>
                      <Icon
                        icon='mdi:location'
                        width={20}
                        height={20}
                        color='#898D94'
                      />
                      <Text
                        size='sm'
                        color='text-gray-400'
                        className='font-medium'
                      >
                        {showLocation}
                      </Text>
                    </div>
                    <div className='w-px h-5 border border-border bg-neutral-200 mx-4' />
                    <div className='flex items-center gap-2'>
                      <Icon
                        icon='mdi:clock'
                        width={18}
                        height={18}
                        color='#898D94'
                      />
                      <Text
                        size='sm'
                        color='text-gray-400'
                        className='font-medium'
                      >
                        {contact?.updatedAt
                          ? new Date(contact?.updatedAt).toDateString()
                          : 'GMT + 2'}
                      </Text>
                    </div>
                    <div className='w-px h-5 border border-border bg-neutral-200 mx-4' />
                    <div className='flex gap-2 items-center cursor-pointer'>
                      <Icon
                        icon='ph:tag-chevron-fill'
                        className='rotate-[270deg]'
                        width={18}
                        height={18}
                        color='#898D94'
                      />
                      <OwnerAssignDropdown
                        handleOnSelect={handleAssignUser}
                        contact={contact}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex space-x-[24px] items-center'>
              <NewMessage data={contact} />

              <ArchiveBlockMenu
                handleDelete={deleteContacts}
                handleBlock={blockContact}
              />
            </div>
          </div>
          <hr className='h-px border-0 bg-border'></hr>
          <div className='flex '>
            <div className='flex flex-col gap-y-4 border border-l-0 border-y-0 border-border p-[25px] w-[30%]'>
              <UserDetails data={contact} />
              <hr className='h-px border-0 bg-border'></hr>
              <Notes
                handleAddNote={createNote}
                handleDeleteLeadNote={deleteNote}
                handleEditNote={editNote}
              />
              {/* TODO:// uncomment and import if required */}
              {/* <hr className='h-px border-0 bg-border'></hr>
              <Events /> */}
              {/* <hr className='h-px border-0 bg-border'></hr>
              <Content /> */}
              <hr className='h-px border-0 bg-border'></hr>
              <PageView />
              <hr className='h-px border-0 bg-border'></hr>
              <Profile createExternalLink={createExternalLink} />
              <hr className='h-px border-0 bg-border'></hr>
              <Tags
                createTag={(values, { resetForm }) => {
                  createTag(values);
                  resetForm({ values: '' as any });
                }}
                deleteTag={deleteTag}
              />
            </div>
            <div className='px-[25px] pt-[25px] rounded-br-[16px] w-[70%]'>
              <Tab tab={tab} setTab={setTab} />
              {tab === 0 && <Activities />}
              {tab === 1 && <ConversationsList />}
              {tab === 2 && <Tasks />}
            </div>
          </div>{' '}
        </>
      )}
    </MainContainer>
  );
};
export default observer(UserProfile);
