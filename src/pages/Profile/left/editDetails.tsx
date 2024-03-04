import { extractDomain } from '@/helpers/index';
import { useContact } from '@/hooks/useContact';
import {
  UpdateCustomFieldPayload,
  useCustomField,
} from '@/hooks/useCustomField';
import { customFieldStore } from '@/state/CustomFieldStore';
import { User } from '@/types/user.types';
import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';

type EditDetailsProps = {
  data: User;
};

const EditDetails = ({ data }: EditDetailsProps) => {
  const { customFields, customFieldsObject, setCustomFieldsObject } =
    customFieldStore;
  const {
    updateContactWithCustomField,
    getContactCustomFields,
    getCustomFields,
  } = useCustomField();
  const { updateContact } = useContact();
  const [user_name, set_user_name] = useState<string | null>(
    data?.user_name || null,
  );
  const [email, set_email] = useState<string | null>(data?.email || null);
  const [phone_number, set_phone] = useState<string | null>(
    data?.phone_number || null,
  );
  const [country, set_country] = useState<string | null>(data?.country || null);
  const [city, set_city] = useState<string | null>(data?.city || null);
  const [status, set_status] = useState<string | null>(data?.status || null);
  const [company_name, set_company_name] = useState<string | null>(
    data?.company_name || null,
  );
  const [company_size, set_company_size] = useState<string | null>(
    data?.company_size || null,
  );
  const [company_website, set_company_website] = useState<string | null>(
    data?.company_website || null,
  );
  const [company_industry, set_company_industry] = useState<string | null>(
    data?.company_industry || null,
  );

  // map the user details on custom field values
  useEffect(() => {
    getCustomFields();
    getContactCustomFields(data._id as string);
  }, [data]);

  const focusedInputRef = useRef<HTMLInputElement | null>(null);
  const focusedSelectInputRef = useRef<HTMLSelectElement | null>(null);

  const setFocusedInput = (inputRef: HTMLInputElement | null) => {
    focusedInputRef.current = inputRef;
  };

  const onInputFocus = (inputRef: HTMLInputElement | null) => {
    setFocusedInput(inputRef);
  };

  const handleUpdateDetails = () => {
    const focusedInput = focusedInputRef.current;

    if (focusedInput) {
      const inputName = focusedInput.getAttribute('data-name');

      switch (inputName) {
        case 'user_name':
          set_user_name(focusedInput.value);
          break;
        case 'email':
          set_email(focusedInput.value);
          break;
        case 'phone_number':
          set_phone(focusedInput.value);
          break;
        case 'status':
          set_status(focusedSelectInputRef.current?.value ?? '');
          break;
        case 'country':
          set_country(focusedInput.value);
          break;
        case 'city':
          set_city(focusedInput.value);
          break;
        case 'company_name':
          set_company_name(focusedInput.value);
          break;
        case 'company_size':
          set_company_size(focusedInput.value);
          break;
        case 'company_website':
          set_company_website(focusedInput.value);
          break;
        case 'company_industry':
          set_company_industry(focusedInput.value);
          break;
        default:
          break;
      }
    }

    const update = {
      id: data._id,
      user: {
        user_name,
        email,
        phone_number,
        status,
        company_name,
        country,
        city,
        company_website,
        company_size,
        company_industry,
        // custom_fields: {
        //   ...customFieldsObject,
        // },
      },
    };

    updateContact(update);
  };

  const updateCustomField = (fieldId: string, value: string | null) => {
    const update: UpdateCustomFieldPayload = {
      contactId: data._id as string,
      customFieldId: fieldId,
      value: value,
    };

    updateContactWithCustomField(update);
  };

  const onInputBlur = () => {
    setFocusedInput(null);
    handleUpdateDetails();
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleUpdateDetails();
      event.target.blur();
    }
  };

  return (
    <div
      className='transition-[height] w-full mt-2'
      id='SparkHubSaveEditedDetailsForContact'
      onClick={onInputBlur}
    >
      {/* Name */}
      <div className='flex items-center mb-4'>
        {data?.user_name !== null && data?.user_name !== '' ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>Name</p>
        <input
          onChange={e => set_user_name(e.target.value)}
          onKeyDown={handleKeyPress}
          value={user_name ?? ''}
          type='text'
          placeholder='Add name'
          className={`${
            data?.user_name === null || data?.user_name === ''
              ? ''
              : 'capitalize'
          } flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] border-2 border-transparent focus:border-secondary hover:border-border/30 text-black cursor-pointer`}
        />
      </div>

      {/* Email */}
      <div className='flex items-center mb-4'>
        {data?.email !== null && data?.email !== '' ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>Email</p>
        <input
          onChange={e => set_email(e.target.value)}
          onKeyDown={handleKeyPress}
          value={email ?? ''}
          type='text'
          placeholder='Add email'
          className={`flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30  border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
        />
      </div>

      {/* Phone */}
      <div className='flex items-center mb-4'>
        {data?.phone_number ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>Phone</p>
        <input
          onChange={e => set_phone(e.target.value)}
          onKeyDown={handleKeyPress}
          value={phone_number ?? ''}
          type='text'
          placeholder='Add phone'
          className={`flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30 border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
        />
      </div>

      {/* Status */}
      <div className='flex items-center mb-4'>
        {data?.status ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>Status</p>
        <select
          value={status ?? ''}
          placeholder='Select status'
          onChange={e => set_status(e.target.value)}
          onFocus={() => onInputFocus}
          onBlur={onInputBlur}
          ref={focusedSelectInputRef}
          onKeyDown={handleKeyPress}
          className={`flex-1 duration-100 ease-in-out w-full  outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30  border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
        >
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
      </div>

      {/* Country */}
      <div className='flex items-center mb-4'>
        {data?.country !== null && data?.country !== '' ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>Country</p>
        <input
          onChange={e => set_country(e.target.value)}
          onKeyDown={handleKeyPress}
          value={country ?? ''}
          type='text'
          placeholder='Add country'
          className={`flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30  border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
        />
      </div>

      {/* City */}
      <div className='flex items-center mb-4'>
        {data?.city ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>City</p>
        <input
          onChange={e => set_city(e.target.value)}
          onKeyDown={handleKeyPress}
          value={city ?? ''}
          type='text'
          placeholder='Add City'
          className={`flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30  border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
        />
      </div>

      {/* Company Name */}
      <div className='flex items-center mb-4'>
        {data?.company_name !== null && data?.company_name !== '' ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>Company</p>
        <input
          onChange={e => set_company_name(e.target.value)}
          onKeyDown={handleKeyPress}
          value={company_name ?? ''}
          type='text'
          placeholder='Add company name'
          className={`${
            data?.company_name === null || data?.company_name === ''
              ? ''
              : 'capitalize'
          } flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30  border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
        />
      </div>

      {/* Company Size */}
      <div className='flex items-center mb-4'>
        {data?.company_size !== null && data?.company_size !== '' ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>Size</p>
        <input
          onChange={e => set_company_size(e.target.value)}
          onKeyDown={handleKeyPress}
          value={company_size ?? ''}
          type='text'
          placeholder='Add company size'
          className={`flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30  border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
        />
      </div>

      {/* Company Website*/}
      <div className='flex items-center mb-4'>
        {data?.company_website !== null && data?.company_website !== '' ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>Website</p>
        <input
          onChange={e => set_company_website(e.target.value)}
          onKeyDown={handleKeyPress}
          value={company_website ?? ''}
          type='text'
          placeholder='Add company website'
          className={`${
            data?.company_website === null || data?.company_website === ''
              ? ''
              : 'text-secondary'
          } flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30  border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
        />
        {data?.company_website !== null && data?.company_website !== '' && (
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

      {/* Company Industry*/}
      <div className='flex items-center mb-4'>
        {data?.company_industry !== null && data?.company_industry !== '' ? (
          <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
            <svg
              width='13'
              height='13'
              fill='#FFFFFF'
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
            </svg>
          </div>
        ) : (
          <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
        )}
        <p className='basis-24 text-md font-medium text-gray-500'>Industry</p>
        <input
          onChange={e => set_company_industry(e.target.value)}
          onKeyDown={handleKeyPress}
          value={company_industry ?? ''}
          type='text'
          placeholder='Add company industry'
          className={`${
            data?.company_industry === null || data?.company_industry === ''
              ? ''
              : 'capitalize'
          } flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30  border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
        />
      </div>

      {customFields.map(customField => {
        const className = clsx(
          customFieldsObject[customField._id] === null ||
            customFieldsObject[customField._id] === ''
            ? customField.type === 'date' || customField.type === 'number'
              ? 'w-auto'
              : ''
            : 'w-auto',
          customField.type == 'checkbox'
            ? 'ml-1'
            : 'w-full px-1 hover:border-border/30 ',
          `flex-1 duration-100 ease-in-out w-full  outline-none  text-md  focus:text-[12px] rounded-[4px]  border-2 border-transparent focus:border-secondary text-black cursor-pointer`,
        );

        return (
          <div className='flex items-center mb-4' key={customField._id}>
            {customFieldsObject[customField._id] !== null &&
            customFieldsObject[customField._id] !== '' &&
            customFieldsObject[customField._id] !== undefined &&
            customFieldsObject[customField._id] &&
            customFieldsObject[customField._id] !== 'false' ? (
              <div className='flex justify-center items-center w-[15px] h-[15px] bg-[#1bb157] rounded-full flex-none mr-2'>
                <svg
                  width='13'
                  height='13'
                  fill='#FFFFFF'
                  viewBox='0 0 16 16'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M12.537 4.074a.286.286 0 0 0-.404.02l-5.895 6.528-3.061-2.765a.286.286 0 0 0-.403.02l-.7.776a.285.285 0 0 0 .02.403l4.042 3.65a.278.278 0 0 0 .139.067.282.282 0 0 0 .276-.087l6.781-7.51a.285.285 0 0 0-.02-.402l-.775-.7z'></path>
                </svg>
              </div>
            ) : (
              <div className='w-[15px] h-[15px] bg-[#e8e8e8] rounded-full mr-2 flex-none' />
            )}
            <p className='basis-24 text-md font-medium text-gray-500'>
              {customField.field}
            </p>
            {customField.type === 'select' ? (
              <select
                value={customFieldsObject[customField._id] ?? ''}
                placeholder='Select status'
                onChange={e =>
                  setCustomFieldsObject(customField._id, e.target.value)
                }
                onFocus={() => onInputFocus}
                onBlur={() =>
                  updateCustomField(
                    customField?._id,
                    customFieldsObject[customField._id],
                  )
                }
                ref={focusedSelectInputRef}
                onKeyDown={handleKeyPress}
                className={`flex-1 duration-100 ease-in-out w-full px-1 outline-none  text-md  focus:text-[12px] rounded-[4px] hover:border-border/30  border-2 border-transparent focus:border-secondary text-black cursor-pointer`}
              >
                {customField.metaData.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                onChange={e => {
                  if (customField.type === 'checkbox') {
                    setCustomFieldsObject(customField._id, e.target.checked);
                  } else {
                    setCustomFieldsObject(customField._id, e.target.value);
                  }
                }}
                onFocus={() => onInputFocus}
                onBlur={() =>
                  updateCustomField(
                    customField._id,
                    customFieldsObject[customField._id],
                  )
                }
                ref={focusedInputRef}
                value={customFieldsObject[customField._id] ?? ''}
                checked={
                  (customFieldsObject[customField._id] ||
                    customFieldsObject[customField._id] === 'true') &&
                  customFieldsObject[customField._id] !== 'false'
                    ? true
                    : false
                }
                type={customField.type}
                placeholder='Add'
                className={className}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default observer(EditDetails);
