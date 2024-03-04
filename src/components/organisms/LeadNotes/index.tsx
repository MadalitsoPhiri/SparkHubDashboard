import Spinner from '@/components/atoms/Spinner';
import { AuthStore } from '@/state/AuthenticationStore';
import { ConStore } from '@/state/ConversationStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { User } from 'types/user.types';

const LeadNotes = () => {
  const [notes, set_notes] = useState<any[]>([]);
  const [currentEditNote, setCurrentEditNote] = useState<any>(null);
  const [deleting_notes, set_deleting_notes] = useState({});
  const [current_user_info, set_current_info] = useState<User | null>(null);
  const [inputActive, SetInputActive] = useState(false);
  const [see_more_toogled, set_see_more_toogled] = useState(false);
  const [is_adding_note, set_is_adding_note] = useState(false);
  const [is_updating_note, set_is_updating_note] = useState(false);
  const [fetching_lead_notes, set_fetching_lead_notes] = useState(false);
  const [cached_note, set_cached_note] = useState('');
  const [notes_input, set_notes_input] = useState('');
  useEffect(() => {
    set_current_info(null);
    set_notes([]);
    set_see_more_toogled(false);
    set_deleting_notes({});
    const current_conversation = ConStore.cons.get(
      ConStore.selected_conversation_id as string,
    );
    if (current_conversation?.lead) {
      const current_users_info = AuthStore.users_info.get(
        (current_conversation.lead as User)._id,
      );
      if (current_users_info) {
        set_current_info(current_users_info);
        // set_user_name(current_users_info.user_name);
      }
    }
    // set_current_info();
  }, [ConStore.selected_conversation_id]);
  useEffect(() => {
    if (current_user_info) {
      // fetch lead notes
      handle_get_lead_notes();
      set_fetching_lead_notes(true);
    }
  }, [current_user_info]);
  const handle_get_lead_notes = () => {
    set_fetching_lead_notes(true);

    AuthStore.socket?.emit(
      'get_lead_notes',
      { event_name: 'get_lead_notes', data: { id: current_user_info?._id } },
      (response: any) => {
        if (response.data) {
          set_notes(response.data);
        }
        set_fetching_lead_notes(false);
      },
    );
  };

  const handle_delete_lead_note = (index: number) => {
    set_deleting_notes(prev => {
      prev = { ...prev, [notes[index]._id]: notes[index] };
      return prev;
    });
    AuthStore.socket?.emit(
      'delete_lead_note',
      { event_name: 'delete_lead_note', data: { id: notes[index]._id } },
      (response: any) => {
        if (response.data) {
          set_deleting_notes((prev: any) => {
            delete prev[response.data._id];
            return prev;
          });
          set_notes(prev => {
            const copy = [...prev];
            const index = copy.findIndex(item => {
              return item._id === response.data._id;
            });
            copy.splice(index, 1);

            return copy;
          });
        }
      },
    );
  };
  const handleStartEdit = (index: number) => {
    setCurrentEditNote(notes[index]);
  };
  const handle_add_note = (note: any) => {
    set_is_adding_note(!is_adding_note);
    // dispatch call here
    AuthStore.socket?.emit(
      'create_lead_note',
      {
        event_name: 'create_lead_note',
        data: { lead_id: current_user_info?._id, note },
      },
      (response: any) => {
        set_notes(prev => {
          prev.unshift(response.data);
          return prev;
        });
        set_is_adding_note(false);
      },
    );
  };

  const handle_update_note = (index: number) => {
    set_is_updating_note(true);

    // dispatch call here
    AuthStore.socket?.emit(
      'update_lead_note',
      {
        event_name: 'update_lead_note',
        data: { id: currentEditNote?._id, ...currentEditNote },
      },
      (response: any) => {
        set_notes(prev => {
          prev[index] = response.data;
          return prev;
        });
        setCurrentEditNote(null);
        set_is_updating_note(false);
      },
    );
  };
  const save_note = () => {
    if (notes_input.trim() != '' && !is_adding_note) {
      set_cached_note(notes_input);
      set_notes_input('');
      handle_add_note(notes_input);
    }
  };
  const handle_enter_pressed = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      save_note();
    }
  };
  const handleEditBlur = () => null;
  const handleUpdateNote = (index: number) => {
    handle_update_note(index);
  };
  const on_notes_input_change = (e: any) => {
    set_notes_input(e.target.value);
  };
  return (
    <div className='w-full'>
      <input
        value={notes_input}
        onFocus={() => SetInputActive(true)}
        onBlur={() => setTimeout(() => SetInputActive(false), 1000)}
        onKeyDown={handle_enter_pressed}
        disabled={
          is_adding_note ||
          ConStore.cons.get(ConStore.selected_conversation_id as string)
            ?.updating_convo
        }
        onChange={on_notes_input_change}
        className={`${
          is_adding_note ? 'opacity-[0.45]' : ''
        } w-full text-[14px] 3xl:px-[12px] font-medium 3xl:py-[10px] 3xl:text-[15px] 2xl:text-[13px] outline-none  px-[12px] py-[10px] h-[32px] rounded-sm border-[1px] border-[#DFE1E6] mt-2 bg-white shadow`}
        placeholder='Add a note'
      />
      {!is_adding_note && inputActive && (
        <div
          onClick={save_note}
          className={`w-full  rounded-sm shadow-sm mt-2 bg-white cursor-pointer flex flex-row justify-center items-center h-[32px] border border-[#DFE1E6]`}
        >
          <p className='text-[14px] text-[#161518] font-medium'>Save Note</p>
        </div>
      )}
      {fetching_lead_notes && (
        <div className='flex w-full justify-center items-center my-5'>
          <Spinner size={20} color={'#033EB5'} />
        </div>
      )}
      {!fetching_lead_notes && is_adding_note && cached_note && (
        <div className='bg-white px-4 py-2 border border-[#DFE1E6] rounded-sm shadow-sm my-3 relative group opacity-[0.45]'>
          <p className='break-words text-[14px] text-[#7E8B99] 3xl:text-[15px] 2xl:text-[14px]'>
            {cached_note}
          </p>
        </div>
      )}
      {!fetching_lead_notes && (
        <div className='mt-4'>
          {notes.map((note, index) => {
            if (!see_more_toogled && index > 1) return null;
            return (
              <div
                key={index}
                className={`${
                  // eslint-disable-next-line no-prototype-builtins
                  deleting_notes.hasOwnProperty(note._id) ||
                  (currentEditNote?._id === note._id && is_updating_note)
                    ? 'opacity-[0.4]'
                    : ''
                } bg-white px-4 py-2 border border-[#DFE1E6] rounded-md shadow-sm my-3 relative group w-full `}
              >
                {currentEditNote?._id === note._id ? (
                  <input
                    disabled={
                      currentEditNote?._id === note._id && is_updating_note
                    }
                    value={currentEditNote.note}
                    type='text'
                    onBlur={handleEditBlur}
                    onChange={(e: any) => {
                      setCurrentEditNote({
                        ...currentEditNote,
                        note: e.target.value,
                      });
                    }}
                    className='outline-none break-words text-[14px] text-[#7E8B99] 3xl:text-[15px] 2xl:text-[14px] w-full mb-2'
                  />
                ) : (
                  <p className='break-words text-[14px] text-[#7E8B99] 3xl:text-[15px] 2xl:text-[14px] mb-2'>
                    {note.note}
                  </p>
                )}

                {!(is_adding_note || is_updating_note) && (
                  <div className='flex flex-row w-full items-center justify-end'>
                    {currentEditNote?._id === note._id ? (
                      <div
                        onClick={() => handleUpdateNote(index)}
                        className='flex flex-row border shadow-sm rounded-md cursor-pointer h-[32px] border-[#DFE1E6] border-b-2  px-[10px] justify-center items-center mr-2'
                      >
                        <p>Save</p>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleStartEdit(index)}
                        className='flex flex-row border shadow-sm rounded-md cursor-pointer h-[32px] border-[#DFE1E6] border-b-2  px-[10px] justify-center items-center mr-2'
                      >
                        <p>Edit</p>
                      </div>
                    )}
                    <div
                      className={`${
                        // eslint-disable-next-line no-prototype-builtins
                        deleting_notes.hasOwnProperty(note._id) ? 'hidden' : ''
                      }flex flex-row border shadow-sm rounded-md cursor-pointer h-[32px] border-[#DFE1E6] border-b-2 px-[10px] justify-center items-center`}
                      onClick={() => handle_delete_lead_note(index)}
                    >
                      <svg
                        width='11'
                        height='13'
                        viewBox='0 0 11 13'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M3.66406 0.921875C3.78125 0.664062 4.03906 0.5 4.32031 0.5H7.15625C7.4375 0.5 7.69531 0.664062 7.8125 0.921875L8 1.25H10.25C10.6484 1.25 11 1.60156 11 2C11 2.42188 10.6484 2.75 10.25 2.75H1.25C0.828125 2.75 0.5 2.42188 0.5 2C0.5 1.60156 0.828125 1.25 1.25 1.25H3.5L3.66406 0.921875ZM9.73438 11.4453C9.71094 12.0547 9.21875 12.5 8.60938 12.5H2.86719C2.25781 12.5 1.76562 12.0547 1.74219 11.4453L1.22656 3.5H10.25L9.73438 11.4453Z'
                          fill='#EE1624'
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {notes.length > 2 && !fetching_lead_notes && (
        <div
          className='w-full justify-center flex flex-row items-center border border-[#DFE1E6] shadow-sm rounded-[4px] h-[32px] cursor-pointer text-[11px] 3xl:text-[14px] 2xl:text-[12.5px] '
          onClick={() => set_see_more_toogled(!see_more_toogled)}
        >
          {see_more_toogled ? (
            <p className='text-[14px] text-[#161518] font-medium'>see less</p>
          ) : (
            <p className='text-[14px] text-[#161518] font-medium'>see more</p>
          )}
        </div>
      )}
    </div>
  );
};
export default observer(LeadNotes);
