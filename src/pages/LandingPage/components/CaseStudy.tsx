export default function Example() {
  return (
    <div className='py-16 bg-gray-50 overflow-hidden flex flex-col justify-center'>
      <div className='px-4 space-y-8 sm:px-6 lg:px-8 mx-auto max-w-7xl'>
        <div className='text-base max-w-prose mx-auto lg:max-w-none'>
          <h2 className='text-base text-indigo-600 font-semibold tracking-wide uppercase'>
            Limited time offer
          </h2>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Join our beta group and get <br /> free access to SparkHub!
          </p>
        </div>
        <div className='z-10 text-base  mx-auto '>
          <p className='text-lg text-gray-500'>
            {`As a member of our beta group, you'll have the opportunity
             to try out SparkHub's powerful CRM and marketing platform
             for free. This limited time offer is your chance to see how
              SparkHub can revolutionize the way you engage with customers
              and manage your sales pipeline.`}
          </p>
        </div>
        <div>
          <div className='z-10'>
            <div className='prose prose-indigo text-gray-500 mx-auto '>
              <p>
                {`Sign up now to join our beta group and get free access to SparkHub.
                 Don't miss out on this opportunity to experience the power of SparkHub's
                 OpenAI technology and streamline your customer engagement and
                  sales pipeline management.`}
              </p>
            </div>
            <div className='mt-10 flex text-base max-w-prose mx-auto lg:max-w-none'>
              <div className='rounded-md shadow'>
                <a
                  href='mailto:info@sparknspur.com'
                  className='w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#ffffff!important] bg-indigo-600 hover:bg-indigo-700'
                >
                  Contact sales
                </a>
              </div>
              <div className='rounded-md shadow ml-4'>
                <a
                  href='#'
                  className='w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50'
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
