import { notify } from '@/helpers/index';
import { useState } from 'react';

export const useDragNDrop = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isFileOver, setIsFileOver] = useState(false);

  const validateFile = (file: File) => {
    if (file.type !== 'text/csv') {
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const _file = e.target.files[0];

      if (!validateFile(_file)) {
        notify('error', 'Only CSV file is allowed');
        return;
      }
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsFileOver(true);
  };

  const handleDragLeave = () => {
    setIsFileOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFileOver(false);
    if (e.dataTransfer.files) {
      const _file = e.dataTransfer.files[0];

      if (!validateFile(_file)) {
        notify('error', 'Only CSV file is allowed');
        return;
      }
      setFile(e.dataTransfer.files[0]);
    }
  };

  return {
    file,
    isFileOver,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
