import { fetchRequestWithToken } from '@/config/axios';
import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { notify } from '@/helpers/index';
import { ContactType } from '@/pages/Contacts';
import routeNames from '@/routes/routeNames';
import { AuthStore } from '@/state/AuthenticationStore';
import { contactStore } from '@/state/ContactStore';
import { SocketResponse } from '@/types/socketResponse.type';
import { User } from '@/types/user.types';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useList } from '../useList';

export type CreatePayload = {
  user_name: string;
  email: string;
  contact_type: 'User';
};

export const useContact = () => {
  const [open, setOpen] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const { getLists } = useList();
  const [filteredData, setFilteredData] = useState<User[]>(
    () => contactStore.contacts,
  );
  const navigate = useNavigate();

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const openModalImport = () => {
    setOpenImport(true);
  };
  const closeModalImport = () => {
    setOpenImport(false);
  };

  const createContact = (
    data: CreatePayload,
    opt?: FormikHelpers<CreatePayload>,
  ) => {
    contactStore.setCreating(true);
    fetchRequestWithToken({
      url: `/api/contacts`,
      method: 'POST',
      data: {
        user_name: data.user_name,
        email: data.email,
        contact_type: 'User',
      },
    })
      .then(({ data }) => {
        closeModal();
        opt?.resetForm({ values: '' as any });
        contactStore.setContacts([data, ...contactStore.contacts]);
        handleMyContact(contactStore?.contact?._id);
        navigate(`${routeNames.dashboard.userProfile}/${data._id}`);
      })
      .catch(() => {
        //...
      })
      .finally(() => {
        contactStore.setCreating(false);
      });
  };

  const getContacts = (queries?: string) => {
    contactStore.setFetchingContact(true);
    fetchRequestWithToken({
      url: `/api/contacts${queries || ''}`,
      method: 'GET',
    })
      .then(response => {
        setFilteredData(response?.data);
        if (response.config.url) {
          const url = response.config.baseURL + response.config.url;
          const newUrl = new URL(url);
          const parsedSearchParams = new URLSearchParams(newUrl.search);
          const type = parsedSearchParams.get('contactType') as ContactType;

          if (type === 'my') {
            contactStore.setMyContacts(response.data);
          } else if (type === 'recently-viewed') {
            contactStore.setRecentViewContacts(response.data);
          } else if (type === 'all') {
            contactStore.setContacts(response.data);
          } else if (!newUrl.search.includes('list')) {
            contactStore.setContacts(response.data);
          }
        }
      })
      .catch(() => {
        //...
      })
      .finally(() => {
        contactStore.setFetchingContact(false);
      });
  };

  const getContact = (_id: string) => {
    contactStore.setFetchingUser(true);
    fetchRequestWithToken({
      url: `/api/contacts/${_id}`,
      method: 'GET',
    })
      .then(response => {
        contactStore.setContact(response?.data);
      })
      .catch(() => {
        //...
      })
      .finally(() => {
        contactStore.setFetchingUser(false);
      });
  };

  const updateContact = (data: any) => {
    contactStore.setUpdatingContact(true);
    AuthStore?.socket?.emit(
      'update_user_info',
      { event_name: 'update_user_info', data: data },
      (response: SocketResponse<User>) => {
        contactStore.setContact(response.data);
        contactStore.setUpdatingContact(false);
      },
    );
  };

  const deleteContacts = (_id: string) => {
    fetchRequestWithToken({
      url: `/api/contacts/${_id}`,
      method: 'DELETE',
    })
      .then(() => {
        getLists();
        navigate(routeNames.dashboard.contacts);
      })
      .catch(() => {
        notify('error', 'Error: Failed to delete contact');
      });
  };

  const blockContact = (_id: string) => {
    AuthStore?.socket?.emit(
      SOCKET_EVENT_NAMES.UPDATE_USER_INFO,
      {
        event_name: SOCKET_EVENT_NAMES.UPDATE_USER_INFO,
        data: {
          id: _id,
          user: {
            is_blocked: contactStore?.contact?.is_blocked ? false : true,
          },
        },
      },
      (response: any) => {
        if (response.error) {
          notify('error', response.error);
          return;
        } else if (response.data) {
          notify('success', 'Contact blocked successfully');
          contactStore.setContact(response.data);
        }
      },
    );
  };

  const importContacts = (data: File | null) => {
    fetchRequestWithToken({
      url: `/api/contacts/upload`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        file: data,
      },
    })
      .then(() => {
        notify('success', 'Contacts imported successfully');
        closeModalImport();
        getContacts();
      })
      .catch(() => {
        notify('error', 'Error: Failed to import contacts');
      });
  };

  function handleViewContact(id: string) {
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.CREATE_RECENTLY_VIEWED_CONTACTS,
      {
        data: {
          contact: id,
        },
        event: SOCKET_EVENT_NAMES.CREATE_RECENTLY_VIEWED_CONTACTS,
      },
      (response: SocketResponse<User>) => {
        if (response.data) {
          contactStore.setRecentViewContacts([
            response.data,
            ...contactStore.recentViewContacts,
          ]);
        }
      },
    );
    navigate(routeNames.dashboard.userProfile + '/' + id);
  }

  function handleMyContact(id: any) {
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.CREATE_MY_CONTACTS,
      {
        data: {
          contact: id,
        },
        event: SOCKET_EVENT_NAMES.CREATE_MY_CONTACTS,
      },
      (response: SocketResponse<User>) => {
        if (response.data) {
          contactStore.setMyContacts([
            response.data,
            ...contactStore.myContacts,
          ]);
        }
      },
    );
    navigate(routeNames.dashboard.userProfile + '/' + id);
  }

  const assignContact = (userId: string, contactId: string) => {
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.ASSIGN_CONTACT,
      {
        event_name: SOCKET_EVENT_NAMES.ASSIGN_CONTACT,
        data: {
          contactId,
          userId,
        },
      },
      (response: SocketResponse<User>) => {
        if (response.error) {
          notify('error', response.error);
          return;
        }
        contactStore.setContact(response.data);
        notify('success', `Contact successfully assigned`);
      },
    );
  };

  return {
    open,
    openImport,
    filteredData,
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContacts,
    blockContact,
    importContacts,
    closeModal,
    openModal,
    closeModalImport,
    openModalImport,
    setFilteredData,
    handleViewContact,
    handleMyContact,
    assignContact,
  };
};
