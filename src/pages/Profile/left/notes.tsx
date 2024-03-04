import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Spinner from '@/components/atoms/Spinner';
import Text from '@/components/atoms/Text';
import { NotePayload } from '@/hooks/useNote';
import { Note, noteStore } from '@/state/NoteStore';
import { observer } from 'mobx-react-lite';
import { FC, KeyboardEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type NotesProps = {
  handleAddNote: (note: NotePayload) => void;
  handleDeleteLeadNote: (id: string) => void;
  handleEditNote: (note: Partial<NotePayload> & { id: string }) => void;
};

const Notes: FC<NotesProps> = ({
  handleAddNote,
  handleDeleteLeadNote,
  handleEditNote,
}) => {
  const notes = noteStore.notes;
  const [visibleNotes, setVisibleNotes] = useState<Note[]>(
    notes?.length > 2 ? notes.slice(0, 2) : notes,
  );
  const [noteId, setNoteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();

  const toggleNotesVisibility = () => {
    if (showMore) {
      setVisibleNotes(notes.slice(0, 2));
    } else {
      setVisibleNotes(notes);
    }
    setShowMore(!showMore);
  };

  const handleEnterPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      if (noteText.trim() != '') {
        e.preventDefault();
        setNoteText('');
        if (isEditing) {
          handleEditNote({
            note: noteText.trim(),
            id: noteId as string,
          });
          setIsEditing(false);
        } else {
          handleAddNote({
            note: noteText.trim(),
            lead_id: id as string,
          });
        }
        setNoteText('');
      }
    }
  };

  useEffect(() => {
    setVisibleNotes(notes?.length > 2 ? notes.slice(0, 2) : notes);
  }, [notes]);

  return (
    <div className='flex flex-col gap-y-1'>
      <Text size='md' color='text-black'>
        Note
      </Text>

      <Input
        type='text'
        placeholder='Add a note'
        value={noteText}
        onChange={e => setNoteText(e.target.value)}
        onKeyDown={handleEnterPressed}
        disabled={noteStore.loading}
        className='notes_shadow outline-none'
      />

      {noteStore.loading ? (
        <div className='flex justify-center items-center pt-5'>
          <Spinner size={25} color='#033EB5' />
        </div>
      ) : (
        visibleNotes?.map((note, index) => (
          <div
            key={index}
            className={`bg-secondary px-2 py-1 rounded-[4px] my-1 group flex items-center justify-between`}
          >
            <Text size='sm' color='text-white'>
              {note.note}
            </Text>

            <div className='flex items-center gap-2'>
              <button
                className='p-1 hover:bg-white/10 rounded'
                onClick={() => {
                  setNoteId(note._id);
                  setNoteText(note.note);
                  setIsEditing(true);
                }}
              >
                <svg
                  className={`w-6 h-6 text-white cursor-pointer invisible ${'group-hover:visible'}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M13.293 5.293a1 1 0 00-1.414 0L4 12.586V16h3.414l7.293-7.293a1 1 0 000-1.414l-2-2zM5.414 14H5v-.414l7-7L12.586 7l-7 7z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <button
                className='p-1 hover:bg-white/10 rounded'
                onClick={() => handleDeleteLeadNote(note._id)}
              >
                <svg
                  className={`w-6 h-6 text-white cursor-pointer invisible ${'group-hover:visible'}`}
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
              </button>
            </div>
          </div>
        ))
      )}
      {notes.length > 2 && (
        <Button
          text={showMore ? 'See less' : 'See more'}
          variant='outline'
          className='w-full h-[32px] mt-4'
          onClick={toggleNotesVisibility}
        />
      )}
    </div>
  );
};

export default observer(Notes);
