import Agent from './imgs/agent.svg';
const Marketing = () => {
  return (
    <section className='bg-gradient'>
      <div className='max-w-5xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8 py-20 lg:py-32'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='w-[146px] h-[146px] bg-white flex justify-center items-center rounded-[10px] flex-none'>
            <img src={Agent} alt='agent icon' />
          </div>
          <div className='flex flex-col'>
            <span className='text-white py-5 font-[700] text-[20px] leading-[24.4px]'>
              Complimentary Weekly Marketing
            </span>
            <span className='text-white text-[16px] leading-[21.12px] font-[400]'>
              Support Hours: Get access to free consultations and support on
              everything from campaign ideas, website issues, marketing plans,
              business plans, tech architecture, systems, automation, and more
              sponsored by Spark&Spur.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Marketing;
