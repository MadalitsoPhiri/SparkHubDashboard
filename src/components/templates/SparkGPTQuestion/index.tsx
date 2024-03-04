import { useOutsideClickDetector } from '@/hooks/useOutsideClickDetector';
import { MdDelete } from 'react-icons/md';
import { useState, useRef, useEffect, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { AuthStore } from '@/state/AuthenticationStore';
import Button from '@/components/atoms/Button';
import ConfigInput from '@/components/atoms/ConfigInput';

const SparkGPTQuestion: FC<any> = ({
  index,
  spark_gpt_question,
  cancel_add_editing,
  active_question_index,
}) => {
  const [title_input, set_title_input] = useState('');
  const [answer_input, set_answer_input] = useState('');
  const [is_updating, set_is_updating] = useState(false);
  const [is_deleting, set_is_deleting] = useState(false);
  const [is_active, set_is_active] = useState(false);

  const spark_gpt_question_ref = useRef<HTMLDivElement>(null);

  const handle_edit_clicked = () => {
    cancel_add_editing();
    WidgetConfigStore.set_active_spark_gpt_question_index(index);
  };

  const can_update = () =>
    title_input !== spark_gpt_question.title ||
    answer_input !== spark_gpt_question.answer;

  const handle_delete = () => {
    set_is_deleting(() => true);

    AuthStore.socket?.emit(
      'delete_spark_gpt_question',
      {
        event_name: 'delete_spark_gpt_question',
        payload: { id: spark_gpt_question._id },
      },
      (response: any) => {
        set_is_deleting(() => false);

        if (response.error) {
          return;
        }

        WidgetConfigStore.delete_spark_gpt_question({ index });
      },
    );
  };

  const handle_update = () => {
    set_is_updating(() => true);

    AuthStore.socket?.emit(
      'update_spark_gpt_question',
      {
        event_name: 'update_spark_gpt_question',
        payload: {
          id: spark_gpt_question._id,
          title: title_input,
          answer: answer_input,
        },
      },
      (response: any) => {
        set_is_updating(() => false);

        if (response.error) {
          return;
        }

        WidgetConfigStore.update_spark_gpt_question({
          index,
          spark_gpt_question: response.data,
        }),
          set_answer_input(response.data.answer);
        set_title_input(response.data.title);

        if (is_active) {
          WidgetConfigStore.set_active_spark_gpt_question_index(null);
        }
      },
    );
  };

  const handle_cancel = () => {
    WidgetConfigStore.set_active_spark_gpt_question_index(null);

    set_answer_input(spark_gpt_question.answer);
    set_title_input(spark_gpt_question.title);
  };

  const handle_edit_blur = () => {
    if (is_active) {
      if (!can_update()) {
        WidgetConfigStore.set_active_spark_gpt_question_index(null);
      }
    }
  };

  useEffect(() => {
    set_is_active(() => index === active_question_index);
    if (is_active) {
      return;
    }

    set_answer_input(spark_gpt_question.answer);
    set_title_input(spark_gpt_question.title);
  }, [active_question_index]);

  useEffect(() => {
    set_answer_input(spark_gpt_question.answer);
    set_title_input(spark_gpt_question.title);
  }, []);

  useOutsideClickDetector(spark_gpt_question_ref, handle_edit_blur);

  return (
    <div
      ref={spark_gpt_question_ref}
      className={`${
        is_active ? 'shadow_surrounding' : ''
      }  flex flex-col mb-6 p-4  border-gray-300 border rounded-[6px] group ${
        is_updating || is_deleting ? 'opacity-[0.4]' : ''
      } bg-white`}
      key={index}
    >
      <p className='font-[600] text-[14px] leading-[24px] text-[#222] mb-1'>
        Question {index + 1}
      </p>
      {is_active ? (
        <ConfigInput
          type='text'
          disabled={
            !spark_gpt_question.is_deletable || is_updating || is_deleting
          }
          onChange={e => set_title_input(e.target.value)}
          value={title_input}
          placeholder='Type question here'
        />
      ) : (
        <div className='mb-4 w-full h-10 px-3 py-2.5 bg-[#FBFCFD] rounded-[4px] shadow-sm border border-border justify-start items-center gap-2 inline-flex'>
          <p className='text-gray-600 text-md  leading-tight'>
            {spark_gpt_question.title}
          </p>
        </div>
      )}

      <p className='font-[600] text-[14px] leading-[24px] text-[#222] mb-1'>
        Answer {index + 1}
      </p>
      {is_active ? (
        <ConfigInput
          type='text'
          disabled={is_updating || is_deleting}
          onChange={e => set_answer_input(e.target.value)}
          value={answer_input}
          placeholder='Type answer here'
        />
      ) : (
        <div
          onClick={handle_edit_clicked}
          className='mb-4 w-full h-10 px-3 py-2.5 bg-[#FBFCFD] rounded-[4px] shadow-sm border border-border justify-start items-center gap-2 inline-flex'
        >
          <p className='text-gray-600 text-md  leading-tight'>
            {spark_gpt_question.answer}
          </p>
        </div>
      )}
      {index === active_question_index ? (
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
            className='px-[8.50px] py-1.5 bg-white rounded shadow border border-zinc-200 justify-start
                       items-center gap-3 cursor-pointer flex'
          >
            <MdDelete className='w-4 h-4 text-warning' />
          </div>
        </div>
      )}
    </div>
  );
};
export default observer(SparkGPTQuestion);
