import { fetchRequestWithToken } from '@/config/axios';
import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { notify } from '@/helpers/index';
import { AuthStore } from '@/state/AuthenticationStore';
import { customFieldStore } from '@/state/CustomFieldStore';
import { ContactCustomField, CustomField } from '@/types/customField.types';
import { SocketResponse } from '@/types/socketResponse.type';
import { useState } from 'react';

export type CreateCustomFieldPayload = {
  field: string;
  type: string;
  metaData: Array<string> | null;
};

export type UpdateCustomFieldPayload = {
  contactId: string;
  customFieldId: string;
  value: string | null;
};

type UseCustomFieldOptions = {
  resetOptionFields: () => void;
};

export const useCustomField = (customFieldOptions?: UseCustomFieldOptions) => {
  const [open, setOpen] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>(
    () => customFieldStore.customFields ?? [],
  );

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const createCustomField = (data: CreateCustomFieldPayload, opt?: any) => {
    customFieldStore.setLoading(true);
    fetchRequestWithToken({
      url: `/api/custom-fields`,
      method: 'POST',
      data,
    })
      .then(({ data }) => {
        opt?.resetForm({ values: '' });
        customFieldOptions?.resetOptionFields();
        customFieldStore.setCustomFields([
          data,
          ...customFieldStore.customFields,
        ]);
        notify('success', 'Custom field created successfully');
      })
      .catch(() => {
        notify('error', 'Something went wrong');
      })
      .finally(() => {
        customFieldStore.setLoading(false);
        closeModal();
      });
  };

  const getCustomFields = () => {
    fetchRequestWithToken({
      url: '/api/custom-fields',
      method: 'GET',
    })
      .then(({ data }) => {
        customFieldStore.setCustomFields(data);
        setCustomFields(data);
        setCustomFieldObjects(data);
      })
      .catch(() => {
        notify('error', 'Something went wrong');
      });
  };

  const setCustomFieldObjects = (customFields: CustomField[]) => {
    customFields.map((customField: CustomField) => {
      customFieldStore.setCustomFieldsObject(customField.field, null);
    });
  };

  const updateContactWithCustomField = (data: UpdateCustomFieldPayload) => {
    customFieldStore.setLoading(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.UPDATE_CUSTOM_FIELD_VALUE,
      {
        data,
        event: SOCKET_EVENT_NAMES.UPDATE_CUSTOM_FIELD_VALUE,
      },
      (response: SocketResponse<ContactCustomField>) => {
        if (response.error) {
          notify('error', response.error);
          customFieldStore.setLoading(false);
          return;
        } else if (response.data) {
          notify('success', 'Custom field updated successfully');
          customFieldStore.setLoading(false);
        }
      },
    );
  };

  const getContactCustomFields = (contactId: string) => {
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.GET_CUSTOM_FIELD_BY_CONTACT_ID,
      {
        data: {
          contactId,
        },
        event: SOCKET_EVENT_NAMES.GET_CUSTOM_FIELD_BY_CONTACT_ID,
      },
      (response: SocketResponse<ContactCustomField[]>) => {
        if (response.error) {
          notify('error', response.error);
          return;
        } else if (response.data) {
          const customFields = response.data;
          customFieldStore.resetCustomFieldsObject();
          customFields.map(customField => {
            customFieldStore.setCustomFieldsObject(
              customField.custom_field_id,
              customField.value,
            );
          });
        }
      },
    );
  };

  return {
    open,
    customFields,
    closeModal,
    openModal,
    setCustomFields,
    createCustomField,
    updateContactWithCustomField,
    getContactCustomFields,
    getCustomFields,
  };
};
