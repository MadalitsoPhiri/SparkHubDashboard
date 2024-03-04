import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CaseStudy from './components/CaseStudy';
import CustomerSection from './components/CustomerSection';
import EverythingComp from './components/EverythingComp';
import FooterSection from './components/FooterSection';

import routeNames from '@/routes/routeNames';
import { AuthStore } from '@/state/AuthenticationStore';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import Spinner from '@/components/atoms/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { StarIcon } from '@heroicons/react/solid';
import { observer } from 'mobx-react-lite';
import ProfileMenuItem from './components/ProfileMenu';
import Support from './components/Support';
import Logo from './components/imgs/Logo.svg';
import one from './components/imgs/one.png';
import two from './components/imgs/two.png';

const navigation = [
  { name: 'Features', href: '#' },
  { name: 'Support', href: '#' },
];

function LandingPage() {
  const { refreshToken } = useAuth();

  useEffect(() => {
    if (AuthStore.isLoading && !AuthStore.currentUser) {
      refreshToken();
    }
  }, []);

  if (AuthStore.isLoading) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <Spinner size={50} color='blue' />
      </div>
    );
  }
  return (
    <div className='bg-white h-screen overflow-y-auto'>
      <Popover as='header' className='relative'>
        <div className='bg-white'>
          <nav
            className='relative w-[100%] mx-auto flex items-center justify-between py-8 px-4 sm:px-6'
            aria-label='Global'
          >
            <div className='flex items-center flex-1'>
              <div className='flex items-center justify-between w-full md:w-auto'>
                <div className='-mr-2 flex items-center md:hidden'>
                  <Popover.Button className='bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>

                    <MenuIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
              <div className='hidden'>
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='text-base font-medium text-white hover:text-gray-300'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className='hidden md:flex  md:items-center md:space-x-6'>
                {AuthStore?.currentUser ? (
                  <>
                    <Link
                      to={routeNames.dashboard.home}
                      className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-[#ffffff!important] bg-secondary hover:bg-secondary/90'
                    >
                      Dashboard
                    </Link>
                    <ProfileMenuItem />
                  </>
                ) : (
                  <>
                    <Link
                      to={routeNames.authentication.login}
                      className='text-base font-medium text-secondary hover:text-gray-300'
                    >
                      Log in
                    </Link>
                    <Link
                      to={routeNames.authentication.signUp}
                      className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-[#ffffff!important] bg-secondary hover:bg-secondary/90'
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden'
          >
            <div className='rounded-lg shadow-md bg-white ring-1 ring-[#f43f5e] ring-opacity-5 overflow-hidden'>
              <div className='px-5 pt-4 flex items-center justify-between'>
                <div>
                  <Logo />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600'>
                    <span className='sr-only'>Close menu</span>

                    <XIcon className='h-6 w-6' />
                  </Popover.Button>
                </div>
              </div>
              <div className='pt-5 pb-6'>
                <div className='px-2 space-y-1'>
                  {navigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='block px-3 py-2 rounded-md text-base font-medium text-primary-medium hover:bg-gray-50'
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className='mt-6 px-5'>
                  <a
                    href={routeNames.authentication.signUp}
                    className='block text-center w-full py-3 px-4 rounded-md shadow  text-white font-medium bg-primary-light'
                  >
                    Start free trial
                  </a>
                </div>
                <div className='mt-6 px-5'>
                  <p className='text-center text-base font-medium text-gray-500'>
                    Existing customer?{' '}
                    <a
                      href={routeNames.authentication.login}
                      className='text-gray-900 hover:underline'
                    >
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <main>
        {/* Hero section */}
        <div
          className='pt-8 overflow-hidden sm:pt-12 lg:relative lg:pb-20 lg:pt-0'
          style={{ marginTop: '-45px' }}
        >
          <div className='mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24'>
            <div>
              <div className='mt-4 '>
                <img
                  src={Logo}
                  alt='SparkHub'
                  className='flex-none h-full w-auto'
                />
              </div>
              <div>
                <div className='mt-6 sm:max-w-xl'>
                  <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
                    All-in-one Cannabis CRM and Loyalty Platform
                  </h1>
                  <p className='mt-6 text-xl text-gray-500'>
                    Revolutionize the way you engage with customers and manage
                    your sales pipeline with the power of ChatGPT technology.
                  </p>
                </div>
                <Link
                  className={
                    'mt-5 bg-secondary transition-colors py-2 px-5 rounded-md text-[#ffffff!important] hover:bg-primary/95 inline-block'
                  }
                  to={routeNames.authentication.signUp}
                >
                  {'Sign up for a demo'}
                </Link>

                <div className='mt-6'>
                  <div className='inline-flex items-center divide-x divide-gray-300'>
                    <div className='flex-shrink-0 flex pr-5'>
                      <StarIcon className='h-5 w-5 text-yellow-400' />
                      <StarIcon className='h-5 w-5 text-yellow-400' />
                      <StarIcon className='h-5 w-5 text-yellow-400' />
                      <StarIcon className='h-5 w-5 text-yellow-400' />
                      <StarIcon className='h-5 w-5 text-yellow-400' />
                    </div>
                    <div className='min-w-0 flex-1 pl-5 py-1 text-gray-500 sm:py-3'>
                      <span className='font-medium text-primary'>
                        Rated 5 stars
                      </span>{' '}
                      by over{' '}
                      <span className='font-medium text-secondary'>
                        500 beta users
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='sm:mx-auto sm:max-w-3xl sm:px-6'>
            <div className='py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
              <div className='hidden sm:block'>
                <div className='absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full' />
                <svg
                  className='absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0'
                  width={404}
                  height={392}
                  fill='none'
                  viewBox='0 0 404 392'
                >
                  <defs>
                    <pattern
                      id='837c3e70-6c3a-44e6-8854-cc48c737b659'
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits='userSpaceOnUse'
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className='text-gray-200'
                        fill='currentColor'
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={392}
                    fill='url(#837c3e70-6c3a-44e6-8854-cc48c737b659)'
                  />
                </svg>
              </div>
              <div className='relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12 flex-none'>
                <img
                  className='w-full rounded-md shadow-xl ring-1 ring-transparent ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none'
                  src={one}
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud section */}
        <div className='mt-32'>
          <div className='mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
            <div className='lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center'>
              <div>
                <h2 className='text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
                  {
                    'All-in-one customer engagement and sales pipeline management'
                  }
                </h2>
                <p className='mt-6 max-w-3xl text-lg leading-7 text-gray-500'>
                  Are you tired of using multiple tools to manage your customer
                  engagement and sales pipeline? Look no further than SparkHub -
                  the ultimate all-in-one solution that combines the power of
                  LiveChat and CRM in one seamless platform.
                </p>
              </div>

              <div className='mt-20'>
                <img
                  className='w-full rounded-xl shadow-xl ring-1 ring-transparent ring-opacity-5'
                  src={two}
                  alt='Customer profile user interface'
                />
              </div>
            </div>
          </div>
        </div>
        <CustomerSection />
        <EverythingComp />
        <CaseStudy />
        <Support />
      </main>

      <FooterSection />
    </div>
  );
}

export default observer(LandingPage);
