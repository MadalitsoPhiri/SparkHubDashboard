import { AuthStore } from '@/state/AuthenticationStore';
import { useState } from 'react';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const upload = (file: any) => {
    setUploading(true);
    AuthStore.socket?.emit(
      'upload',
      {
        data: {
          file: file,
          file_name: file.name,
        },
        event_name: 'upload',
      },
      (response: any) => {
        setUploading(false);
        setResponse(response);
      },
    );
  };

  return {
    response,
    uploading,
    upload,
  };
};
