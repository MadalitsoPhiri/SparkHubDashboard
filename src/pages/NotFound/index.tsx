import Button from '@/components/atoms/Button';
import { useNavigate } from 'react-router-dom';

export default function NoteFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <main className='grid min-h-screen place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <p className='text-base font-semibold text-primary-light'>404</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            Page not found
          </h1>
          <p className='mt-6 text-base leading-7 text-gray-600'>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Button
              text='Go back'
              size='sm'
              className='bg-hover:primary-medium'
              onClick={() => navigate(-1)}
            />
            <a
              href='mailto:info@sparkhub.cloud'
              className='text-sm font-semibold text-gray-900'
            >
              Contact support <span aria-hidden='true'>&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
