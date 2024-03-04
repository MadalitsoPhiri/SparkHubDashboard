import { FC } from 'react';

type AvatarProps = {
  src: string | undefined;
  alt?: string;
  size: 'sm' | 'md' | 'lg' | '2lg' | 'xl';
  online?: boolean;
  color?: string;
  textColor?: string;
  className?: string;
  hasBorder?: boolean;
};

const Avatar: FC<AvatarProps> = ({
  src,
  alt = '',
  size,
  online,
  color = 'secondary',
  textColor = 'white',
  className,
  hasBorder = false,
}) => {
  let avatarSize = '';

  switch (size) {
    case 'sm':
      avatarSize = 'h-[20px] w-[20px]';
      break;
    case 'md':
      avatarSize = 'h-[32px] w-[32px]';
      break;
    case 'lg':
      avatarSize = 'h-[40px] w-[40px]';
      break;
    case '2lg':
      avatarSize = 'h-[48px] w-[48px]';
      break;
    case 'xl':
      avatarSize = 'h-[66px] w-[66px]';
      break;
    default:
      avatarSize = 'h-[20px] wp-[20px]';
  }

  const nameArray = alt.split(' ');
  const firstName = nameArray[0] || '';
  const lastName = nameArray[nameArray.length - 1] || '';

  return (
    <div className={className}>
      {!src ? (
        <div
          className={`rounded-full ${avatarSize} bg-${color} text-${textColor} flex items-center justify-center font-medium ${
            size == 'sm' ? 'text-[8px]' : ''
          }`}
        >
          {/* Display initials using the first and last name */}
          {firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`rounded-full flex-none ${
            hasBorder ? 'border-2 border-border' : ''
          } ${avatarSize}`}
        />
      )}
      {online && (
        <span
          className={`${
            online ? 'bg-success' : 'bg-warning'
          } h-[8px] w-[8px] ring-1 ring-white rounded-full absolute left-6 bottom-0`}
        />
      )}
    </div>
  );
};

export default Avatar;
