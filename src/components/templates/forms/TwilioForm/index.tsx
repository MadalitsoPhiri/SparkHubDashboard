import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { SelectInput } from '@/components/atoms/SelectInput';
import { BASE_URL } from '@/constants/index';
import { notify } from '@/helpers/index';
import {
  TwilioIncomingPhoneNumber,
  TwilioIncomingPhoneNumberResponse,
} from '@/types/twilio.types';
import axios from 'axios';
import { Formik } from 'formik';
import { FC, useState } from 'react';
import * as yup from 'yup';

export type TwilioPayload = {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  phoneNumberSid: string;
};

type TwilioProps = {
  handleTwilio: (values: TwilioPayload) => void;
};

export const TwilioFormSchema = yup.object().shape({
  accountSid: yup.string().required('Account SID is required'),
  authToken: yup.string().required('Auth Token is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
});

export const TwilioForm: FC<TwilioProps> = ({ handleTwilio }) => {
  const [phoneNumberDataList, setPhoneNumberDataList] = useState<
    Partial<TwilioIncomingPhoneNumber>[]
  >([]);
  const [isLoadingPhoneNumberDataList, setIsLoadingPhoneNumberDataList] =
    useState(false);

  const getPhoneNumberDataList = async (
    accountSid: string,
    authToken: string,
  ) => {
    setIsLoadingPhoneNumberDataList(true);
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers.json`;

    await axios
      .get<TwilioIncomingPhoneNumberResponse>(twilioUrl, {
        auth: {
          username: accountSid,
          password: authToken,
        },
      })
      .then(response => {
        const structuredPhoneNumberDataList =
          response?.data?.incoming_phone_numbers
            ?.filter(
              incomingPhoneNumber =>
                !incomingPhoneNumber.sms_url?.includes(BASE_URL),
            )
            ?.map(filteredIncomingPhoneNumber => {
              return {
                phone_number: filteredIncomingPhoneNumber.phone_number,
                sid: filteredIncomingPhoneNumber.sid,
              };
            });

        if (structuredPhoneNumberDataList.length === 0) {
          notify('error', 'No valid phone number found');
        } else {
          setPhoneNumberDataList(structuredPhoneNumberDataList);
        }
      })
      .catch(() => {
        notify('error', 'Something went wrong');
      });

    setIsLoadingPhoneNumberDataList(false);
  };

  return (
    <div>
      <div className='flex flex-col px-4'>
        <div className='py-2 text-gray-500 2xl:text-[15px] xl:text-[12px]'>
          {`Create the exact solution you need to engage customers at every step of their journey.`}
        </div>
      </div>
      <Formik
        onSubmit={handleTwilio}
        initialValues={{
          accountSid: '',
          authToken: '',
          phoneNumber: '',
          phoneNumberSid: '',
        }}
        validationSchema={TwilioFormSchema}
      >
        {({
          errors,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className='mt-1 p-4 space-y-4'>
            <Input
              onChange={handleChange('accountSid')}
              onBlur={e => {
                if (
                  phoneNumberDataList.length === 0 &&
                  values.accountSid &&
                  values.authToken
                ) {
                  getPhoneNumberDataList(values.accountSid, values.authToken);
                }
                handleBlur('accountSid')(e);
              }}
              value={values.accountSid}
              type='text'
              name='accountSid'
              placeholder='Account SID'
            />
            {errors.accountSid && (
              <small className='text-red-600'>{errors.accountSid}</small>
            )}
            <Input
              onChange={handleChange('authToken')}
              onBlur={e => {
                if (
                  phoneNumberDataList.length === 0 &&
                  values.accountSid &&
                  values.authToken
                ) {
                  getPhoneNumberDataList(values.accountSid, values.authToken);
                }
                handleBlur('authToken')(e);
              }}
              value={values.authToken}
              type='text'
              name='authToken'
              placeholder='Auth Token'
            />
            {errors.authToken && (
              <small className='text-red-600'>{errors.authToken}</small>
            )}
            <SelectInput
              onChange={e => {
                const selectedPhoneNumberSid = phoneNumberDataList.find(
                  phoneNumberData =>
                    phoneNumberData.phone_number === e.currentTarget.value,
                )?.sid;

                setFieldValue('phoneNumberSid', selectedPhoneNumberSid);

                handleChange('phoneNumber')(e);
              }}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              name='phoneNumber'
              placeholder='Phone Number'
              error={errors.phoneNumber}
              disabled={phoneNumberDataList.length === 0}
              loading={isLoadingPhoneNumberDataList}
              options={phoneNumberDataList.map(phoneNumberData => {
                return {
                  value: phoneNumberData.phone_number as string,
                  label: phoneNumberData.phone_number as string,
                };
              })}
              errorMessage={errors.phoneNumber}
            />
            <div className='border border-b-0'></div>
            <div className='flex flex-row-reverse gap-4'>
              <Button
                disabled={
                  !values.accountSid || !values.authToken || !values.phoneNumber
                }
                type='submit'
                text='Save'
                variant='primary'
                className='w-full'
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
