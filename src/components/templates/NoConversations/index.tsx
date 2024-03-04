export default function NoConversations() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <svg
        className='w-12 h-12 text-gray-500 mb-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
        />
      </svg>
      <p className='text-gray-500 text-lg font-bold'>No conversations yet.</p>
    </div>
  );
}
