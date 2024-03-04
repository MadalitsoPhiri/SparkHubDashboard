import Icon from '@/assets/Icons';
import Icons from '@/assets/Icons/icons.json';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
export const RouteEmails = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col  mb-10'>
        <Text
          size='sm'
          color='text-gray-600'
        >{`The SparkHub Inbox makes it easy to talk
           with your customers however they choose. Forward your support or sales
            email to Sparky so you can manage all your conversations in one place.`}</Text>
        <div className='rounded-[6px] p-[8px] border border-[#f2e9fe] bg-mainGray w-[100%] my-4'>
          <div className='flex flex-col'>
            <span className='mb-2'>
              <Text size='sm'>Your support or sales email address</Text>
            </span>
            <div className='flex flex-row justify-between'>
              <input
                className='border border-border focus:border-blue hover:border-blue rounded-[6px] py-[5px] px-[11px] outline-none font-[400] text-[13px] leading-[20px] text-[#222] text-opacity-80'
                placeholder='help@myapp.com'
              />
              <Button text='Continue' />
            </div>
          </div>
        </div>
        <span className='cursor-pointer hover:underline text-blue'>
          <Text size='sm' color='text-blue'>
            Mark as done — I don’t have a support or sales email
          </Text>
        </span>
      </div>
      <div className="bg-[url('https://static.intercomassets.com/ember/assets/images/onboarding/home/steps/forward-emails@1x-302248ab645a574e6b4291af4cf98f09.jpg')] h-[250px] w-[400px]  bg-no-repeat "></div>
    </div>
  );
};

export const ManageSocialMedia = () => {
  const social = [
    {
      name: 'WhatsApp',
      src: 'https://static.intercomassets.com/developer-home/change-request-image-uploads/6393/original/WhatsApp_logo_512x512-1620926216.png?1620926216',
      disc: 'Easily receive and reply to WhatsApp messages from your inbox',
    },
    {
      name: 'Twitter',
      src: 'https://static.intercomassets.com/appstore/images/icons/twitter.png',
      disc: 'Easily reply to Twitter Direct Messages from your inbox',
    },
    {
      name: 'Facebook',
      src: 'https://static.intercomassets.com/appstore/images/icons/facebook.png',
      disc: 'Easily reply to Facebook messages from your inbox',
    },
    {
      name: 'Instagram',
      src: 'https://static.intercomassets.com/developer-home/change-request-image-uploads/7560/original/instagram_512x512-1635236692.png?1635236692',
      disc: 'Easily receive and reply to Instagram private messages from your inbox',
    },
  ];
  return (
    <div className='flex flex-col'>
      <Text
        size='sm'
        color='text-gray-600'
      >{`Connect your company’s social media accounts to Sparky to answer WhatsApp, Twitter, Facebook, and Instagram messages from your inbox.`}</Text>
      <div className='flex flex-row mt-4'>
        {social.map((item, index) => (
          <div
            key={index}
            className='shadow-sm px-[16px] mr-[16px] border border-border hover:border-blue rounded-[6px] w-[100%] cursor-pointer'
          >
            <div className='flex-auto flex flex-col'>
              <div className=' pt-[20px]'>
                <img className='w-[48px] h-[48px] ' src={item.src} />
              </div>
              <h3 className='my-[15px] font-semibold'>
                <Text size='sm'>{item.name}</Text>
              </h3>
              <Text size='sm' color='text-gray-600'>
                {item.disc}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <span className='cursor-pointer hover:underline text-blue mt-4'>
        <Text size='sm' color='text-blue'>
          Mark as done — I don’t have social media accounts
        </Text>
      </span>

      <div className='w-[100%] px-[20px] py-[15px] bg-mainGray mt-[25px] rounded-[6px] flex justify-between'>
        <div className='flex items-center'>
          <span className='font-semibold mr-[10px]'>
            <Text size='sm'>Need help?</Text>
          </span>
          <Text size='xs'>Ask a teammate to complete this step</Text>
        </div>
        <div className='flex items-center bg-[#FBFCFD] cursor-pointer px-3 py-1.5  rounded-[4px] shadow-sm border border-border'>
          <span className='mr-[5px]'>
            <Icon icon={Icons.plus} size={16} />
          </span>
          <span className='font-[500]'>
            <Text size='sm'>Invite teammate</Text>
          </span>
        </div>
      </div>
    </div>
  );
};
