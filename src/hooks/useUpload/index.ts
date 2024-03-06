import { SOCKET_EVENT_NAMES } from '@/constants/socket.events';
import { AuthStore } from '@/state/AuthenticationStore';
import { useState } from 'react';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const upload = (file: any) => {
    setUploading(true);
    AuthStore.socket?.emit(
      SOCKET_EVENT_NAMES.UPLOAD_FILE,
      {
        data: {
          file: file,
          file_name: file.name,
        },
        event_name: SOCKET_EVENT_NAMES.UPLOAD_FILE,
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
