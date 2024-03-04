import { fetchRequestWithToken } from '@/config/axios';
import { notify } from '@/helpers/index';
import { AuthStore } from '@/state/AuthenticationStore';
import { integrationStore } from '@/state/IntegrationStore';
import { Integration } from '@/types/integration.types';
import { Workspace } from '@/types/workspace.type';
import { useState } from 'react';

export const useIntegration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getIntegrations = async () => {
    try {
      integrationStore.setLoading(true);
      const integrations: { data: Integration[] } = await fetchRequestWithToken(
        {
          url: `/api/integrations`,
        },
      );
      integrationStore.setIntegrations(integrations.data);
    } catch (error) {
      notify('error', 'Error while fetching integration');
    } finally {
      integrationStore.setLoading(false);
    }
  };

  const addIntegration = async (data: any) => {
    try {
      integrationStore.setCreating(true);
      const activeWorkspace: { data: Workspace } = await fetchRequestWithToken({
        url: `/api/integrations`,
        method: 'POST',
        data,
      });

      AuthStore.set_user_workspace_info({
        ...AuthStore.user_workspace_info,
        active_workspace: {
          workspace: activeWorkspace.data,
          permission: AuthStore.user_workspace_info.active_workspace.permission,
        },
      });
      notify('success', 'Integration added successfully');
    } catch (error) {
      notify('error', 'Error while adding integration');
    } finally {
      integrationStore.setCreating(false);
    }
  };

  const updateIntegration = (id: string, data: string) => {
    fetchRequestWithToken({
      url: `/api/integrations/${id}`,
      method: 'PUT',
      data,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    closeModal,
    openModal,
    setIsModalOpen,
    addIntegration,
    getIntegrations,
    updateIntegration,
  };
};
