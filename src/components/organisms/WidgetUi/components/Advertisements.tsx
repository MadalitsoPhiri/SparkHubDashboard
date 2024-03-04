import { useEffect } from 'react';
import './styles/advertisements.css';
import { useOffers } from '@/hooks/useOffers';
import { OffersStore } from '@/state/OffersStore';
import { observer } from 'mobx-react-lite';

const Card = ({ item }: { item: any }) => {
  return (
    <div className='rounded-[8px] border border-solid border-border bg-white shadow-md p-[24px]'>
      <div className='w-full h-[192px] rounded-md overflow-hidden flex-none'>
        <img src={item?.image} className='w-full h-full object-cover' />
      </div>
      <div className='p-4 flex flex-col'>
        <div className='flex justify-between'>
          <div>
            <p className='font-[500] text-[16px] leading-[24px] tex-[#272E35]'>
              {item?.headline}
            </p>
          </div>
        </div>
      </div>
      {item?.features?.map((feature: any, index: number) => (
        <div className='flex my-1' key={index}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className=' flex-none mx-2 h-6 w-6 text-btnColor'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 13l4 4L19 7'
            />
          </svg>
          <span className='text-[14px]'>{feature?.title}</span>
        </div>
      ))}
      {item?.buttonLabel !== '' && (
        <div className='p-4 w-full mt-auto'>
          <a
            href={item?.outsideUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={`bg-btnColor rounded-[6px] flex flex-row justify-center items-center px-[12px] py-[6px] my-1 w-full`}
          >
            <p className={`text-white font-[500] text-[14px] leading-[20px]`}>
              {item?.buttonLabel}
            </p>
          </a>
        </div>
      )}
    </div>
  );
};

const Advertisement = () => {
  const { get_adverts } = useOffers();
  useEffect(() => {
    get_adverts();
  }, []);

  return (
    <div className='flex flex-col py-4 z-100 w-full'>
      {OffersStore.advert?.advert?.length !== 0 ? (
        <div className='px-[16px]'>
          <div className='bg-white flex flex-col rounded-[6px] justify-center items-start p-4'>
            <span className='font-semibold mb-2  text-[16px] leading-[24px]'>
              Our top picks for you
            </span>
          </div>
        </div>
      ) : (
        ''
      )}
      <div
        className={`${
          OffersStore.advert?.advert?.length === 1
            ? 'items-center justify-center'
            : ''
        } w-full flex flex-row  w-full h-full overflow-x-auto   scroll-smooth py-4 px-[16px] advertise_scroll`}
      >
        {OffersStore.advert?.advert?.map((item, index) => {
          return (
            <div
              className={`${
                index === OffersStore.advert?.advert?.length - 1
                  ? 'mr-0'
                  : 'mr-4'
              } flex-none w-full`}
              key={index}
            >
              <Card item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default observer(Advertisement);
