import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { SelectInput } from '@/components/atoms/SelectInput';
import { CreateCustomFieldPayload } from '@/hooks/useCustomField';
import { Formik } from 'formik';
import { FC } from 'react';

import * as yup from 'yup';

const addCustomFieldScheme = yup.object().shape({
  field: yup.string().required('Name is required'),
  type: yup.string().required('Type is required'),
  metaData: yup.array().required('Options is required'),
});

type CustomFieldFormProps = {
  handleSubmit: (values: CreateCustomFieldPayload) => void;
  customFieldType?: any[];
  handleAddValue: () => void;
  fields: Map<string, string>;
  setFields: React.Dispatch<React.SetStateAction<Map<string, string>>>;
};

const CustomFieldForm: FC<CustomFieldFormProps> = ({
  handleSubmit: onSubmit,
  customFieldType,
  handleAddValue,
  fields,
  setFields,
}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={addCustomFieldScheme}
      initialValues={{
        field: '',
        type: '',
        metaData: [],
      }}
    >
      {({
        values,
        errors,
        handleChange,
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className='px-5'>
          <Input
            placeholder={'Field Name'}
            value={values.field}
            onChange={handleChange('field')}
            error={errors?.field}
            label='Field Name'
          />

          <div className='mt-3' />

          <SelectInput
            value={values.type}
            options={
              customFieldType?.map(type => ({
                label:
                  type.type === 'select'
                    ? 'PICK LIST'
                    : type.type.toUpperCase(),
                value: type.type,
              })) ?? []
            }
            onChange={handleChange('type')}
            label='Field Type'
            placeholder='Select Field Type'
          />

          {errors?.type && (
            <small className='text-red-500'>{errors.type}</small>
          )}

          {values.type === 'select' && (
            <div className='my-5'>
              {Array.from(fields).map(([key, value]) => (
                <div className='mb-5' key={key}>
                  <Input
                    value={value}
                    placeholder={`Option 1`}
                    onChange={e => {
                      const value = e.target.value;
                      setFields(prev => new Map([...prev, [key, value]]));
                    }}
                    onBlur={() => {
                      const options = Array.from(fields.values());
                      setFieldValue('metaData', options);
                    }}
                    error={errors?.metaData?.toString()}
                  />
                </div>
              ))}
              <button
                type='button'
                className='text-secondary text-md disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={handleAddValue}
                disabled={
                  isSubmitting || Array.from(fields.values()).includes('')
                }
              >
                + Add Value
              </button>
            </div>
          )}

          <div className='mt-4 text-center'>
            <Button
              // disabled={isSubmitting}
              // loading={isSubmitting}
              type='submit'
              className='mt-3 w-full'
              variant='primary'
              size='md'
              text={'Create'}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CustomFieldForm;
