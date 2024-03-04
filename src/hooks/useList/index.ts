import { fetchRequestWithToken } from '@/config/axios';
import { notify } from '@/helpers/index';
import routeNames from '@/routes/routeNames';
import { List, listStore } from '@/state/ListStore';
import { User } from '@/types/user.types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type CreateList = {
  name: string;
  contacts: User[];
  description?: string;
};

export const useList = () => {
  const [open, setOpen] = useState(false);
  const [openAddList, setOpenAddList] = useState(false);
  const navigate = useNavigate();
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };
  const toggleModal = () => {
    setOpen(!open);
  };

  const closeAddListModal = () => {
    setOpenAddList(false);
  };
  const openAddListModal = () => {
    setOpenAddList(true);
  };
  const createList = (data: CreateList) => {
    fetchRequestWithToken({
      url: `/api/lists`,
      method: 'POST',
      data,
    })
      .then(() => {
        closeModal();
        getLists();
      })
      .catch(() => {
        //...
      })
      .finally(() => {
        //...
      });
  };

  const saveToList = (data: List) => {
    fetchRequestWithToken({
      url: `/api/lists/${data?._id}`,
      method: 'PUT',
      data: {
        _id: data._id,
        name: data.name,
        contacts: data.contact_ids,
      },
    })
      .then(() => {
        closeAddListModal();
        getLists();
      })
      .catch(() => {
        //...
      })
      .finally(() => {
        //...
      });
  };

  const getLists = () => {
    fetchRequestWithToken({
      url: `/api/lists`,
      method: 'GET',
    })
      .then(({ data }) => {
        listStore.setLists(data);
      })
      .catch(() => {
        notify('error', 'Error: Failed to get lists');
      })
      .finally(() => {
        listStore.setFetchingList(false);
      });
  };

  const deleteList = (_id: string) => {
    fetchRequestWithToken({
      url: `/api/lists/${_id}`,
      method: 'DELETE',
    })
      .then(() => {
        getLists();
        navigate(routeNames.dashboard.contacts);
      })
      .catch(() => {
        notify('error', 'Error: Failed to delete list');
      });
  };

  return {
    open,
    createList,
    saveToList,
    closeModal,
    openModal,
    getLists,
    setOpen,
    toggleModal,
    openAddList,
    closeAddListModal,
    openAddListModal,
    setOpenAddList,
    deleteList,
  };
};
