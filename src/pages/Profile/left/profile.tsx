import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Spinner from '@/components/atoms/Spinner';
import Text from '@/components/atoms/Text';
import Modal from '@/components/atoms/modal';
import { notify } from '@/helpers/index';
import { ExternalLinkPayload } from '@/hooks/useExternalLink';
import { externalLinkStore } from '@/state/ExternalLinkStore';
import { ExternalLink } from '@/types/external_link.type';
import { Icon } from '@iconify/react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as yup from 'yup';

const externalLinkScheme = yup.object().shape({
  external_link: yup
    .string()
    .url('Please enter a valid URL. Example: https://www.example.com')
    .required('External link is required'),
});

type ExternalLinkValues = yup.InferType<typeof externalLinkScheme>;

type ProfileProps = {
  createExternalLink: (data: ExternalLinkPayload) => void;
};

const Profile: FC<ProfileProps> = ({ createExternalLink }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const externalLinks = externalLinkStore.externalLinks;
  const [visibleExternalLinks, setVisibleExternalLinks] = useState<
    ExternalLink[]
  >([]);
  const [showMore, setShowMore] = useState(false);
  const { id: userId } = useParams<{
    id: string;
  }>();

  const toggleExternalLinksVisibility = () => {
    if (showMore) {
      setVisibleExternalLinks(externalLinks.slice(0, 2));
    } else {
      setVisibleExternalLinks(externalLinks);
    }
    setShowMore(!showMore);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (values: ExternalLinkValues) => {
    if (!userId) {
      return notify('error', 'User ID is required');
    }

    const links = [...externalLinks, { link: values.external_link }];

    if (links.length > 5) {
      return notify('error', 'You can only add 5 external links');
    }

    createExternalLink({
      userId,
      link: values.external_link,
    });
    closeModal();
  };

  const preventFormSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setVisibleExternalLinks(
      externalLinks?.length > 2 ? externalLinks.slice(0, 2) : externalLinks,
    );
  }, [externalLinks]);

  return (
    <div className='flex flex-col gap-y-1'>
      <Text size='md' color='text-black'>
        External profiles
      </Text>
      {externalLinkStore.loading ? (
        <div className='py-4'>
          <Spinner size={20} />
        </div>
      ) : externalLinks?.length === 0 ? (
        <Text size='sm' color='text-[#656971]'>
          No external profiles
        </Text>
      ) : (
        visibleExternalLinks.map(externalLink => (
          <div
            key={externalLink._id}
            className={`rounded-[4px] my-1 flex items-center justify-between hover:underline`}
          >
            <Link to={externalLink.link} target='_blank' className='w-full'>
              <Text size='sm'>{externalLink.link}</Text>
            </Link>
            {/* Actions */}
            {/* <div className='flex gap-3'>
              <button className='text-secondary'>
                <LinkIcon className='h-4 w-4' aria-hidden='true' />
              </button>

              <button className='text-red-500'>
                <TrashIcon className='h-4 w-4' aria-hidden='true' />
              </button>
            </div> */}
          </div>
        ))
      )}
      <Button
        LeftIcon={<Icon icon='heroicons:plus' strokeWidth={10} />}
        text='Add External Profile'
        variant='outline'
        className='w-[180px] h-[32px] mt-2 whitespace-nowrap'
        onClick={openModal}
      />
      {externalLinks.length > 2 && (
        <Button
          text={showMore ? 'See less' : 'See more'}
          variant='outline'
          className='w-full h-[32px] mt-4'
          onClick={toggleExternalLinksVisibility}
        />
      )}

      <Modal
        show={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        title='Add External Profile'
        className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[520px] overflow-hidden text-left align-top  transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <div className='px-4'>
          <Formik
            onSubmit={handleSubmit}
            validationSchema={externalLinkScheme}
            initialValues={{
              external_link: '',
            }}
          >
            {({
              values,
              errors,
              isSubmitting,
              isValid,
              dirty,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder='Enter URL'
                  label='URL'
                  type='text'
                  name='external_link'
                  onChange={handleChange('external_link')}
                  onBlur={handleChange('external_link')}
                  value={values.external_link}
                  error={errors.external_link}
                  onKeyDown={preventFormSubmit}
                />

                <div className='mt-4 text-center flex justify-between space-x-4'>
                  <div className='flex flex-1'>
                    <Button
                      size='sm'
                      text='Cancel'
                      onClick={closeModal}
                      variant='outline'
                      className='w-full'
                    />
                  </div>

                  <div className='flex flex-1'>
                    <Button
                      size='sm'
                      text='Create'
                      type='submit'
                      className='hover:bg-primary-medium w-full'
                      loading={isSubmitting}
                      disabled={!isValid || !dirty || isSubmitting}
                    />
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default observer(Profile);
