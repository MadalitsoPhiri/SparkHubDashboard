import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import Text from '@/components/atoms/Text';
import Modal from '@/components/atoms/modal';
import { AddTagForm } from '@/components/templates/forms/AddTagForm';
import { TagPayload } from '@/hooks/useTag';
import { tagStore } from '@/state/TagStore';
import { Icon } from '@iconify/react';
import { FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

type TagsProps = {
  createTag: (
    values: TagPayload,
    formikHelpers: FormikHelpers<TagPayload>,
  ) => void;
  deleteTag: (id: string) => void;
};

const Tags: FC<TagsProps> = ({ createTag, deleteTag }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='flex flex-col gap-y-1'>
      <Text size='md' color='text-black'>
        User tags
      </Text>
      {tagStore.isLoading ? (
        <div className='flex justify-center items-center pt-5'>
          <Spinner size={25} color='#033EB5' />
        </div>
      ) : (
        <div className='flex gap-2 flex-wrap'>
          {tagStore.tags.map(tag => (
            <div
              key={tag._id}
              className='flex flex-row justify-between items-center w-fit gap-2 h-[32px] px-2 bg-blue/10 rounded-[4px]'
            >
              <Text size='sm' color='text-black'>
                {tag.name}
              </Text>
              <button onClick={() => deleteTag(tag._id)}>
                <Icon
                  icon='heroicons:plus'
                  className='h-5 w-5 text-black rotate-45'
                  strokeWidth={4}
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <Button
        LeftIcon={<Icon icon='heroicons:plus' strokeWidth={10} />}
        text='Add Tag'
        variant='outline'
        className='w-[100px] h-[32px] mt-4 whitespace-nowrap'
        onClick={openModal}
      />

      <Modal
        show={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        title='Add Tag'
        className='z-[10000] inline-block py-6 my-8 w-[100%] max-w-[520px] overflow-hidden text-left align-top  transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <AddTagForm closeModal={closeModal} handler={createTag} />
      </Modal>
    </div>
  );
};

export default observer(Tags);
