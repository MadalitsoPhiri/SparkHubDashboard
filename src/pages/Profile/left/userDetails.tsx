import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@iconify/react';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import UnsubscribeMenu from '../unsubscribemenu';
import EditDetails from './editDetails';
import { contactStore } from '@/state/ContactStore';
import { customFieldStore } from '@/state/CustomFieldStore';
import { extractDomain } from '@/helpers/index';
import { useCustomField } from '@/hooks/useCustomField';

const UserDetails = ({ data }: any) => {
  const [visibleDetailsCount, setVisibleDetailsCount] = useState(4);
  const { customFields, customFieldsObject } = customFieldStore;
  const [isEdit, setIsEdit] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const { getContactCustomFields, getCustomFields } = useCustomField();
  const loading = contactStore.updatingContact;

  // Function to toggle the visible details count
  const toggleVisibleDetails = () => {
    if (visibleDetailsCount === 4) {
      setVisibleDetailsCount(userDetails.length);
      setViewMore(true);
    } else {
      setVisibleDetailsCount(4);
      setViewMore(false);
    }
  };

  const handleEdit = (e: any) => {
    if (isEdit == false) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
      e?.preventDefault();
      document?.getElementById('SparkHubSaveEditedDetailsForContact')?.click();
    }
  };

  const userDetails = [
    {
      id: 1,
      name: 'Type',
      icon: (
        <Icon
          icon='ic:baseline-person'
          width={15}
          height={15}
          color='#898D94'
        />
      ),
      value: data?.contact_type || 'unknown',
      visible: true,
    },
    {
      id: 2,
      name: 'Mail',
      icon: (
        <Icon icon='bi:mailbox2-flag' width={15} height={15} color='#898D94' />
      ),
      value: data?.email || 'unknown',
      visible: true,
    },
    {
      id: 3,
      name: 'Phone',
      icon: (
        <Icon icon='raphael:iphone' width={15} height={15} color='#898D94' />
      ),
      value: data?.phone_number || 'unknown',
      visible: true,
    },
    {
      id: 4,
      name: 'User ID',
      icon: (
        <Icon
          icon='mdi:user-badge-alert'
          width={15}
          height={15}
          color='#898D94'
        />
      ),
      value: data?._id.slice(9) || 'unknown',
      visible: true,
    },
    {
      id: 5,
      name: 'First seen',
      icon: <Icon icon='uit:calender' width={15} height={15} color='#898D94' />,
      value: new Date(data?.createdAt).toDateString() || 'unknown',
      visible: false,
    },
    {
      id: 6,
      name: 'Last seen',
      icon: <Icon icon='uit:calender' width={15} height={15} color='#898D94' />,
      value: new Date(data?.last_seen).toDateString() || 'unknown',

      visible: true,
    },
    {
      id: 7,
      name: 'Signed up',
      icon: <Icon icon='uit:calender' width={15} height={15} color='#898D94' />,
      value: new Date(data?.signup_date).toDateString() || 'unknown',
      visible: false,
    },
    {
      id: 8,
      name: 'Country',
      icon: <Icon icon='gis:globe-o' width={15} height={15} color='#898D94' />,
      value: data?.country || 'unknown',
      visible: false,
    },
    {
      id: 9,
      name: 'City',
      icon: (
        <Icon icon='healthicons:city' width={15} height={15} color='#898D94' />
      ),
      value: data?.city || 'unknown',
      visible: false,
    },
    {
      id: 10,
      name: 'Company',
      icon: <Icon icon='mdi:company' width={15} height={15} color='#898D94' />,
      value: data?.company_name || 'unknown',
      visible: false,
    },
    {
      id: 11,
      name: 'Size',
      icon: (
        <Icon
          icon='fluent:book-number-20-regular'
          width={15}
          height={15}
          color='#898D94'
        />
      ),
      value: data?.company_size || 'unknown',
      visible: false,
    },
    {
      id: 12,
      name: 'Website',
      icon: (
        <Icon
          icon='fluent-mdl2:website'
          width={15}
          height={15}
          color='#898D94'
        />
      ),
      value: data?.company_website || 'unknown',
      visible: false,
    },
    {
      id: 13,
      name: 'Industry',
      icon: (
        <Icon
          icon='streamline:industry-innovation-and-infrastructure'
          width={15}
          height={15}
          color='#898D94'
        />
      ),
      value: data?.company_industry || 'unknown',
      visible: false,
    },
  ];

  useEffect(() => {
    getCustomFields();
    getContactCustomFields(data?._id);
  }, [data?._id]);

  return (
    <div className='flex flex-col'>
      <div className='flex gap-y-4'>
        <div className='flex justify-between items-center w-full my-2'>
          <Text size='md' color='text-black'>
            Contact Details
          </Text>
          <div className='flex space-x-4'>
            {!isEdit ? (
              <Button
                text={'Edit'}
                variant='outline'
                loading={loading}
                onClick={handleEdit}
              />
            ) : (
              <Button text={'Done'} onClick={handleEdit} />
            )}
            <UnsubscribeMenu />
          </div>
        </div>
      </div>

      {isEdit ? (
        <EditDetails data={data} />
      ) : (
        <div className='mt-2'>
          {userDetails.slice(0, visibleDetailsCount).map(item => (
            <div key={item.id} className='flex items-center mb-4'>
              <span className='mr-2'>{item.icon}</span>
              <p className='basis-24 text-md text-gray-500'>{item.name}</p>
              <div
                className={`${
                  item.name == 'Mail' ||
                  item.name == 'User ID' ||
                  item.name == 'Website'
                    ? ''
                    : 'capitalize'
                } ${
                  item.name === 'Website' &&
                  data?.company_website !== null &&
                  data?.company_website !== '' &&
                  'text-secondary'
                } text-md text-gray-400 flex`}
              >
                {item.value && typeof item.value === 'string'
                  ? item.value.toLowerCase()
                  : 'unknown'}
                {item.name === 'Website' &&
                  data?.company_website !== null &&
                  data?.company_website !== '' && (
                    <a
                      href={`https://${extractDomain(data?.company_website)}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Icon
                        icon='solar:link-bold'
                        className='text-secondary text-[18px] ml-2'
                      />
                    </a>
                  )}
              </div>
            </div>
          ))}
          {viewMore && (
            <>
              {customFields.length ? (
                customFields.map(customField => (
                  <div
                    className='flex items-center mb-4'
                    key={customField?._id}
                  >
                    <span className='mr-2'>
                      <Icon
                        icon='tabler:placeholder'
                        width={15}
                        height={15}
                        color='#898D94'
                      />
                    </span>
                    <p className='basis-24 text-md text-gray-500'>
                      {customField?.field}
                    </p>
                    <div className={`text-md text-gray-400 capitalize`}>
                      {customFieldsObject[customField?._id] || 'unknown'}
                    </div>
                  </div>
                ))
              ) : (
                <p className='sr-only'></p>
              )}
            </>
          )}
        </div>
      )}
      <>
        {!isEdit && userDetails.length > 4 && (
          <Button
            text={visibleDetailsCount === 4 ? 'See more' : 'See less'}
            variant='outline'
            className='w-full h-[32px] mt-4'
            onClick={toggleVisibleDetails}
          />
        )}
      </>
    </div>
  );
};

export default observer(UserDetails);
