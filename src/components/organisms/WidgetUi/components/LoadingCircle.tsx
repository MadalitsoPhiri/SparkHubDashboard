import React from 'react';

export default function LoadingCircle() {
  return (
    <div
      style={{ borderTopColor: 'transparent' }}
      className='w-[18px] h-[18px] border-2 border-white border-solid rounded-full animate-spin'
    ></div>
  );
}
