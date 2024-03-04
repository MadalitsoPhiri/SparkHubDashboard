import { FC, useState, useRef, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import Button from '@/components/atoms/Button';
import ConfigInput from '@/components/atoms/ConfigInput';
import TextEditor from '@/components/atoms/TextEditor';
import { useOutsideClickDetector } from '@/hooks/useOutsideClickDetector';
import { AuthStore } from '@/state/AuthenticationStore';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { observer } from 'mobx-react-lite';

const FAQ: FC<any> = ({ index, faq, active_index, cancel_add_editing }) => {
  const [question_input, set_question_input] = useState('');
  const [answer_input, set_answer_input] = useState('');
  const [is_updating, set_is_updating] = useState<boolean>(false);
  const [is_deleting, set_is_deleting] = useState(false);

  const question_input_ref = useRef<any>(null);
  const answer_input_ref = useRef<any>(null);
  const active_index_ref = useRef(null);
  question_input_ref.current = question_input;
  answer_input_ref.current = answer_input;
  active_index_ref.current = active_index;
  useEffect(() => {
    set_answer_input(faq.answer);
    set_question_input(faq.question);
  }, []);
  useEffect(() => {
    if (active_index != index) {
      // reset input for FAQ
      set_answer_input(faq.answer);
      set_question_input(faq.question);
    }
  }, [active_index]);
  const handle_edit_clicked = () => {
    cancel_add_editing();
    WidgetConfigStore.set_faq_active_index(index);
  };
  const can_update = () => {
    return (
      question_input_ref.current != faq.question ||
      answer_input_ref.current != faq.answer
    );
  };

  const handle_delete = () => {
    set_is_deleting(true);
    AuthStore.socket?.emit(
      'delete_faq',
      {
        event_name: 'delete_faq',
        data: { id: faq._id },
      },
      (response: any) => {
        set_is_deleting(false);
        if (response.data) {
          WidgetConfigStore.delete_faq({ index });
        }
      },
    );
  };
  const handle_update = () => {
    // update_faq
    set_is_updating(true);
    AuthStore.socket?.emit(
      'update_faq',
      {
        event_name: 'update_faq',
        data: { id: faq._id, question: question_input, answer: answer_input },
      },
      (response: any) => {
        set_is_updating(false);

        if (response.data) {
          WidgetConfigStore.update_faq({ index, faq: response.data });

          if (active_index_ref.current === index) {
            WidgetConfigStore.set_faq_active_index(null);
          }
          set_answer_input(response.data.answer);
          set_question_input(response.data.question);
        }
      },
    );
  };
  const handle_cancel = () => {
    WidgetConfigStore.set_faq_active_index(null);
    // dispatch(set_add_editing(true));
    set_answer_input(faq.answer);
    set_question_input(faq.question);
  };
  const FaqRef = useRef(null);
  const handle_edit_blur = () => {
    // const old_question_same_as_new = question_input_ref.current === question;
    // const old_answer_same_as_new = answer_input_ref.current === answer;
    if (index === active_index_ref.current) {
      if (!can_update()) {
        WidgetConfigStore.set_faq_active_index(null);
      }
    }
  };
  useOutsideClickDetector(FaqRef, handle_edit_blur);
  return (
    <div
      ref={FaqRef}
      className={`${
        index === active_index ? 'shadow_surrounding ' : ''
      }  flex flex-col mb-6 p-4  border-gray-300 border rounded-[6px] group ${
        is_updating || is_deleting ? 'opacity-[0.4]' : ''
      } bg-white`}
      key={index}
    >
      <p className='text-gray-400 text-md font-medium leading-tight mb-1 my-2'>
        Question
      </p>
      {index === active_index ? (
        <ConfigInput
          type='text'
          disabled={is_updating || is_deleting}
          onChange={e => set_question_input(e.target.value)}
          value={question_input}
        />
      ) : (
        <div
          onClick={handle_edit_clicked}
          className='mb-4 w-full h-10 px-3 py-2.5 bg-[#FBFCFD] rounded-[4px] shadow-sm border border-border justify-start items-center gap-2 inline-flex'
        >
          <p className='text-placeholder text-md  leading-tight'>
            {faq.question}
          </p>
        </div>
      )}

      <p className='text-gray-400 text-md font-medium leading-tight my-2'>
        Answer
      </p>
      {index === active_index ? (
        <TextEditor setValue={set_answer_input} value={answer_input} />
      ) : (
        <div
          onClick={handle_edit_clicked}
          className='w-full min-h-10 px-3 py-2.5 bg-[#FBFCFD] rounded-[4px] shadow-sm border border-border justify-start items-center gap-2 inline-flex'
        >
          <p
            onClick={handle_edit_clicked}
            className='text-placeholder text-md  leading-tight break-words'
            dangerouslySetInnerHTML={{ __html: faq?.answer }}
          />
        </div>
      )}
      {index === active_index ? (
        <div className='mt-3 flex w-full justify-end space-x-4'>
          <Button
            type='button'
            onClick={handle_cancel}
            disabled={is_updating || is_deleting}
            text='Undo changes'
            size='sm'
            variant='outline'
          />

          <Button
            type='submit'
            text='Save'
            disabled={!can_update() || is_updating || is_deleting}
            onClick={handle_update}
            className={`${can_update() ? '' : 'pointer-events-none'} ${
              !is_updating || !is_deleting ? '' : 'pointer-events-none'
            } bg-[#1068EF]`}
          />
        </div>
      ) : (
        <div className='mt-3 flex w-full justify-end space-x-4'>
          <Button
            type='button'
            onClick={handle_edit_clicked}
            disabled={is_updating || is_deleting}
            text='Edit'
            size='sm'
            variant='outline'
          />
          <div
            onClick={handle_delete}
            className='px-[8.50px] py-1.5 bg-white rounded
     shadow border border-zinc-200 justify-start
     items-center gap-3 cursor-pointer flex'
          >
            <MdDelete className='w-4 h-4 text-warning' />
          </div>
        </div>
      )}
    </div>
  );
};
export default observer(FAQ);
