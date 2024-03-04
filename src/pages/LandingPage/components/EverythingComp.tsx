/* This example requires Tailwind CSS v2.0+ */
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline';

const features = [
  {
    name: 'OpenAI-powered chatbots',
    description: `SparkHub's chatbots are powered by OpenAI technology,
     allowing them to handle common customer queries and free up your
     team to focus on high-value interactions`,
    icon: CloudUploadIcon,
  },
  {
    name: 'LiveChat functionality',
    description: `SparkHub's LiveChat feature allows you to engage with
     customers in real-time, providing the personalized support they
      need to convert into loyal customers.`,
    icon: LockClosedIcon,
  },
  {
    name: 'Built-in CRM',
    description: `SparkHub's powerful CRM helps you manage your sales pipeline,
     track leads and deals, and improve your conversion rates.`,
    icon: RefreshIcon,
  },
  {
    name: 'Powerful API',
    description: `SparkHub's API allows you to customize and integrate your own
     applications and software with our platform to create a fully customized
     customer engagement and sales pipeline management solution.`,
    icon: ShieldCheckIcon,
  },
  {
    name: 'Unlimited contacts and lists',
    description: `Keep track of all of your clients and prospects, and segment
     them however you like for targeted marketing efforts.`,
    icon: CogIcon,
  },
  {
    name: 'Advanced reporting',
    description: `Track your performance and see how your efforts
     are paying off with detailed reports and analytics.`,
    icon: ServerIcon,
  },
];

export default function EverythingComp() {
  return (
    <div className='relative bg-white py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
        <h2 className='text-base font-semibold tracking-wider text-indigo-600 uppercase'>
          Deploy faster
        </h2>
        <p className='mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl'>
          Powerful features to streamline customer engagement and sales
        </p>
        <p className='mt-5 max-w-prose mx-auto text-xl text-gray-500'>
          {`Streamline customer engagement and sales with SparkHub's powerful features.
         Optimize your business like never before.`}
        </p>
        <div className='mt-12'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3'>
            {features.map(feature => (
              <div key={feature.name} className='pt-6'>
                <div className='flow-root bg-gray-50 rounded-lg px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg'>
                        <feature.icon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                      {feature.name}
                    </h3>
                    <p className='mt-5 text-base text-gray-500'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
