import Avatar from '@/components/atoms/Avatar';
import { FC } from 'react';

type ProfileProps = {
  name: string;
  onClick?: () => void;
  imageURL: string;
};

const ProfileTab: FC<ProfileProps> = ({ name, imageURL, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='pl-2 pr-2.5 bg-gray-100 rounded-full  gap-2 py-1.5 items-center flex'
    >
      <Avatar src={imageURL} alt={name} size='sm' />
      <p className='text-neutral-900 text-md overflow-hidden whitespace-no-wrap truncate'>
        {name}
      </p>
    </div>
  );
};

export default ProfileTab;
