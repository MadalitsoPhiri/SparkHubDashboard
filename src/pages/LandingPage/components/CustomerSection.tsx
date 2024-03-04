import { SparklesIcon } from '@heroicons/react/outline';
import three from './imgs/three.png';

function CustomerSection() {
  return (
    <div className='mt-24'>
      <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24'>
        <div className='px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2'>
          <div>
            <div>
              <span className='h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600'>
                <SparklesIcon
                  className='h-6 w-6 text-white'
                  aria-hidden='true'
                />
              </span>
            </div>
            <div className='mt-6'>
              <h2 className='text-3xl font-extrabold tracking-tight text-gray-900'>
                Better understand your customers
              </h2>
              <p className='mt-4 text-lg text-gray-500'>
                With our powerful CRM, you can easily upload and organize an
                unlimited number of contacts, create contact lists and segments,
                and access all of your customer information in one place.
              </p>
              <div className='mt-6'>
                <a
                  href='#'
                  className='inline-flex bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-[#ffffff!important] hover:from-purple-700 hover:to-indigo-700'
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12 sm:mt-16 lg:mt-0 lg:col-start-1'>
          <div className='pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full'>
            <img
              className='w-full rounded-xl shadow-xl ring-1 ring-gray-50 ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none'
              src={three}
              alt='Customer profile user interface'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSection;
