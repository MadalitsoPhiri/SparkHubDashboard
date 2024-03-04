import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { useDragNDrop } from '@/hooks/useDragNDrop';
import { Icon } from '@iconify/react';
import { CSVLink } from 'react-csv';

type UploadAndDragNDropProps = {
  csvData?: object[];
  openModalImport: () => void;
  closeModalImport: () => void;
  handleImportContact: (data: File | null) => void;
};

function UploadAndDragNDrop({
  closeModalImport,
  csvData,
  handleImportContact,
}: UploadAndDragNDropProps) {
  const {
    file,
    isFileOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
  } = useDragNDrop();

  return (
    <div className='px-4 mt-[10px]'>
      <Text size='xs' color='#656971'>
        Import contact and company information into SparkHub.
      </Text>
      <label htmlFor='file' className='cursor-pointer'>
        <div
          className={`flex flex-col items-center border-dashed border-2
           border-border py-4 mt-4 rounded-[4px] gap-y-1 cursor-pointer ${
             isFileOver ? 'border-primary' : 'border-border'
           }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Icon icon='ci:cloud-upload' color='#7E8B99' width={40} />
          {file && (
            <Text size='xs' color='#656971'>
              {file.name}
            </Text>
          )}
          <div className='flex space-x-1'>
            <Text size='md' color='text-secondary'>
              Upload a file
            </Text>
            <Text size='md' color='text-black'>
              or drag and drop
            </Text>
            <input
              type='file'
              className='hidden'
              id='file'
              accept='.csv,'
              onChange={handleFileChange}
            />
          </div>
          <Text size='xs' color='#656971'>
            Only CSV file
          </Text>
        </div>
      </label>
      <div className='mt-4 text-center flex justify-between space-x-4'>
        <div className='flex flex-1'>
          <Button
            size='sm'
            text='Cancel'
            onClick={closeModalImport}
            variant='outline'
            className='w-full'
          />
        </div>

        {csvData && (
          <div className='flex flex-1'>
            <CSVLink
              data={csvData as object[]}
              filename={'SparkHub_SampleCSV_Import.csv'}
              target='_blank'
              enclosingCharacter={`'`}
            >
              <Button
                size='sm'
                text='CSV Format'
                onClick={closeModalImport}
                variant='outline'
                className='w-full'
              />
            </CSVLink>
          </div>
        )}

        <div className='flex flex-1'>
          <Button
            size='sm'
            text='Upload file'
            type='submit'
            className='hover:bg-primary-medium w-full'
            onClick={() => handleImportContact(file)}
            disabled={!file}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadAndDragNDrop;
