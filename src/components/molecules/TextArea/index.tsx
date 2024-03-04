import { FC, TextareaHTMLAttributes, useState } from 'react';
import Button from '@/components/atoms/Button';
import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  rows?: number;
}

const Textarea: FC<TextAreaProps> = ({ placeholder, rows = 3, ...props }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const isTextareaEmpty = value.trim().length === 0;

  return (
    <div className='border border-border focus-within:border-secondary rounded-[6px] p-2'>
      <textarea
        {...props}
        className='w-full outline-none resize-none'
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
      />
      <div className='flex flex-row-reverse'>
        <div className='flex space-x-2'>
          <div className='px-1 flex items-center justify-center cursor-pointer'>
            <Icon icon={Icons.mic} color='#7E8B99' size={20} />
          </div>
          <div className='flex items-center justify-center cursor-pointer'>
            <Icon icon={Icons.emoji} color='#7E8B99' size={20} />
          </div>
          <div className='w-10 flex items-center justify-center cursor-pointer'>
            <Icon icon={Icons.attachment} color='#7E8B99' size={20} />
          </div>
          <div className='h-[32px] px-[14px] py-[8px] border border-border rounded-[4px] flex items-center justify-center cursor-pointer'>
            <Icon icon={Icons.spark} color='#7E8B99' size={20} />
          </div>
          <Button
            type='submit'
            text='Send'
            size='sm'
            className='bg-secondary'
            disabled={isTextareaEmpty}
          />
        </div>
      </div>
    </div>
  );
};

export default Textarea;
