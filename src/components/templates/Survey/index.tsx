import { useOffers } from '@/hooks/useOffers';
import { Formik } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';

import Button from '@/components/atoms/Button';
import ConfigInput from '@/components/atoms/ConfigInput';
import Spinner from '@/components/atoms/Spinner';
import { OffersStore } from '@/state/OffersStore';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { Icon } from '@iconify/react';
import { observer } from 'mobx-react-lite';

const Survey = () => {
  const [is_active] = useState(true);
  const [is_editing, setIsEditing] = useState('');
  const [show_form, setShowForm] = useState<boolean | null>(null);

  const active_index_ref = useRef<any>();
  active_index_ref.current = is_editing;
  const {
    create_survey,
    active_survey,
    edit_survey,
    remove_survey,
    get_surveys,
  } = useOffers();
  const handleSubmit = (values: any) => {
    const options = [];

    if (values.option1) {
      options.push({
        title: values.option1,
      });
    }
    if (values.option2) {
      options.push({
        title: values.option2,
      });
    }
    if (values.option3) {
      options.push({
        title: values.option3,
      });
    }

    create_survey({
      options,
      headline: values?.headline,
      description: values?.description,
      widgetId: WidgetConfigStore.config.value?._id,
    });
  };

  const handleActive = (item: any, index: number) => {
    active_survey(
      item._id,
      item.workspace,
      item.widget_config,
      is_active,
      index,
    );
  };

  const editSurvey = (id: string) => {
    setIsEditing(id);
  };

  const updateSurvey = (id: string, values: any) => {
    const options = [];

    if (values.option1) {
      options.push({
        title: values.option1,
      });
    }
    if (values.option2) {
      options.push({
        title: values.option2,
      });
    }
    if (values.option3) {
      options.push({
        title: values.option3,
      });
    }

    edit_survey({
      id,
      headline: values.headline,
      description: values.description,
      options,
      widgetId: WidgetConfigStore.config.value?._id,
    }),
      setIsEditing('');
  };

  const cancel = () => {
    setIsEditing('');
  };

  const deleteSurvey = (id: string, index: number) => {
    remove_survey(id, index);
  };

  useEffect(() => {
    get_surveys();
  }, []);
  if (OffersStore.survey?.fetching_surveys) {
    return (
      <div className='flex items-center justify-center mb-4'>
        <Spinner size={25} color='#033EB5' />
      </div>
    );
  }

  const Card: FC<any> = observer(({ item, index }) => {
    return (
      <div className=' flex py-1 '>
        <div className='rounded-lg shadow border border-border bg-white w-full  mb-4 '>
          <div className='flex flex-col p-[16px]'>
            {item?._id == is_editing ? (
              <Formik
                initialValues={{
                  option1: item?.options[0]?.title,
                  option2: item?.options[1]?.title,
                  option3: item?.options[2]?.title,
                  headline: item?.headline,
                  description: item?.description,
                  widgetId: '',
                }}
                onSubmit={(values, { resetForm }) => {
                  updateSurvey(item._id, values);
                  resetForm({
                    values: {
                      option1: item?.options[0]?.title,
                      option2: item?.options[1]?.title,
                      option3: item?.options[2]?.title,
                      headline: item?.headline,
                      description: item?.description,
                      widgetId: '',
                    },
                  });
                }}
              >
                {({ values, handleSubmit, handleChange }) => (
                  <form className={`flex flex-col`} onSubmit={handleSubmit}>
                    <div className='flex flex-col w-full  mb-3 '>
                      <ConfigInput
                        type='text'
                        label={'Headline'}
                        placeholder='Enter suggestion'
                        value={values?.headline}
                        onChange={handleChange('headline')}
                        maxLength={40}
                        required
                      />
                    </div>
                    <div className='flex flex-col w-full gap-4  mb-3 '>
                      <ConfigInput
                        type='text'
                        label={'Description'}
                        placeholder='Enter suggestion'
                        value={values?.description}
                        onChange={handleChange('description')}
                        maxLength={40}
                        required
                      />
                    </div>

                    <ConfigInput
                      type='text'
                      label={'Option 1'}
                      name='option1'
                      placeholder='eg. Yes'
                      value={values?.option1}
                      onChange={handleChange('option1')}
                      maxLength={15}
                      required
                    />

                    <div className='mt-4' />

                    <ConfigInput
                      type='text'
                      label={'Option 2'}
                      name='option2'
                      placeholder='eg. No'
                      value={values?.option2}
                      onChange={handleChange('option2')}
                      maxLength={15}
                      required
                    />

                    <div className='mt-4' />

                    <ConfigInput
                      type='text'
                      label={'Option 3 (optional)'}
                      name='option3'
                      placeholder='Other'
                      value={values?.option3}
                      onChange={handleChange('option3')}
                      maxLength={15}
                    />
                    <div className='mt-3 flex space-x-4'>
                      <Button
                        onClick={cancel}
                        type='button'
                        text='Cancel'
                        size='sm'
                        variant='outline'
                      />

                      <Button
                        type='submit'
                        text='Update'
                        size='sm'
                        className='bg-[#1068EF]'
                      />
                    </div>
                  </form>
                )}
              </Formik>
            ) : (
              <div className='flex flex-col'>
                <p className='font-medium mb-2 text-lg leading-[24px]'>
                  {item?.headline}
                </p>
                <p className={`mb-2 text-md text-[#656971]`}>
                  {item?.description}
                </p>
                <div className='w-full flex flex-col mt-auto'>
                  {item?.options?.map((option: any, index: number) => (
                    <button
                      className={`border border-btnColor rounded-[99px]  bg-[#F7F6FF] flex flex-row justify-center items-center px-[28px] py-[10px] my-2.5`}
                      key={index}
                    >
                      <p
                        className={`text-btnColor ml-[12px] py-1 font-semibold text-md leading-[20px]`}
                      >
                        {option.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className='flex items-center justify-around border-b border-border my-2'></div>
            <div className='mt-2 flex w-full justify-end space-x-4'>
              <div
                onClick={() => deleteSurvey(item._id, index)}
                className='px-[8.50px] py-1.5 bg-white rounded shadow border border-zinc-200 justify-start items-center gap-3 cursor-pointer flex'
              >
                <MdDelete className='w-4 h-4 text-warning' />
              </div>

              <Button
                type='button'
                onClick={() => editSurvey(item._id)}
                text='Edit'
                size='sm'
                variant='outline'
              />

              <Button
                type='button'
                onClick={() => handleActive(item, index)}
                LeftIcon={
                  item.is_active === false ? (
                    <Icon icon={'mdi:eye'} className='w-5 h-5' />
                  ) : (
                    <Icon icon={'mdi:eye-off'} className='w-5 h-5' />
                  )
                }
                text={`${
                  item.is_active === false
                    ? 'Display the question'
                    : 'Hide the question'
                }`}
                size='sm'
                variant='outline'
              />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    WidgetConfigStore.config.value && (
      <div className='pt-[0px] pb-2'>
        <div className='flex flex-col w-full mb-3'>
          {OffersStore.survey?.survey?.map((item, index) => {
            return <Card item={item} index={index} key={index} />;
          })}
        </div>

        {OffersStore.survey?.survey?.length <= 0 &&
        !OffersStore.survey?.fetching_surveys &&
        !show_form ? (
          <div className='w-full h-[172px] px-4 py-6 bg-white rounded-lg border border-border flex-col justify-center items-center gap-6 inline-flex'>
            <div className='self-stretch h-[68px] flex-col justify-start items-center gap-2 flex'>
              <div className='text-center text-neutral-900 text-md font-medium leading-tight'>
                No survey added yet
              </div>
              <div className='self-stretch text-center text-zinc-500 text-md font-medium leading-tight'>
                No survey added yet to gather valuable insights.
              </div>
            </div>
            <Button
              onClick={() => setShowForm(!show_form)}
              type='button'
              text='Add the first survey'
              size='sm'
              className='bg-[#1068EF]'
            />
          </div>
        ) : (
          show_form && (
            <Formik
              initialValues={{
                option1: '',
                option2: '',
                option3: '',
                headline: '',
                description: '',
                widgetId: '',
              }}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values);
                resetForm({
                  values: {
                    option1: '',
                    option2: '',
                    option3: '',
                    headline: '',
                    description: '',
                    widgetId: '',
                  },
                });
                setShowForm(!show_form);
              }}
            >
              {({ values, handleSubmit, handleChange }) => (
                <form className={`flex flex-col`} onSubmit={handleSubmit}>
                  <div className='rounded-[8px] bg-white p-6 border border-border'>
                    <div className='flex flex-col w-full mb-6'>
                      <ConfigInput
                        type='text'
                        label={'Headline'}
                        placeholder='Enter suggestion'
                        value={values.headline}
                        onChange={handleChange('headline')}
                        maxLength={40}
                        required
                      />

                      <p className='text-gray-500 text-[13px] leading-4 font-normal'>
                        40 character max
                      </p>
                    </div>
                    <div className='flex flex-col w-full mb-6'>
                      <ConfigInput
                        type='text'
                        label={'Description'}
                        placeholder='Enter suggestion'
                        value={values.description}
                        onChange={handleChange('description')}
                        maxLength={40}
                        required
                      />
                      <p className='text-gray-500 text-[13px] leading-4 font-normal'>
                        40 character max
                      </p>
                    </div>

                    <div className='flex flex-col w-full mb-6'>
                      <ConfigInput
                        type='text'
                        label={'First answer'}
                        name='option1'
                        placeholder='eg. Yes'
                        value={values.option1}
                        onChange={handleChange('option1')}
                        maxLength={15}
                        required
                      />
                      <p className='text-gray-500 text-[13px] leading-4 font-normal'>
                        15 characters max
                      </p>
                    </div>

                    <div className='flex flex-col w-full mb-6'>
                      <ConfigInput
                        type='text'
                        label={'Second answer'}
                        name='option2'
                        placeholder='eg. No'
                        value={values.option2}
                        onChange={handleChange('option2')}
                        maxLength={15}
                        required
                      />
                      <p className='text-gray-500 text-[13px] leading-4 font-normal'>
                        15 characters max
                      </p>
                    </div>

                    <div className='flex flex-col w-full'>
                      <ConfigInput
                        type='text'
                        label={'Other (optional)'}
                        name='option3'
                        placeholder='Other'
                        value={values.option3}
                        onChange={handleChange('option3')}
                        maxLength={15}
                      />
                      <p className='text-gray-500 text-[13px] leading-4 font-normal'>
                        15 characters max
                      </p>
                    </div>
                  </div>
                  <div className='mt-[20px] flex justify-end space-x-4'>
                    <Button
                      onClick={() => setShowForm(!show_form)}
                      type='button'
                      text='Cancel'
                      size='sm'
                      variant='outline'
                    />
                    <Button
                      type='submit'
                      loading={OffersStore.survey?.isLoading}
                      text={
                        OffersStore.survey?.isLoading
                          ? 'Saving'
                          : 'Save and set live'
                      }
                      loadingText='Saving'
                      className='bg-[#1068EF]'
                      size='sm'
                    />
                  </div>
                </form>
              )}
            </Formik>
          )
        )}
        {OffersStore.survey?.survey?.length > 0 && !show_form && (
          <div className='flex justify-end space-x-4'>
            <Button
              onClick={() => setShowForm(!show_form)}
              type='button'
              text='Add another survey'
              size='sm'
              className='bg-[#1068EF]'
            />
          </div>
        )}
      </div>
    )
  );
};
export default observer(Survey);
