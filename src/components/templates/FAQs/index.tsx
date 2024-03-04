import { useEffect } from 'react';
import { useState, useRef } from 'react';

import { useOutsideClickDetector } from '@/hooks/useOutsideClickDetector';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import Spinner from '@/components/atoms/Spinner';
import FAQ from '../FAQ';
import Button from '@/components/atoms/Button';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { observer } from 'mobx-react-lite';
import TextEditor from '@/components/atoms/TextEditor';
import ConfigInput from '@/components/atoms/ConfigInput';

const FAQs = () => {
  const [add_edit_question, set_add_edit_question] = useState('');
  const [add_edit_answer, set_add_edit_answer] = useState('');
  const add_edit_ref = useRef<any>(null);
  const add_edit_answer_ref = useRef<any>(null);
  const add_edit_question_ref = useRef<any>();
  const adding_faq_ref = useRef<any>(null);
  add_edit_answer_ref.current = add_edit_answer;
  add_edit_question_ref.current = add_edit_question;
  adding_faq_ref.current = WidgetConfigStore.faq.is_adding_faq;
  const { get_faqs, create_faq } = useWidgetConfig();
  const add_edit_can_save = () => {
    return (
      add_edit_answer_ref.current != '' && add_edit_question_ref.current != ''
    );
  };

  const handle_start_add_edit = () => {
    WidgetConfigStore.set_faq_active_index(null);
    WidgetConfigStore.set_add_editing(true);
  };
  const handle_add_edit_blur = () => {
    if (
      add_edit_answer_ref.current === '' &&
      add_edit_question_ref.current === '' &&
      !adding_faq_ref.current
    ) {
      WidgetConfigStore.set_add_editing(false);
    }
  };

  const handle_cancel_add_editing = () => {
    set_add_edit_question('');
    set_add_edit_answer('');
    WidgetConfigStore.set_add_editing(false);
  };
  const handle_add_faq = () => {
    create_faq({
      widget_id: WidgetConfigStore.config.value,
      question: add_edit_question,
      answer: add_edit_answer,
    });
  };
  useOutsideClickDetector(add_edit_ref, handle_add_edit_blur);
  useEffect(() => {
    if (WidgetConfigStore.faq.faqs.length === 0) get_faqs();
  }, []);
  useEffect(() => {
    if (!WidgetConfigStore.faq.is_add_editing) {
      set_add_edit_question('');
      set_add_edit_answer('');
    }
  }, [WidgetConfigStore.faq.is_add_editing]);
  if (WidgetConfigStore.faq.fetching_faqs) {
    return (
      <div className='flex items-center justify-center mb-4'>
        <Spinner size={25} color='#033EB5' />
      </div>
    );
  }
  return (
    <div className='pt-2 pb-[30px]'>
      {WidgetConfigStore.faq.faqs.map((faq_item, index) => {
        return (
          <FAQ
            index={index}
            key={index}
            cancel_add_editing={handle_cancel_add_editing}
            adding_faq={WidgetConfigStore.faq.is_adding_faq}
            active_index={WidgetConfigStore.faq.faq_active_index}
            faq={faq_item}
          />
        );
      })}
      {WidgetConfigStore.faq.faqs.length <= 0 &&
        !WidgetConfigStore.faq.is_add_editing && (
          <div className='w-full h-[172px] px-4 py-6 bg-white rounded-lg border border-border flex-col justify-center items-center inline-flex'>
            <div className='self-stretch mb-6 flex-col justify-start items-center gap-2 flex'>
              <p className='text-center text-lightBlack text-md font-medium'>
                No questions added yet
              </p>
              <p className='self-stretch text-center text-gray-400 text-md font-medium'>
                Unlock your clients potential by exchanging valuable insights
                through questions and answers
              </p>
            </div>
            <Button
              onClick={handle_start_add_edit}
              type='button'
              text='Add first question'
              size='md'
              className='bg-[#1068EF]'
            />
          </div>
        )}

      {WidgetConfigStore.faq.is_add_editing && (
        <div
          ref={add_edit_ref}
          className={`bg-white shadow_surrounding  flex flex-col mb-6 p-4 border-gray-300 border rounded-[6px] border-primary-medium ${
            WidgetConfigStore.faq.is_adding_faq ? 'opacity-[0.4]' : ''
          }`}
        >
          <p className='font-medium text-md leading-[24px] text-[#222] mb-1'>
            Question
          </p>
          <ConfigInput
            type='text'
            disabled={WidgetConfigStore.faq.is_adding_faq}
            onChange={e => {
              set_add_edit_question(e.target.value);
            }}
            value={add_edit_question}
            placeholder='Type question here'
          />

          <p className='font-medium text-md leading-[24px] text-[#222] mb-1'>
            Answer
          </p>
          <TextEditor setValue={set_add_edit_answer} value={add_edit_answer} />
          <div>
            <div className='flex mt-[28px] w-full justify-end space-x-4'>
              <Button
                type='button'
                text='Cancel'
                onClick={handle_cancel_add_editing}
                variant='outline'
              />
              <Button
                type='submit'
                text='Add the question'
                disabled={
                  !add_edit_can_save() || WidgetConfigStore.faq.is_adding_faq
                }
                className={`${
                  add_edit_can_save() ? '' : 'opacity-[0.5] pointer-events-none'
                } bg-[#1068EF]`}
                onClick={handle_add_faq}
                size='sm'
              />
            </div>
          </div>
        </div>
      )}
      <div className='my-4 flex items-center'>
        {WidgetConfigStore.faq.faqs.length > 0 &&
          !WidgetConfigStore.faq.is_add_editing && (
            <div className='flex w-full justify-end'>
              <Button
                onClick={handle_start_add_edit}
                type='button'
                text='Add another question'
                size='sm'
                className='bg-[#1068EF]'
              />
            </div>
          )}
        {WidgetConfigStore.config.style.loading && (
          <Spinner size={25} color={'#334bfa'} />
        )}
      </div>
    </div>
  );
};
export default observer(FAQs);
