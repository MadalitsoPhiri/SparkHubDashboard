import Spinner from '@/components/atoms/Spinner';
import Modal from '@/components/atoms/modal';
import IntegrationListItem from '@/components/molecules/IntegrationListItem';
import { MainContainer } from '@/components/templates/MainContainer';
import { TwilioForm } from '@/components/templates/forms/TwilioForm';
import { useIntegration } from '@/hooks/useIntegration';
import { AuthStore } from '@/state/AuthenticationStore';
import { integrationStore } from '@/state/IntegrationStore';
import { Integration, IntegrationPayload } from '@/types/integration.types';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const Integrations = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration>(
    {} as Integration,
  );
  const {
    isModalOpen,
    closeModal,
    openModal,
    addIntegration,
    getIntegrations,
  } = useIntegration();
  const user_workspace_info = AuthStore.user_workspace_info;
  const workspaceIntegrations =
    user_workspace_info?.active_workspace?.workspace?.integrations
      ?.filter(Boolean)
      .map(integration => integration._id);

  const handleAddIntegration = (values: IntegrationPayload) => {
    addIntegration({
      ...values,
      integrationId: selectedIntegration?._id,
    });
    closeModal();
  };

  const integrationConnectHandlerObject = {
    Twilio: (payload: Integration) => {
      setSelectedIntegration(payload);
      openModal();
    },
    Outlook: () => {
      // TODO: Add Outlook integration
    },
    Google: () => {
      // TODO: Add Google integration
    },
  };

  useEffect(() => {
    getIntegrations();
  }, []);

  return (
    <>
      <MainContainer>
        {integrationStore.loading ? (
          <div className='min-h-[400px] flex justify-center items-center'>
            <Spinner size={30} />
          </div>
        ) : (
          <>
            <div className='px-[25px]'>
              <h2 className='pt-6 pb-4 text-[20px] leading-[20px] font-medium'>
                Integrations
              </h2>
              <p className='text-[16px]'>
                Select and connect tools you use to integrate with your workflow
              </p>
            </div>
            <div className='flex flex-col bg-[#ffffff] overflow-y-auto rounded-[10px] my-[32px]'>
              {integrationStore.integrations?.map((item, index) => (
                <IntegrationListItem
                  key={index}
                  title={item.name}
                  isConnected={workspaceIntegrations?.includes(item?._id)}
                  handleClick={() => {
                    integrationConnectHandlerObject[item.name]?.(item);
                  }}
                  phrase={item.description}
                  icon={item.logo}
                  isLast={index === integrationStore.integrations?.length - 1}
                  loading={
                    item.name === selectedIntegration?.name &&
                    integrationStore.creating
                  }
                />
              ))}
            </div>
          </>
        )}
      </MainContainer>
      <Modal
        show={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        title={`Twilio`}
        className='inline-block pt-4 w-[500px] overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-[7px]'
      >
        <TwilioForm handleTwilio={handleAddIntegration} />
      </Modal>
    </>
  );
};
export default observer(Integrations);
