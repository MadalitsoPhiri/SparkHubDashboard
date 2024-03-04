import { useOutsideClickDetector } from '@/hooks/useOutsideClickDetector';

import { useEffect, useState, useRef } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import Spinner from '@/components/atoms/Spinner';
import SparkGPTQuestion from '@/components/templates/SparkGPTQuestion';
import { observer } from 'mobx-react-lite';
import ConfigInput from '@/components/atoms/ConfigInput';
import Button from '@/components/atoms/Button';

const SparkGPT = () => {
  const add_edit_ref = useRef<HTMLDivElement>(null);
  const { create_spark_gpt_question, get_spark_gpt_question_list } =
    useWidgetConfig();
  const [edited_added_question_title, set_edited_added_question_title] =
    useState('');
  const [edited_added_question_answer, set_edited_added_question_answer] =
    useState('');

  const can_save_edition = () => {
    return !!(
      edited_added_question_answer.length && edited_added_question_title.length
    );
  };

  const handle_edit_added_question = () => {
    WidgetConfigStore.set_active_spark_gpt_question_index(null);
    WidgetConfigStore.set_is_editing_added_spark_gpt_question(true);
  };

  const handle_blur_added_question = () => {
    if (
      can_save_edition() &&
      !WidgetConfigStore.spark_gpt_survey.is_adding_spark_gpt_question
    ) {
      WidgetConfigStore.set_is_editing_added_spark_gpt_question(false);
    }
  };

  const handle_cancel_add_editing = () => {
    set_edited_added_question_title('');
    set_edited_added_question_answer('');

    WidgetConfigStore.set_is_editing_added_spark_gpt_question(false);
  };

  const handle_add_spark_gpt_question = () => {
    create_spark_gpt_question({
      title: edited_added_question_title,
      answer: edited_added_question_answer,
    });
  };

  useEffect(() => {
    if (WidgetConfigStore.spark_gpt_survey?.spark_gpt_question_list?.length) {
      return;
    }

    get_spark_gpt_question_list();
  }, []);

  useEffect(() => {
    if (WidgetConfigStore.spark_gpt_survey?.is_adding_spark_gpt_question) {
      return;
    }

    set_edited_added_question_answer(() => '');
    set_edited_added_question_title(() => '');
  }, [WidgetConfigStore.spark_gpt_survey?.is_adding_spark_gpt_question]);

  useOutsideClickDetector(add_edit_ref, handle_blur_added_question);

  return WidgetConfigStore.spark_gpt_survey
    ?.fetching_spark_gpt_question_list ? (
    <div className='flex items-center justify-center mb-4'>
      <Spinner size={25} color='#334bfa' />
    </div>
  ) : (
    <div className='pt-[0px] pb-[30px] '>
      {WidgetConfigStore.spark_gpt_survey?.spark_gpt_question_list?.map(
        (spark_gpt_question, index) => {
          return (
            <SparkGPTQuestion
              key={index}
              index={index}
              spark_gpt_question={spark_gpt_question}
              cancel_add_editing={handle_cancel_add_editing}
              active_question_index={
                WidgetConfigStore.spark_gpt_survey
                  ?.active_spark_gpt_question_index
              }
              is_adding_spark_gpt_question={
                WidgetConfigStore.spark_gpt_survey?.is_adding_spark_gpt_question
              }
            />
          );
        },
      )}
      {WidgetConfigStore.spark_gpt_survey?.spark_gpt_question_list?.length <=
        0 &&
        !WidgetConfigStore.spark_gpt_survey
          ?.is_editing_added_spark_gpt_question && (
          <div className='w-full h-[172px] px-4 py-6 bg-white rounded-[4px] border border-border flex-col justify-center items-center gap-6 inline-flex'>
            <div className='self-stretch h-[68px] flex-col justify-start items-center gap-2 flex'>
              <div className='text-center text-neutral-900 text-md font-medium leading-tight'>
                No questions added yet
              </div>
              <div className='self-stretch text-center text-zinc-500 text-md font-medium leading-tight'>
                Unlock your clients potential by exchanging valuable insights
                through questions and answers
              </div>
            </div>
            <Button
              onClick={handle_edit_added_question}
              type='button'
              text='Add first question'
              size='sm'
              className='bg-[#1068EF]'
            />
          </div>
        )}

      {WidgetConfigStore.spark_gpt_survey
        ?.is_editing_added_spark_gpt_question && (
        <div
          ref={add_edit_ref}
          className={`bg-white shadow_surrounding  flex flex-col mb-6 p-4 border-gray-300 border rounded-[6px] ${
            WidgetConfigStore.spark_gpt_survey?.is_adding_spark_gpt_question
              ? 'opacity-[0.4]'
              : ''
          }`}
        >
          <p className='font-[600] text-[14px] leading-[24px] text-[#222] mb-1'>
            Question
          </p>
          <ConfigInput
            type='text'
            disabled={
              WidgetConfigStore.spark_gpt_survey?.is_adding_spark_gpt_question
            }
            onChange={e => {
              set_edited_added_question_title(() => e?.target?.value);
            }}
            value={edited_added_question_title}
            className='focus:text-opacity-100 focus:border-primary-medium  pl-2 py-1  border border-gray-300 rounded-[4px] flex-1 h-auto  outline-none  mb-3  text-[14px] text-[#222] text-opacity-80 leading-[20px]'
            placeholder='Type question here'
          />

          <p className='font-[600] text-[14px] leading-[24px] text-[#222] mb-1'>
            Answer
          </p>
          <ConfigInput
            type='text'
            disabled={
              WidgetConfigStore.spark_gpt_survey?.is_adding_spark_gpt_question
            }
            onChange={e =>
              set_edited_added_question_answer(() => e?.target?.value)
            }
            value={edited_added_question_answer}
            className='focus:text-opacity-100 focus:border-primary-medium  pl-2 py-1  border border-gray-300 rounded-[4px] flex-1 h-auto  outline-none  mb-3  text-[14px] text-[#222] text-opacity-80 leading-[20px]'
            placeholder='Type answer here'
          />
          <div className='flex mt-[28px] w-full justify-end space-x-4'>
            <Button
              type='button'
              text='Cancel'
              onClick={handle_cancel_add_editing}
              variant='outline'
            />
            <Button
              type='button'
              text='Add the question'
              disabled={
                !can_save_edition() ||
                WidgetConfigStore.spark_gpt_survey?.is_adding_spark_gpt_question
              }
              onClick={handle_add_spark_gpt_question}
              className={`${
                can_save_edition() ? '' : 'opacity-[0.5] pointer-events-none'
              } bg-[#1068EF]`}
              size='sm'
            />
          </div>
        </div>
      )}
      <div className='my-4 flex items-center'>
        {WidgetConfigStore.spark_gpt_survey?.spark_gpt_question_list?.length >
          0 &&
          !WidgetConfigStore.spark_gpt_survey
            ?.is_editing_added_spark_gpt_question && (
            <div
              className='inline-flex items-center
            text-[14px]  font-medium 
            cursor-pointer flex-shrink-0 text-secondary'
              onClick={handle_edit_added_question}
            >
              <PlusIcon className='w-[15px] h-[15px] mr-[5px]  text-secondary' />{' '}
              Add another question
            </div>
          )}
      </div>
    </div>
  );
};
export default observer(SparkGPT);
