import { useUpload } from '@/hooks/useUpload';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { useEffect } from 'react';

export const useStyle = () => {
  const { uploading, upload, response } = useUpload();
  const { publish } = useWidgetConfig();
  const handleHeaderColorInputChange = (e: any) => {
    WidgetConfigStore.updateHeaderBackgroundColor(e.target.value);
  };

  const handleHeaderTextColorInputChange = (e: any) => {
    WidgetConfigStore.updateHeaderTextColor(e.target.value);
  };

  const handleBorderColorInputChange = (e: any) => {
    WidgetConfigStore.updateBorderColor(e.target.value);
  };

  const handleButtonColorInputChange = (e: any) => {
    WidgetConfigStore.updateButtonColor(e.target.value);
  };

  const handlePublish = () => {
    publish();
  };

  function handleUpload(payload: any) {
    if (payload.target.files.length) {
      upload(payload.target.files[0]);
    }
  }

  useEffect(() => {
    if (response) {
      if (response.status === 200) {
        // dispatch update to image url here
        WidgetConfigStore.updateBrandLogoUrl(response.payload.url);
      }
    }
  }, [response]);
  return {
    handleHeaderColorInputChange,
    handleHeaderTextColorInputChange,
    handleBorderColorInputChange,
    handleButtonColorInputChange,
    handlePublish,
    uploading,
    upload,
    response,
    handleUpload,
  };
};
