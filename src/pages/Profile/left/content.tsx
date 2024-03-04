import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const Content = () => {
  const initialContent: string[] = [];
  const [visibleContent, setVisibleContent] = useState(
    initialContent.slice(0, 2),
  );
  const [showMore, setShowMore] = useState(false);

  const toggleVisibility = () => {
    if (showMore) {
      setVisibleContent(initialContent.slice(0, 2));
    } else {
      setVisibleContent(initialContent);
    }
    setShowMore(!showMore);
  };

  return (
    <div className='flex flex-col gap-y-1'>
      <Text size='md' color='text-black'>
        Recent Content
      </Text>
      {visibleContent.length === 0 ? (
        <Text size='sm' color='text-[#656971]'>
          No recent content
        </Text>
      ) : (
        visibleContent.map((event, index) => (
          <div
            key={index}
            className={`bg-secondary px-2 py-2 rounded-[4px] my-1 relative group `}
          >
            <Text size='sm' color='text-white'>
              {event}
            </Text>
            <svg
              className={`absolute right-2 top-2 w-5 h-5 text-white cursor-pointer invisible group-hover:visible`}
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            ></svg>
          </div>
        ))
      )}
      {initialContent.length > 2 && (
        <Button
          text={showMore ? 'See less' : 'See more'}
          variant='outline'
          className='w-full h-[32px] mt-4'
          onClick={toggleVisibility}
        />
      )}
    </div>
  );
};

export default Content;
