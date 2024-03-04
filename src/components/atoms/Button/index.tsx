import Spinner from '@/components/atoms/Spinner';
import { observer } from 'mobx-react-lite';
import { ReactNode, forwardRef } from 'react';

interface ButtonProps {
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
  loading?: boolean;
  onClick?: (e: any) => void;
  text: string;
  loadingText?: string;
  className?: string;
  type?: 'submit' | 'button';

  variant?: 'primary' | 'secondary' | 'outline' | 'basic' | 'danger';
  size?: 'sm' | 'md' | 'lg';

  disabled?: boolean;
  fullHeight?: boolean;
  btnColor?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      LeftIcon,
      RightIcon,
      loading,
      onClick,
      text,
      loadingText,
      className,
      type = 'submit',
      variant = 'primary',
      size = 'sm',
      disabled,
      fullHeight,
      btnColor,
    },
    ref,
  ) => {
    const renderButtonVariant = (): string => {
      switch (variant) {
        case 'primary':
          return 'text-white';
        case 'outline':
          return 'bg-[#FBFCFD] text-black border border-[#DFE1E6] hover:bg-[#033496] hover:bg-opacity-5';

        case 'basic':
          return 'bg-white text-black border border-[#DFE1E6]   border-b-[2px]';
        case 'danger':
          return 'bg-red-500 text-white hover:bg-red-600';

        default:
          return 'bg-secondary text-white';
      }
    };

    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        type={type}
        className={`${className ?? ''} ${
          fullHeight ? 'h-full' : ''
        } ${renderButtonVariant()} rounded-[4px] hover:bg-[#033496]  bg-[${
          btnColor ? btnColor : '#033EB5'
        }] transition-opacity flex flex-row justify-center items-center cursor-pointer px-[12px] shadow-sm  ${
          loading ? 'opacity-30 pointer-events-none' : ''
        }  disabled:cursor-not-allowed disabled:bg-placeholder ${
          size === 'sm' ? 'py-[6px]' : 'py-[8px] h-10'
        } text-md font-medium`}
        onClick={onClick}
      >
        <div className='flex justify-center gap-1 items-center'>
          {loading || !LeftIcon ? null : (
            <div className='h-5 w-5 flex justify-center items-center'>
              {LeftIcon}
            </div>
          )}
          {loading && <Spinner size={13} color={'#FFFFFF'} />}
          <p className={`${loading && loadingText ? 'ml-2' : ''}`}>
            {loading ? loadingText : text}
          </p>
          {loading || !RightIcon ? null : (
            <div className='h-5 w-5'>{RightIcon}</div>
          )}
        </div>
      </button>
    );
  },
);

export default observer(Button);
