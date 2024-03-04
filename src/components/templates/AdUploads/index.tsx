import { useEffect, useState, FC } from 'react';
import { MdDelete } from 'react-icons/md';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUpload } from '@/hooks/useUpload';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { OffersStore } from '@/state/OffersStore';
import { useOffers } from '@/hooks/useOffers';
import Button from '@/components/atoms/Button';
import { observer } from 'mobx-react-lite';
import ConfigInput from '@/components/atoms/ConfigInput';
import Spinner from '@/components/atoms/Spinner';
import { UploadIcon } from '@/components/atoms/Icons/UploadIcon';

const AdUploads = () => {
  const [close, setClose] = useState<boolean | null>(null);
  const { uploading, upload, response } = useUpload();
  const [is_editing, setIsEditing] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { remove_advert, create_advert, edit_advert, get_adverts } =
    useOffers();
  const editAdvert = (id: string) => {
    setIsEditing(id);
  };

  const cancel = () => {
    setIsEditing('');
  };

  const deleteAdvert = (id: string, index: number) => {
    remove_advert(id, index);
  };
  const onHandleSubmit = (values: any) => {
    const features = [];

    if (values.feature1) {
      features.push({
        title: values.feature1,
      });
    }
    if (values.feature2) {
      features.push({
        title: values.feature2,
      });
    }
    if (values.feature3) {
      features.push({
        title: values.feature3,
      });
    }

    create_advert({
      features,
      image: imageUrl || 'https://picsum.photos/200/300',
      headline: values?.headline,
      buttonLabel: values?.buttonLabel,
      outsideUrl: values?.outsideUrl?.startsWith('http')
        ? values?.outsideUrl
        : `https://${values?.outsideUrl}`,
      widgetId: WidgetConfigStore.config.value?._id,
    });
    setImageUrl('');
  };

  const updateAdvert = (id: string, values: any) => {
    const features = [];

    if (values.feature1) {
      features.push({
        title: values.feature1,
      });
    }
    if (values.feature2) {
      features.push({
        title: values.feature2,
      });
    }
    if (values.feature3) {
      features.push({
        title: values.feature3,
      });
    }

    edit_advert({
      id,
      features,
      image: imageUrl || values?.image || 'https://picsum.photos/200/300',
      headline: values?.headline,
      buttonLabel: values?.buttonLabel,
      outsideUrl: values?.outsideUrl?.startsWith('http')
        ? values?.outsideUrl
        : `https://${values?.outsideUrl}`,
      widgetId: WidgetConfigStore.config.value?._id,
    }),
      setIsEditing('');
  };

  const advertSchema = Yup.object().shape({
    headline: Yup.string()
      .min(2, 'Too Short!')
      .max(80, 'Too Long!')
      .required('Required'),
    feature1: Yup.string()
      .min(1, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    feature2: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!'),
    feature3: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!'),
    buttonLabel: Yup.string().min(1, 'Too Short!').max(20, 'Too Long!'),
    outsideUrl: Yup.string(),
  });

  function handleupload({ target: { files } }: { target: { files: any } }) {
    if (files.length) {
      upload(files[0]);
    }
  }
  useEffect(() => {
    if (response) {
      if (response.status === 200) {
        setImageUrl(response.payload.url);
      }
    }
  }, [response]);

  useEffect(() => {
    get_adverts();
  }, []);

  if (OffersStore.advert?.fetching_adverts) {
    return (
      <div className='flex items-center justify-center mb-4'>
        <Spinner size={25} color='#033EB5' />
      </div>
    );
  }

  const Card: FC<any> = observer(({ item, index }) => {
    return (
      <div className=' flex  py-1 '>
        <div className='rounded-[8px] shadow-lg bg-white min-w-[374px] w-[100%] mb-4 '>
          <div className='flex flex-col p-[16px]'>
            {item._id == is_editing ? (
              <Formik
                initialValues={{
                  feature1: item?.features[0]?.title,
                  feature2: item?.features[1]?.title,
                  feature3: item?.features[2]?.title,
                  image: item.image,
                  headline: item?.headline,
                  buttonLabel: item?.buttonLabel,
                  outsideUrl: item?.outsideUrl,
                  widgetId: '',
                }}
                validationSchema={advertSchema}
                onSubmit={(values, { resetForm }) => {
                  updateAdvert(item._id, values);
                  resetForm({
                    values: {
                      feature1: '',
                      feature2: '',
                      feature3: '',
                      image: '',
                      headline: '',
                      buttonLabel: '',
                      outsideUrl: '',
                      widgetId: '',
                    },
                  });
                }}
              >
                {({ values, handleSubmit, handleChange }) => (
                  <form className={`flex flex-col`} onSubmit={handleSubmit}>
                    <div className='relative rounded-[4px] h-[152px]  w-full flex flex-col justify-center items-center  border-[2px] border-[#E6E8EB] border-dashed bg-white mb-6'>
                      <label
                        htmlFor='logo'
                        className='relative  flex flex-col justify-center items-center  cursor-pointer'
                      >
                        <UploadIcon />
                        <p className='text-[14px] font-[500] text-[#161518] mt-[8px] mb-[6px]'>
                          <span className='text-[14px] font-[500] text-[#1068EF]'>
                            Upload a file{' '}
                          </span>{' '}
                          or drag and drop
                        </p>
                        <p className='font-[400] text-[12px] text-[#656971]'>
                          SVG, PNG, JPG, GIF or MP4.
                        </p>
                        <input
                          type='file'
                          id='logo'
                          disabled={uploading}
                          onChange={handleupload}
                          className='absolute left-0 right-0 w-[20px] invisible'
                        />
                      </label>
                    </div>
                    <div className='flex flex-col w-full  mb-4 '>
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

                    <ConfigInput
                      label='Feature'
                      type='text'
                      placeholder='Type feature'
                      name='feature1'
                      value={values.feature1}
                      onChange={handleChange('feature1')}
                    />

                    <div className='mt-4' />

                    <ConfigInput
                      label='Feature'
                      type='text'
                      placeholder='Type feature'
                      name='feature2'
                      value={values.feature2}
                      onChange={handleChange('feature2')}
                    />

                    <div className='mt-4' />

                    <ConfigInput
                      label='Feature'
                      type='text'
                      placeholder='Type feature'
                      name='feature3'
                      value={values.feature3}
                      onChange={handleChange('feature3')}
                    />
                    <div className='mt-4' />

                    <ConfigInput
                      label='Button Label'
                      type='text'
                      placeholder='Type label'
                      name='buttonLabel'
                      value={values.buttonLabel}
                      onChange={handleChange('buttonLabel')}
                    />
                    <div className='mt-4' />

                    <ConfigInput
                      label='Outside URL'
                      type='text'
                      placeholder='Enter full url e.g. www.example.com'
                      name='outsideUrl'
                      value={values.outsideUrl}
                      onChange={handleChange('outsideUrl')}
                    />
                    <div className='mt-3 flex space-x-4'>
                      <Button
                        onClick={cancel}
                        type='button'
                        text='Cancel'
                        size='sm'
                        variant='outline'
                      />

                      <Button type='submit' text='Update' size='sm' />
                    </div>
                  </form>
                )}
              </Formik>
            ) : (
              <>
                <div className='p-4 flex flex-col'>
                  <div
                    className='h-[192px] rounded-md overflow-hidden'
                    style={{
                      backgroundImage: `url(${item?.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>

                  <p className='font-bold text-[16px] my-2'>{item?.headline}</p>
                </div>
                {item?.features?.map((feature: any, index: number) => (
                  <div className='flex my-1' key={index}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className=' flex-none mx-2 h-6 w-6 text-btnColor'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span className='text-[14px]'>{feature?.title}</span>
                  </div>
                ))}
                {item?.buttonLabel !== '' && (
                  <div className='p-4 w-full mt-auto'>
                    <a
                      href={item?.outsideUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`bg-btnColor rounded-[6px] flex flex-row justify-center items-center px-[28px] py-[10px] my-1 w-full`}
                    >
                      <p
                        className={`text-white ml-[12px] font-semibold text-[16px] leading-[20px]`}
                      >
                        {item?.buttonLabel}
                      </p>
                    </a>
                  </div>
                )}
              </>
            )}
            <div className='flex items-center justify-around border-b border-border my-2'></div>
            <div className='mt-[16px] flex w-full justify-end space-x-4'>
              <div
                onClick={() => deleteAdvert(item._id, index)}
                className='px-[8.50px] py-1.5 bg-white rounded shadow border border-zinc-200 justify-start items-center gap-3 cursor-pointer flex'
              >
                <MdDelete className='w-4 h-4 text-warning' />
              </div>

              <Button
                type='button'
                onClick={() => editAdvert(item._id)}
                text='Edit'
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
      <div className='pt-[0px] pb-[30px]'>
        <div className='flex flex-row flex-wrap gap-6 items-start justify-center w-full mb-3'>
          {OffersStore.advert?.advert?.map((item, index) => {
            return <Card item={item} index={index} key={index} />;
          })}
        </div>
        {OffersStore.advert?.advert?.length <= 0 &&
        !OffersStore.advert?.isLoading &&
        !close ? (
          <div className='w-full h-[172px] px-4 py-6 bg-white border border-border rounded-lg flex-col justify-center items-center inline-flex'>
            <div className='self-stretch mb-6 flex-col justify-start items-center gap-2 flex'>
              <p className='text-center text-lightBlack text-md font-medium leading-tight'>
                No ads added yet.
              </p>
              <p className='self-stretch text-center text-gray-400 text-md font-medium leading-tight'>
                Insert your first product.
              </p>
            </div>
            <Button
              onClick={() => setClose(!close)}
              type='button'
              text='Add Product'
              size='md'
              className='bg-[#1068EF]'
            />
          </div>
        ) : (
          close && (
            <Formik
              initialValues={{
                feature1: '',
                feature2: '',
                feature3: '',
                image: imageUrl,
                headline: '',
                buttonLabel: '',
                outsideUrl: '',
                widgetId: '',
              }}
              validationSchema={advertSchema}
              onSubmit={(values, { resetForm }) => {
                onHandleSubmit(values);
                resetForm({
                  values: {
                    feature1: '',
                    feature2: '',
                    feature3: '',
                    image: imageUrl,
                    headline: '',
                    buttonLabel: '',
                    outsideUrl: '',
                    widgetId: '',
                  },
                });
                setClose(!close);
              }}
            >
              {({ values, handleSubmit, handleChange }) => (
                <form className={`flex flex-col`} onSubmit={handleSubmit}>
                  <div className='rounded-[8px] bg-white p-6'>
                    <div className='relative rounded-[4px] h-[152px]  w-full flex flex-col justify-center items-center  border-[2px] border-[#E6E8EB] border-dashed bg-white mb-6'>
                      <label
                        htmlFor='logo'
                        className='relative  flex flex-col justify-center items-center  cursor-pointer'
                      >
                        <UploadIcon />
                        <p className='text-[14px] font-[500] text-[#161518] mt-[8px] mb-[6px]'>
                          <span className='text-[14px] font-[500] text-[#1068EF]'>
                            Upload a file{' '}
                          </span>{' '}
                          or drag and drop
                        </p>
                        <p className='font-[400] text-[12px] text-[#656971]'>
                          SVG, PNG, JPG, GIF or MP4.
                        </p>
                        <input
                          type='file'
                          id='logo'
                          disabled={uploading}
                          onChange={handleupload}
                          className='absolute left-0 right-0 w-[20px] invisible'
                        />
                      </label>
                    </div>
                    <div className='flex flex-col w-full  mb-4 '>
                      <ConfigInput
                        type='text'
                        label={'Headline'}
                        placeholder='Enter suggestion'
                        value={values.headline}
                        onChange={handleChange('headline')}
                        maxLength={40}
                        required
                      />
                    </div>

                    <ConfigInput
                      label='Feature'
                      type='text'
                      placeholder='Type feature'
                      name='feature1'
                      value={values.feature1}
                      onChange={handleChange('feature1')}
                    />

                    <div className='mt-4' />

                    <ConfigInput
                      label='Feature'
                      type='text'
                      placeholder='Type feature'
                      name='feature2'
                      value={values.feature2}
                      onChange={handleChange('feature2')}
                    />

                    <div className='mt-4' />

                    <ConfigInput
                      label='Feature'
                      type='text'
                      placeholder='Type feature'
                      name='feature3'
                      value={values.feature3}
                      onChange={handleChange('feature3')}
                    />
                    <div className='mt-4' />

                    <ConfigInput
                      label='Button Label'
                      type='text'
                      placeholder='Type label'
                      name='buttonLabel'
                      value={values.buttonLabel}
                      onChange={handleChange('buttonLabel')}
                    />
                    <div className='mt-4' />

                    <ConfigInput
                      label='Outside URL'
                      type='text'
                      placeholder='Enter full url e.g. www.example.com'
                      name='outsideUrl'
                      value={values.outsideUrl}
                      onChange={handleChange('outsideUrl')}
                    />
                  </div>
                  <div className='mt-[20px] flex justify-end space-x-4'>
                    <Button
                      onClick={() => setClose(!close)}
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
        {OffersStore.advert.advert.length > 0 && !close && (
          <div className='flex justify-end space-x-4'>
            <Button
              onClick={() => setClose(!close)}
              type='button'
              text='Add another product'
              size='sm'
              className='bg-[#1068EF]'
            />
          </div>
        )}
      </div>
    )
  );
};
export default observer(AdUploads);
